require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/oVJ8Ml2vw1LwSsfsOCzE88h9ExohfAYb",
      accounts: [
        "8140ff0edef8e47e619662f58864713f0866ea134b5c41cca890f8b3af187915",
      ],
    },
  },
};
