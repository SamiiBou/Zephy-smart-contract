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
    const recipient = process.env.RECIPIENT_ADDRESS;

    const amount = hre.ethers.utils.parseEther("0.0001");

    console.log("Sending payment...");
    console.log("From:", sender.address);
    console.log("To:", recipient);
    console.log("Amount:", hre.ethers.utils.formatEther(amount), "ETH");

    const tx = await paymentContract.createPayment(recipient, {
        value: amount,
    });
    await tx.wait();

    console.log("Payment sent!");
    console.log("Transaction hash:", tx.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
