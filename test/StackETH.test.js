const { ethers } = require("hardhat");

describe("IndirectAaveEthStaking", function () {
    let chai;
    let expect;
    let IndirectAaveEthStaking, indirectStaking, owner, addr1, addr2;
    let MockWETH, mockWETH;
    let MockAavePool, mockAavePool;

    before(async function () {
        chai = await import("chai");
        expect = chai.expect;
    });

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy mock contracts
        MockWETH = await ethers.getContractFactory("MockWETH");
        mockWETH = await MockWETH.deploy();
        await mockWETH.deployed();

        MockAavePool = await ethers.getContractFactory("MockAavePool");
        mockAavePool = await MockAavePool.deploy();
        await mockAavePool.deployed();

        // Deploy the main contract
        IndirectAaveEthStaking = await ethers.getContractFactory(
            "IndirectAaveEthStaking"
        );
        indirectStaking = await IndirectAaveEthStaking.deploy(
            mockWETH.address,
            mockAavePool.address,
            ethers.constants.AddressZero // Mock aWETH address
        );
        await indirectStaking.deployed();
    });

    it("Should stake ETH and emit correct event", async function () {
        const amount = ethers.utils.parseEther("1");
        await expect(indirectStaking.stake({ value: amount }))
            .to.emit(indirectStaking, "Staked")
            .withArgs(owner.address, amount);
    });

    it("Should update balances after staking", async function () {
        const amount = ethers.utils.parseEther("1");
        await indirectStaking.stake({ value: amount });

        const balance = await indirectStaking.balanceOf(owner.address);
        expect(balance).to.equal(amount);

        const totalSupply = await indirectStaking.totalSupply();
        expect(totalSupply).to.equal(amount);
    });

    it("Should withdraw staked ETH and emit correct event", async function () {
        const stakeAmount = ethers.utils.parseEther("1");
        await indirectStaking.stake({ value: stakeAmount });

        const withdrawAmount = ethers.utils.parseEther("0.5");
        await expect(indirectStaking.withdraw(withdrawAmount))
            .to.emit(indirectStaking, "Withdrawn")
            .withArgs(owner.address, withdrawAmount);
    });

    it("Should update balances after withdrawal", async function () {
        const stakeAmount = ethers.utils.parseEther("1");
        await indirectStaking.stake({ value: stakeAmount });

        const withdrawAmount = ethers.utils.parseEther("0.5");
        await indirectStaking.withdraw(withdrawAmount);

        const balance = await indirectStaking.balanceOf(owner.address);
        expect(balance).to.equal(stakeAmount.sub(withdrawAmount));

        const totalSupply = await indirectStaking.totalSupply();
        expect(totalSupply).to.equal(stakeAmount.sub(withdrawAmount));
    });

    it("Should receive ETH via receive function", async function () {
        const amount = ethers.utils.parseEther("1");
        await owner.sendTransaction({
            to: indirectStaking.address,
            value: amount,
        });

        const balance = await ethers.provider.getBalance(
            indirectStaking.address
        );
        expect(balance).to.equal(amount);
    });

    it("Should fail to withdraw more than staked", async function () {
        const stakeAmount = ethers.utils.parseEther("1");
        await indirectStaking.stake({ value: stakeAmount });

        const withdrawAmount = ethers.utils.parseEther("1.5");
        await expect(
            indirectStaking.withdraw(withdrawAmount)
        ).to.be.revertedWith("Not enough balance");
    });
});
