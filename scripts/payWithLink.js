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

    const requestId = process.env.REQUEST_ID;

    const paymentId = await paymentContract.paymentLinks(requestId);
    const payment = await paymentContract.payments(paymentId);
    const amount = payment.amount;

    console.log("Paying with link...");
    console.log("Request ID:", requestId);
    console.log("Sender:", sender.address);
    console.log("Amount:", hre.ethers.utils.formatEther(amount), "ETH");

    const tx = await paymentContract.payWithLink(requestId, { value: amount });
    await tx.wait();

    console.log("Payment completed!");
    console.log("Transaction hash:", tx.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
