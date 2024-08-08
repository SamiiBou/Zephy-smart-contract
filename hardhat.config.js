require("@nomiclabs/hardhat-waffle");
require("@eth-optimism/hardhat-ovm");
require("dotenv").config();

module.exports = {
    solidity: "0.8.26",
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    networks: {
        optimism: {
            url: "https://mainnet.optimism.io",
            accounts: [process.env.PRIVATE_KEY],
        },
        "optimism-sepolia": {
            url: "https://sepolia.optimism.io",
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};
