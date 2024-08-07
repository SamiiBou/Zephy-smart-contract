const { ethers } = require("hardhat");

async function main() {
  const wallet = ethers.Wallet.createRandom();
  console.log("Nouvelle adresse:", wallet.address);
  console.log("Nouvelle clé privée:", wallet.privateKey);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});