require("dotenv").config();
const hre = require("hardhat");

async function main() {
    const PaymentContract = await hre.ethers.getContractFactory(
        "PaymentContract"
    );
    const paymentContract = await PaymentContract.attach(
        process.env.CONTRACT_ADDRESS
    );

    const [sender] = await hre.ethers.getSigners();
    const amount = hre.ethers.utils.parseEther("0.0001");

    console.log("Creating payment request...");
    console.log("Recipient:", sender.address);
    console.log("Amount:", hre.ethers.utils.formatEther(amount), "ETH");

    const tx = await paymentContract.createPaymentRequest(amount);
    const receipt = await tx.wait();

    const requestId = receipt.events.find(
        (e) => e.event === "PaymentRequestCreated"
    ).args.requestId;

    console.log("Payment request created!");
    console.log("Request ID:", requestId);
    console.log("Transaction hash:", tx.hash);

    console.log(
        "Save this Request ID for use in payWithLink script:",
        requestId
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
