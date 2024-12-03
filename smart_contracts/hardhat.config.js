require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.0",
  networks: {
    // goerli: {
    //   url: "https://eth-sepolia.g.alchemy.com/v2/7T2C75n4gbU5s4AsI7g95D1_6PYlnCU2",
    //   accounts: [
    //     // "8140ff0edef8e47e619662f58864713f0866ea134b5c41cca890f8b3af187915",
    //     "35c05a17ec45289f3b9b7344581c87290fb1769b5416aad89c6d648577d05f15",
    //   ],
    // },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/7T2C75n4gbU5s4AsI7g95D1_6PYlnCU2",
      accounts: [
        // "8140ff0edef8e47e619662f58864713f0866ea134b5c41cca890f8b3af187915",
        "35c05a17ec45289f3b9b7344581c87290fb1769b5416aad89c6d648577d05f15",
      ],
    },
  },
};



// contract address: 0x7463B38820A1eF7E636E0bE2F82Ca08E815a0888