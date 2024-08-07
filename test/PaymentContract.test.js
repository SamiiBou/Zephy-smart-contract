const { ethers } = require("hardhat");

describe("PaymentContract", function () {
  let chai;
  let expect;
  let PaymentContract, paymentContract, owner, addr1, addr2;

  before(async function () {
    chai = await import('chai');
    expect = chai.expect;
  });

  beforeEach(async function () {
    PaymentContract = await ethers.getContractFactory("PaymentContract");
    [owner, addr1, addr2] = await ethers.getSigners();
    paymentContract = await PaymentContract.deploy();
    await paymentContract.deployed();
  });

  it("Should create a payment and emit correct events", async function () {
    const amount = ethers.utils.parseEther("1");
    const tx = await paymentContract.createPayment(addr1.address, { value: amount });
    const receipt = await tx.wait();
    
    expect(receipt.events[0].event).to.equal("PaymentCreated");
    expect(receipt.events[0].args[0].eq(ethers.BigNumber.from(1))).to.be.true;
    expect(receipt.events[0].args[1]).to.equal(owner.address);
    expect(receipt.events[0].args[2]).to.equal(addr1.address);
    expect(receipt.events[0].args[3].eq(amount)).to.be.true;
    
    expect(receipt.events[1].event).to.equal("PaymentPaid");
    expect(receipt.events[1].args[0].eq(ethers.BigNumber.from(1))).to.be.true;
  });
  
  it("Should create a payment and transfer funds to recipient", async function () {
    const amount = ethers.utils.parseEther("1");
    const initialBalance = await ethers.provider.getBalance(addr1.address);
    
    await paymentContract.createPayment(addr1.address, { value: amount });
    
    const finalBalance = await ethers.provider.getBalance(addr1.address);
    
    expect(finalBalance.sub(initialBalance).eq(amount)).to.be.true;
    
    const payment = await paymentContract.payments(1);
    expect(payment.isPaid).to.be.true;
  });
  
  describe("Payment link functionality", function () {
    it("Should create a payment request", async function () {
      const amount = ethers.utils.parseEther("1");
      const tx = await paymentContract.createPaymentRequest(amount);
      const receipt = await tx.wait();
      
      expect(receipt.events[0].event).to.equal("PaymentRequestCreated");
      const requestId = receipt.events[0].args[0];
      expect(ethers.utils.isHexString(requestId)).to.be.true;
      expect(receipt.events[0].args[1]).to.equal(owner.address);
      expect(receipt.events[0].args[2].eq(amount)).to.be.true;
    });

    it("Should pay with a valid payment link", async function () {
      const amount = ethers.utils.parseEther("1");
      const tx = await paymentContract.createPaymentRequest(amount);
      const receipt = await tx.wait();
      const requestId = receipt.events[0].args[0];

      const balanceBefore = await ethers.provider.getBalance(owner.address);

      await paymentContract.connect(addr2).payWithLink(requestId, { value: amount });

      const balanceAfter = await ethers.provider.getBalance(owner.address);
      expect(balanceAfter.sub(balanceBefore).eq(amount)).to.be.true;

      const paymentId = await paymentContract.paymentLinks(requestId);
      const payment = await paymentContract.payments(paymentId);
      expect(payment.isPaid).to.be.true;
      expect(payment.sender).to.equal(addr2.address);
    });

    it("Should fail to pay with an invalid payment link", async function () {
      const invalidRequestId = ethers.utils.randomBytes(32);
      const amount = ethers.utils.parseEther("1");

      await expect(
        paymentContract.connect(addr2).payWithLink(invalidRequestId, { value: amount })
      ).to.be.revertedWith("Invalid payment request");
    });

    it("Should fail to pay with incorrect amount", async function () {
      const amount = ethers.utils.parseEther("1");
      const tx = await paymentContract.createPaymentRequest(amount);
      const receipt = await tx.wait();
      const requestId = receipt.events[0].args[0];

      const incorrectAmount = ethers.utils.parseEther("0.5");

      await expect(
        paymentContract.connect(addr2).payWithLink(requestId, { value: incorrectAmount })
      ).to.be.revertedWith("Incorrect payment amount");
    });
  });
});