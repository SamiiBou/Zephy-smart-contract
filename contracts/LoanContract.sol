// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LoanRequestContract is ReentrancyGuard {
    struct LoanRequest {
        uint256 id;
        address borrower;
        address tokenToBorrow;
        uint256 amount;
        uint256 remainingAmount;
        uint256 duration;
        address collateralAddress;
        uint256 collateralId;
        uint256 collateralAmount;
        bool isActive;
        bool isFullyFunded;
        bool isCancelled;
        address[] lenders;
    }
    struct FundingOffer {
        uint256 id;
        uint256 loanRequestId;
        address funder;
        uint256 amount;
        uint256 percentage;
        bool isActive;
        bool isAccepted;
        bool isCancelled;
    }

    uint256 private loanRequestCounter;
    uint256 private fundingOfferCounter;
    mapping(uint256 => LoanRequest) public loanRequests;
    mapping(uint256 => FundingOffer[]) public fundingOffersByLoanRequest;
    mapping(address => uint256[]) public loanRequestsByBorrower;
    uint256[] public loanRequestIds;

    event LoanRequestCreated(uint256 indexed requestId, address indexed borrower, address tokenToBorrow, uint256 amount);
    event CollateralDeposited(uint256 indexed requestId, address collateralAddress, uint256 collateralId, uint256 collateralAmount);
    event FundingOfferCreated(uint256 indexed offerId, uint256 indexed loanRequestId, address indexed funder, uint256 amount, uint256 percentage);
    event FundingOfferAccepted(uint256 indexed offerId, uint256 indexed loanRequestId, address indexed funder, uint256 amount);
    event LoanRequestCancelled(uint256 indexed requestId, address indexed borrower);
    event FundingOfferCancelled(uint256 indexed offerId, uint256 indexed loanRequestId, address indexed funder);



     function createLoanRequest(
        address _tokenToBorrow,
        uint256 _amount,
        uint256 _duration
    ) external returns (uint256) {
        require(_tokenToBorrow != address(0), "Invalid token address");
        loanRequestCounter++;
        uint256 newRequestId = loanRequestCounter;

        LoanRequest memory newRequest = LoanRequest({
            id: newRequestId,
            borrower: msg.sender,
            tokenToBorrow: _tokenToBorrow,
            amount: _amount,
            remainingAmount: _amount,
            duration: _duration,
            collateralAddress: address(0),
            collateralId: 0,
            collateralAmount: 0,
            isActive: true,
            isFullyFunded: false,
            isCancelled: false,
            lenders: new address[](0)
        });

        loanRequests[newRequestId] = newRequest;
        loanRequestIds.push(newRequestId);
        loanRequestsByBorrower[msg.sender].push(newRequestId);

        emit LoanRequestCreated(newRequestId, msg.sender, _tokenToBorrow, _amount);
        return newRequestId;
    }

    function depositNFTCollateral(uint256 _requestId, address _nftAddress, uint256 _tokenId) external {
        require(loanRequests[_requestId].borrower == msg.sender, "Not the borrower");
        require(loanRequests[_requestId].isActive, "Loan request is not active");
        require(loanRequests[_requestId].collateralAddress == address(0), "Collateral already set");

        IERC721 nft = IERC721(_nftAddress);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner of the NFT");

        nft.transferFrom(msg.sender, address(this), _tokenId);

        loanRequests[_requestId].collateralAddress = _nftAddress;
        loanRequests[_requestId].collateralId = _tokenId;

        emit CollateralDeposited(_requestId, _nftAddress, _tokenId, 0);
    }

    function depositTokenCollateral(uint256 _requestId, address _tokenAddress, uint256 _amount) external {
        require(loanRequests[_requestId].borrower == msg.sender, "Not the borrower");
        require(loanRequests[_requestId].isActive, "Loan request is not active");
        require(loanRequests[_requestId].collateralAddress == address(0), "Collateral already set");

        IERC20 token = IERC20(_tokenAddress);
        require(token.balanceOf(msg.sender) >= _amount, "Insufficient token balance");

        token.transferFrom(msg.sender, address(this), _amount);

        loanRequests[_requestId].collateralAddress = _tokenAddress;
        loanRequests[_requestId].collateralAmount = _amount;

        emit CollateralDeposited(_requestId, _tokenAddress, 0, _amount);
    }

    function getLoanRequestsCount() public view returns (uint256) {
        return loanRequestIds.length;
    }

    function getLoanRequestById(uint256 _requestId) public view returns (LoanRequest memory) {
        require(_requestId > 0 && _requestId <= loanRequestCounter, "Invalid request ID");
        return loanRequests[_requestId];
    }

    function getAllLoanRequests() public view returns (LoanRequest[] memory) {
        LoanRequest[] memory allRequests = new LoanRequest[](loanRequestIds.length);
        for (uint256 i = 0; i < loanRequestIds.length; i++) {
            allRequests[i] = loanRequests[loanRequestIds[i]];
        }
        return allRequests;
    }

     function createFundingOffer(uint256 _loanRequestId, uint256 _percentage) external returns (uint256) {
        require(_loanRequestId > 0 && _loanRequestId <= loanRequestCounter, "Invalid loan request ID");
        require(_percentage > 0 && _percentage <= 100, "Invalid percentage");
        
        LoanRequest storage loanRequest = loanRequests[_loanRequestId];
        require(loanRequest.isActive && !loanRequest.isFullyFunded, "Loan request is not active or already fully funded");
        
        uint256 offerAmount = (loanRequest.amount * _percentage) / 100;
        require(offerAmount <= loanRequest.remainingAmount, "Offer amount exceeds remaining amount");
        
        fundingOfferCounter++;
        uint256 newOfferId = fundingOfferCounter;
        
       FundingOffer memory newOffer = FundingOffer({
            id: newOfferId,
            loanRequestId: _loanRequestId,
            funder: msg.sender,
            amount: offerAmount,
            percentage: _percentage,
            isActive: true,
            isAccepted: false,
            isCancelled: false 
        });
        
        fundingOffersByLoanRequest[_loanRequestId].push(newOffer);
        
        emit FundingOfferCreated(newOfferId, _loanRequestId, msg.sender, offerAmount, _percentage);
        return newOfferId;
    }

    function cancelFundingOffer(uint256 _loanRequestId, uint256 _offerId) external {
        require(_loanRequestId > 0 && _loanRequestId <= loanRequestCounter, "Invalid loan request ID");
        
        FundingOffer[] storage offers = fundingOffersByLoanRequest[_loanRequestId];
        uint256 offerIndex = type(uint256).max;

        for (uint256 i = 0; i < offers.length; i++) {
            if (offers[i].id == _offerId) {
                offerIndex = i;
                break;
            }
        }

        require(offerIndex != type(uint256).max, "Funding offer not found");
        FundingOffer storage offerToCancel = offers[offerIndex];

        require(msg.sender == offerToCancel.funder, "Only the funder can cancel the offer");
        require(offerToCancel.isActive, "Offer is not active");
        require(!offerToCancel.isAccepted, "Cannot cancel an accepted offer");
        require(!offerToCancel.isCancelled, "Offer is already cancelled");

        offerToCancel.isActive = false;
        offerToCancel.isCancelled = true;

        emit FundingOfferCancelled(_offerId, _loanRequestId, msg.sender);
    }

    function getFundingOffersForLoanRequest(uint256 _loanRequestId) public view returns (FundingOffer[] memory) {
        require(_loanRequestId > 0 && _loanRequestId <= loanRequestCounter, "Invalid loan request ID");
        return fundingOffersByLoanRequest[_loanRequestId];
    }

    function getLoanRequestsForBorrower(address _borrower) public view returns (LoanRequest[] memory) {
        uint256[] memory requestIds = loanRequestsByBorrower[_borrower];
        LoanRequest[] memory requests = new LoanRequest[](requestIds.length);
        
        for (uint256 i = 0; i < requestIds.length; i++) {
            requests[i] = loanRequests[requestIds[i]];
        }
        
        return requests;
    }

    function acceptFundingOffer(uint256 _loanRequestId, uint256 _offerId) external nonReentrant {
        LoanRequest storage loanRequest = loanRequests[_loanRequestId];
        require(msg.sender == loanRequest.borrower, "Only the borrower can accept funding offers");
        require(loanRequest.isActive && !loanRequest.isFullyFunded, "Loan request is not active or already fully funded");

        FundingOffer[] storage offers = fundingOffersByLoanRequest[_loanRequestId];
        uint256 offerIndex = type(uint256).max;

         for (uint256 i = 0; i < offers.length; i++) {
            if (offers[i].id == _offerId && offers[i].isActive && !offers[i].isAccepted && !offers[i].isCancelled) {
                offerIndex = i;
                break;
            }
        }

        require(offerIndex != type(uint256).max, "Funding offer not found or not active");
        FundingOffer storage offerToAccept = offers[offerIndex];

        require(offerToAccept.amount <= loanRequest.remainingAmount, "Offer amount exceeds remaining amount");

        IERC20 token = IERC20(loanRequest.tokenToBorrow);
        require(token.transferFrom(offerToAccept.funder, loanRequest.borrower, offerToAccept.amount), "Token transfer failed");

        loanRequest.remainingAmount -= offerToAccept.amount;
        loanRequest.lenders.push(offerToAccept.funder);
        offerToAccept.isAccepted = true;
        offerToAccept.isActive = false;

        if (loanRequest.remainingAmount == 0) {
            loanRequest.isFullyFunded = true;
            loanRequest.isActive = false;
        }

        emit FundingOfferAccepted(_offerId, _loanRequestId, offerToAccept.funder, offerToAccept.amount);
    }


    function getAllLoanRequestsWithFundingOffers() public view returns (LoanRequest[] memory, FundingOffer[][] memory) {
        LoanRequest[] memory allRequests = new LoanRequest[](loanRequestIds.length);
        FundingOffer[][] memory allOffers = new FundingOffer[][](loanRequestIds.length);

        for (uint256 i = 0; i < loanRequestIds.length; i++) {
            uint256 requestId = loanRequestIds[i];
            allRequests[i] = loanRequests[requestId];
            allOffers[i] = fundingOffersByLoanRequest[requestId];
        }

        return (allRequests, allOffers);
    }

    function cancelLoanRequest(uint256 _requestId) external {
        LoanRequest storage loanRequest = loanRequests[_requestId];
        require(msg.sender == loanRequest.borrower, "Only the borrower can cancel the loan request");
        require(loanRequest.isActive, "Loan request is not active");
        require(!loanRequest.isFullyFunded, "Cannot cancel a fully funded loan request");

        loanRequest.isActive = false;
        loanRequest.isCancelled = true;

        if (loanRequest.collateralAddress != address(0)) {
            if (loanRequest.collateralId != 0) {
                IERC721(loanRequest.collateralAddress).transferFrom(address(this), loanRequest.borrower, loanRequest.collateralId);
            } else if (loanRequest.collateralAmount != 0) {
                IERC20(loanRequest.collateralAddress).transfer(loanRequest.borrower, loanRequest.collateralAmount);
            }
        }

        emit LoanRequestCancelled(_requestId, msg.sender);
    }
    
}