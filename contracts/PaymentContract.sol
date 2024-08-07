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

    function createPayment(address payable _recipient) public payable returns (uint256) {
        require(msg.value > 0, "Payment amount must be greater than 0");

        _paymentIdCounter++;
        uint256 newPaymentId = _paymentIdCounter;

        payments[newPaymentId] = Payment({
            id: newPaymentId,
            sender: payable(msg.sender),
            recipient: _recipient,
            amount: msg.value,
            isPaid: false,
            isCancelled: false
        });

        emit PaymentCreated(newPaymentId, msg.sender, _recipient, msg.value);
        return newPaymentId;
    }

}