require("@nomiclabs/hardhat-waffle");
require("@eth-optimism/hardhat-ovm");
require("dotenv").config();

module.exports = {
  solidity: "0.8.26",
  networks: {
    optimism: {
      url: "https://mainnet.optimism.io",
      accounts: [process.env.PRIVATE_KEY],
    },
    "optimism-goerli": {
      url: "https://goerli.optimism.io",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};