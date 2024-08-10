const { ethers } = require("hardhat");

describe("LoanRequestContract", function () {
    let chai;
    let expect;
    let LoanRequestContract, loanRequestContract, owner, addr1, addr2;
    let MockERC721, mockNFT;
    let MockERC20, mockToken, mockTokenToBorrow;

    before(async function () {
        chai = await import("chai");
        expect = chai.expect;
    });

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        MockERC721 = await ethers.getContractFactory("MockERC721");
        mockNFT = await MockERC721.deploy("MockNFT", "MNFT");
        await mockNFT.deployed();

        MockERC20 = await ethers.getContractFactory("MockERC20");
        mockToken = await MockERC20.deploy(
            "MockToken",
            "MTK",
            ethers.utils.parseEther("1000")
        );
        await mockToken.deployed();

        mockTokenToBorrow = await MockERC20.deploy(
            "MockTokenToBorrow",
            "MTKB",
            ethers.utils.parseEther("10000")
        );
        await mockTokenToBorrow.deployed();

        LoanRequestContract = await ethers.getContractFactory(
            "LoanRequestContract"
        );
        loanRequestContract = await LoanRequestContract.deploy();
        await loanRequestContract.deployed();
    });

    describe("Loan Request Creation", function () {
        it("Should create a new loan request and emit correct event", async function () {
            const amount = ethers.utils.parseEther("1");
            const duration = 30 * 24 * 60 * 60; // 30 days in seconds

            await expect(
                loanRequestContract.createLoanRequest(
                    mockTokenToBorrow.address,
                    amount,
                    duration
                )
            )
                .to.emit(loanRequestContract, "LoanRequestCreated")
                .withArgs(1, owner.address, mockTokenToBorrow.address, amount);
        });

        it("Should update loan request details correctly", async function () {
            const amount = ethers.utils.parseEther("1");
            const duration = 30 * 24 * 60 * 60;

            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                amount,
                duration
            );

            const loanRequest = await loanRequestContract.getLoanRequestById(1);
            expect(loanRequest.id).to.equal(1);
            expect(loanRequest.borrower).to.equal(owner.address);
            expect(loanRequest.tokenToBorrow).to.equal(
                mockTokenToBorrow.address
            );
            expect(loanRequest.amount).to.equal(amount);
            expect(loanRequest.remainingAmount).to.equal(amount);
            expect(loanRequest.duration).to.equal(duration);
            expect(loanRequest.isActive).to.be.true;
            expect(loanRequest.isFullyFunded).to.be.false;
            expect(loanRequest.lenders).to.be.an("array").that.is.empty;
        });

        it("Should revert when trying to create a loan request with zero address as token", async function () {
            const amount = ethers.utils.parseEther("1");
            const duration = 30 * 24 * 60 * 60;

            await expect(
                loanRequestContract.createLoanRequest(
                    ethers.constants.AddressZero,
                    amount,
                    duration
                )
            ).to.be.revertedWith("Invalid token address");
        });
    });

    describe("NFT Collateral Deposit", function () {
        it("Should deposit NFT collateral and emit correct event", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("1"),
                2592000
            );
            await mockNFT.mint(owner.address, 1);
            await mockNFT.approve(loanRequestContract.address, 1);

            await expect(
                loanRequestContract.depositNFTCollateral(1, mockNFT.address, 1)
            )
                .to.emit(loanRequestContract, "CollateralDeposited")
                .withArgs(1, mockNFT.address, 1, 0);
        });

        it("Should update loan request with NFT collateral details", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("1"),
                2592000
            );
            await mockNFT.mint(owner.address, 1);
            await mockNFT.approve(loanRequestContract.address, 1);

            await loanRequestContract.depositNFTCollateral(
                1,
                mockNFT.address,
                1
            );

            const loanRequest = await loanRequestContract.getLoanRequestById(1);
            expect(loanRequest.collateralAddress).to.equal(mockNFT.address);
            expect(loanRequest.collateralId).to.equal(1);
        });
    });

    describe("Token Collateral Deposit", function () {
        it("Should deposit token collateral and emit correct event", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("1"),
                2592000
            );
            const collateralAmount = ethers.utils.parseEther("10");
            await mockToken.approve(
                loanRequestContract.address,
                collateralAmount
            );

            await expect(
                loanRequestContract.depositTokenCollateral(
                    1,
                    mockToken.address,
                    collateralAmount
                )
            )
                .to.emit(loanRequestContract, "CollateralDeposited")
                .withArgs(1, mockToken.address, 0, collateralAmount);
        });

        it("Should update loan request with token collateral details", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("1"),
                2592000
            );
            const collateralAmount = ethers.utils.parseEther("10");
            await mockToken.approve(
                loanRequestContract.address,
                collateralAmount
            );

            await loanRequestContract.depositTokenCollateral(
                1,
                mockToken.address,
                collateralAmount
            );

            const loanRequest = await loanRequestContract.getLoanRequestById(1);
            expect(loanRequest.collateralAddress).to.equal(mockToken.address);
            expect(loanRequest.collateralAmount).to.equal(collateralAmount);
        });

        it("Should fail to deposit insufficient token amount", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("1"),
                2592000
            );
            const collateralAmount = ethers.utils.parseEther("1000000"); // More than available balance
            await mockToken.approve(
                loanRequestContract.address,
                collateralAmount
            );

            await expect(
                loanRequestContract.depositTokenCollateral(
                    1,
                    mockToken.address,
                    collateralAmount
                )
            ).to.be.revertedWith("Insufficient token balance");
        });
    });

    describe("Loan Request Retrieval", function () {
        it("Should correctly return the number of loan requests", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("1"),
                2592000
            );
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("2"),
                2592000
            );

            const count = await loanRequestContract.getLoanRequestsCount();
            expect(count).to.equal(2);
        });

        it("Should correctly return a specific loan request by ID", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("1"),
                2592000
            );

            const loanRequest = await loanRequestContract.getLoanRequestById(1);
            expect(loanRequest.id).to.equal(1);
            expect(loanRequest.tokenToBorrow).to.equal(
                mockTokenToBorrow.address
            );
            expect(loanRequest.amount).to.equal(ethers.utils.parseEther("1"));
        });

        it("Should correctly return all loan requests", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("1"),
                2592000
            );
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("2"),
                2592000
            );

            const allRequests = await loanRequestContract.getAllLoanRequests();
            expect(allRequests.length).to.equal(2);
            expect(allRequests[0].id).to.equal(1);
            expect(allRequests[1].id).to.equal(2);
            expect(allRequests[0].tokenToBorrow).to.equal(
                mockTokenToBorrow.address
            );
            expect(allRequests[1].tokenToBorrow).to.equal(
                mockTokenToBorrow.address
            );
            expect(allRequests[0].amount).to.equal(
                ethers.utils.parseEther("1")
            );
            expect(allRequests[1].amount).to.equal(
                ethers.utils.parseEther("2")
            );
        });
    });
    describe("Funding Offer Creation", function () {
        it("Should create a new funding offer and emit correct event", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("10"),
                2592000
            );

            const percentage = 30; // 30%
            await expect(
                loanRequestContract
                    .connect(addr1)
                    .createFundingOffer(1, percentage)
            )
                .to.emit(loanRequestContract, "FundingOfferCreated")
                .withArgs(
                    1,
                    1,
                    addr1.address,
                    ethers.utils.parseEther("3"),
                    percentage
                );
        });

        it("Should fail to create a funding offer for non-existent loan request", async function () {
            await expect(
                loanRequestContract.connect(addr1).createFundingOffer(999, 30)
            ).to.be.revertedWith("Invalid loan request ID");
        });

        it("Should fail to create a funding offer with invalid percentage", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("10"),
                2592000
            );

            await expect(
                loanRequestContract.connect(addr1).createFundingOffer(1, 0)
            ).to.be.revertedWith("Invalid percentage");

            await expect(
                loanRequestContract.connect(addr1).createFundingOffer(1, 101)
            ).to.be.revertedWith("Invalid percentage");
        });
    });

    describe("Funding Offer Retrieval", function () {
        it("Should correctly return funding offers for a loan request", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("10"),
                2592000
            );

            await loanRequestContract.connect(addr1).createFundingOffer(1, 30);
            await loanRequestContract.connect(addr2).createFundingOffer(1, 40);

            const offers =
                await loanRequestContract.getFundingOffersForLoanRequest(1);
            expect(offers.length).to.equal(2);
            expect(offers[0].funder).to.equal(addr1.address);
            expect(offers[1].funder).to.equal(addr2.address);
            expect(offers[0].percentage).to.equal(30);
            expect(offers[1].percentage).to.equal(40);
        });
    });

    describe("Loan Requests for Borrower", function () {
        it("Should correctly return loan requests for a borrower", async function () {
            await loanRequestContract
                .connect(addr1)
                .createLoanRequest(
                    mockTokenToBorrow.address,
                    ethers.utils.parseEther("10"),
                    2592000
                );
            await loanRequestContract
                .connect(addr1)
                .createLoanRequest(
                    mockTokenToBorrow.address,
                    ethers.utils.parseEther("20"),
                    2592000
                );

            const requests =
                await loanRequestContract.getLoanRequestsForBorrower(
                    addr1.address
                );
            expect(requests.length).to.equal(2);
            expect(requests[0].borrower).to.equal(addr1.address);
            expect(requests[1].borrower).to.equal(addr1.address);
            expect(requests[0].amount).to.equal(ethers.utils.parseEther("10"));
            expect(requests[1].amount).to.equal(ethers.utils.parseEther("20"));
        });
    });

    describe("Funding Offer Acceptance", function () {
        beforeEach(async function () {
            await loanRequestContract
                .connect(addr1)
                .createLoanRequest(
                    mockTokenToBorrow.address,
                    ethers.utils.parseEther("10"),
                    2592000
                );
            await loanRequestContract.connect(addr2).createFundingOffer(1, 30);
            await mockTokenToBorrow.transfer(
                addr2.address,
                ethers.utils.parseEther("10")
            );
            await mockTokenToBorrow
                .connect(addr2)
                .approve(
                    loanRequestContract.address,
                    ethers.utils.parseEther("10")
                );
        });

        it("Should allow borrower to accept a funding offer", async function () {
            await expect(
                loanRequestContract.connect(addr1).acceptFundingOffer(1, 1)
            )
                .to.emit(loanRequestContract, "FundingOfferAccepted")
                .withArgs(1, 1, addr2.address, ethers.utils.parseEther("3"));

            const loanRequest = await loanRequestContract.getLoanRequestById(1);
            expect(loanRequest.remainingAmount).to.equal(
                ethers.utils.parseEther("7")
            );
            expect(loanRequest.lenders[0]).to.equal(addr2.address);
        });

        it("Should fail when non-borrower tries to accept a funding offer", async function () {
            await expect(
                loanRequestContract.connect(addr2).acceptFundingOffer(1, 1)
            ).to.be.revertedWith("Only the borrower can accept funding offers");
        });

        it("Should fail when trying to accept a non-existent offer", async function () {
            await expect(
                loanRequestContract.connect(addr1).acceptFundingOffer(1, 999)
            ).to.be.revertedWith("Funding offer not found or not active");
        });

        it("Should mark loan request as fully funded when all amount is covered", async function () {
            await loanRequestContract.connect(addr2).createFundingOffer(1, 70);
            await loanRequestContract.connect(addr1).acceptFundingOffer(1, 1);
            await loanRequestContract.connect(addr1).acceptFundingOffer(1, 2);

            const loanRequest = await loanRequestContract.getLoanRequestById(1);
            expect(loanRequest.isFullyFunded).to.be.true;
            expect(loanRequest.isActive).to.be.false;
            expect(loanRequest.remainingAmount).to.equal(0);
        });
    });

    describe("Get All Loan Requests with Funding Offers", function () {
        it("Should return all loan requests with their funding offers", async function () {
            await loanRequestContract
                .connect(addr1)
                .createLoanRequest(
                    mockTokenToBorrow.address,
                    ethers.utils.parseEther("10"),
                    2592000
                );
            await loanRequestContract.connect(addr2).createFundingOffer(1, 30);
            await loanRequestContract.connect(addr2).createFundingOffer(1, 40);

            const [requests, offers] =
                await loanRequestContract.getAllLoanRequestsWithFundingOffers();
            expect(requests.length).to.equal(1);
            expect(offers.length).to.equal(1);
            expect(offers[0].length).to.equal(2);
            expect(requests[0].borrower).to.equal(addr1.address);
            expect(offers[0][0].funder).to.equal(addr2.address);
            expect(offers[0][1].funder).to.equal(addr2.address);
        });
    });

    describe("Loan Request Cancellation", function () {
        beforeEach(async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("10"),
                2592000
            );
            await mockNFT.mint(owner.address, 1);
            await mockNFT.approve(loanRequestContract.address, 1);
            await loanRequestContract.depositNFTCollateral(
                1,
                mockNFT.address,
                1
            );
        });

        it("Should allow borrower to cancel loan request", async function () {
            await expect(loanRequestContract.cancelLoanRequest(1))
                .to.emit(loanRequestContract, "LoanRequestCancelled")
                .withArgs(1, owner.address);

            const loanRequest = await loanRequestContract.getLoanRequestById(1);
            expect(loanRequest.isActive).to.be.false;
            expect(loanRequest.isCancelled).to.be.true;
        });

        it("Should return NFT collateral when cancelling loan request", async function () {
            await loanRequestContract.cancelLoanRequest(1);
            expect(await mockNFT.ownerOf(1)).to.equal(owner.address);
        });

        it("Should fail when non-borrower tries to cancel loan request", async function () {
            await expect(
                loanRequestContract.connect(addr1).cancelLoanRequest(1)
            ).to.be.revertedWith(
                "Only the borrower can cancel the loan request"
            );
        });

        it("Should fail to cancel an already cancelled loan request", async function () {
            await loanRequestContract.cancelLoanRequest(1);
            await expect(
                loanRequestContract.cancelLoanRequest(1)
            ).to.be.revertedWith("Loan request is not active");
        });
    });

    describe("Funding Offer Cancellation", function () {
        beforeEach(async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("10"),
                2592000
            );
            await loanRequestContract.connect(addr1).createFundingOffer(1, 30);
        });

        it("Should allow funder to cancel funding offer", async function () {
            await expect(
                loanRequestContract.connect(addr1).cancelFundingOffer(1, 1)
            )
                .to.emit(loanRequestContract, "FundingOfferCancelled")
                .withArgs(1, 1, addr1.address);

            const offers =
                await loanRequestContract.getFundingOffersForLoanRequest(1);
            expect(offers[0].isActive).to.be.false;
            expect(offers[0].isCancelled).to.be.true;
        });

        it("Should fail when non-funder tries to cancel funding offer", async function () {
            await expect(
                loanRequestContract.connect(addr2).cancelFundingOffer(1, 1)
            ).to.be.revertedWith("Only the funder can cancel the offer");
        });

        it("Should fail to cancel an already cancelled funding offer", async function () {
            await loanRequestContract.connect(addr1).cancelFundingOffer(1, 1);
            await expect(
                loanRequestContract.connect(addr1).cancelFundingOffer(1, 1)
            ).to.be.revertedWith("Offer is not active");
        });

        it("Should not allow cancelling an accepted funding offer", async function () {
            await mockTokenToBorrow.transfer(
                addr1.address,
                ethers.utils.parseEther("10")
            );
            await mockTokenToBorrow
                .connect(addr1)
                .approve(
                    loanRequestContract.address,
                    ethers.utils.parseEther("10")
                );

            await loanRequestContract.acceptFundingOffer(1, 1);

            await expect(
                loanRequestContract.connect(addr1).cancelFundingOffer(1, 1)
            ).to.be.revertedWith("Offer is not active");

            const offers =
                await loanRequestContract.getFundingOffersForLoanRequest(1);
            expect(offers[0].isAccepted).to.be.true;
            expect(offers[0].isActive).to.be.false;
        });
    });

    describe("Integration tests", function () {
        it("Should not allow accepting a cancelled funding offer", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("10"),
                2592000
            );
            await loanRequestContract.connect(addr1).createFundingOffer(1, 30);
            await loanRequestContract.connect(addr1).cancelFundingOffer(1, 1);

            await expect(
                loanRequestContract.acceptFundingOffer(1, 1)
            ).to.be.revertedWith("Funding offer not found or not active");
        });

        it("Should not allow creating a funding offer for a cancelled loan request", async function () {
            await loanRequestContract.createLoanRequest(
                mockTokenToBorrow.address,
                ethers.utils.parseEther("10"),
                2592000
            );
            await loanRequestContract.cancelLoanRequest(1);

            await expect(
                loanRequestContract.connect(addr1).createFundingOffer(1, 30)
            ).to.be.revertedWith(
                "Loan request is not active or already fully funded"
            );
        });
    });
});
