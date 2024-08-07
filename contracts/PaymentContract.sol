// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PaymentContract is ReentrancyGuard {
    uint256 private _paymentIdCounter;

    struct Payment {
        uint256 id;
        address payable sender;
        address payable recipient;
        uint256 amount;
        bool isPaid;
        bool isCancelled;
    }

    mapping(uint256 => Payment) public payments;
    mapping(bytes32 => uint256) public paymentLinks;

    event PaymentCreated(uint256 indexed paymentId, address indexed sender, address indexed recipient, uint256 amount);
    event PaymentPaid(uint256 indexed paymentId);
    event PaymentCancelled(uint256 indexed paymentId);
    event PaymentRequestCreated(bytes32 indexed requestId, address indexed recipient, uint256 amount);


    function createPayment(address payable _recipient) public payable returns (uint256) {
            require(msg.value > 0, "Payment amount must be greater than 0");

            _paymentIdCounter++;
            uint256 newPaymentId = _paymentIdCounter;

            payments[newPaymentId] = Payment({
                id: newPaymentId,
                sender: payable(msg.sender),
                recipient: _recipient,
                amount: msg.value,
                isPaid: true,  
                isCancelled: false
            });

        
            _recipient.transfer(msg.value);

            emit PaymentCreated(newPaymentId, msg.sender, _recipient, msg.value);
            emit PaymentPaid(newPaymentId);

            return newPaymentId;
        }

    function createPaymentRequest(uint256 amount) public returns (bytes32) {
    _paymentIdCounter++;
    bytes32 requestId = keccak256(abi.encodePacked(_paymentIdCounter, msg.sender, amount, block.timestamp));
    
    payments[_paymentIdCounter] = Payment({
        id: _paymentIdCounter,
        sender: payable(address(0)), 
        recipient: payable(msg.sender),
        amount: amount,
        isPaid: false,
        isCancelled: false
    });

    paymentLinks[requestId] = _paymentIdCounter;
    
    emit PaymentRequestCreated(requestId, msg.sender, amount);
    return requestId;
    }

    function payWithLink(bytes32 requestId) public payable {
        uint256 paymentId = paymentLinks[requestId];
        require(paymentId != 0, "Invalid payment request");
        Payment storage payment = payments[paymentId];
        require(!payment.isPaid && !payment.isCancelled, "Payment already processed");
        require(msg.value == payment.amount, "Incorrect payment amount");

        payment.sender = payable(msg.sender);
        payment.isPaid = true;
        payment.recipient.transfer(msg.value);

        emit PaymentPaid(paymentId);
    }

}