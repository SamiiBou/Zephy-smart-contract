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

  it("Should create a payment", async function () {
    const amount = ethers.utils.parseEther("1");
    const tx = await paymentContract.createPayment(addr1.address, { value: amount });
    const receipt = await tx.wait();
    
    expect(receipt.events[0].event).to.equal("PaymentCreated");
    expect(receipt.events[0].args[0].eq(ethers.BigNumber.from(1))).to.be.true;
    expect(receipt.events[0].args[1]).to.equal(owner.address);
    expect(receipt.events[0].args[2]).to.equal(addr1.address);
    expect(receipt.events[0].args[3].eq(amount)).to.be.true; 
  });
});