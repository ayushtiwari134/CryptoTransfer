const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("Transactions", function () {
  // Fixture for deploying the Transactions contract
  async function deployTransactionsFixture() {
    // Get the first signer for testing
    const [owner, otherAccount] = await ethers.getSigners();

    // Deploy the Transactions contract
    const Transactions = await ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();

    return { transactions, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should initialize the transaction count to zero", async function () {
      const { transactions } = await deployTransactionsFixture();
      expect(await transactions.getTotalTransactions()).to.equal(0);
    });
  });

  describe("Transactions", function () {
    it("Should add a transaction and increment the transaction count", async function () {
      const { transactions, owner } = await deployTransactionsFixture();

      const receiver = ethers.Wallet.createRandom().address; // Random address
      const amount = ethers.utils.parseEther("1"); // 1 ETH
      const message = "Test transaction";
      const keyword = "test";

      // Add a transaction
      await transactions.addToBlockchain(receiver, amount, message, keyword);

      // Verify the transaction count is updated
      expect(await transactions.getTotalTransactions()).to.equal(1);
    });

    it("Should store the transaction details correctly", async function () {
      const { transactions, owner } = await deployTransactionsFixture();

      const receiver = ethers.Wallet.createRandom().address; // Random address
      const amount = ethers.utils.parseEther("1"); // 1 ETH
      const message = "Transaction storage test";
      const keyword = "storage";

      // Add a transaction
      await transactions.addToBlockchain(receiver, amount, message, keyword);

      // Retrieve stored transactions
      const storedTransactions = await transactions.readFromBlockchain();

      // Verify the transaction details
      expect(storedTransactions.length).to.equal(1);
      const txn = storedTransactions[0];
      expect(txn.sender).to.equal(owner.address);
      expect(txn.receiver).to.equal(receiver);
      expect(txn.amount.toString()).to.equal(amount.toString());
      expect(txn.message).to.equal(message);
      expect(txn.keyword).to.equal(keyword);
    });

    it("Should emit the Transfer event with correct details", async function () {
      const { transactions, owner } = await deployTransactionsFixture();

      const receiver = ethers.Wallet.createRandom().address; // Random address
      const amount = ethers.utils.parseEther("1"); // 1 ETH
      const message = "Test event emission";
      const keyword = "event";

      // Expect the event to be emitted with correct arguments
      await expect(transactions.addToBlockchain(receiver, amount, message, keyword))
        .to.emit(transactions, "Transfer")
        .withArgs(owner.address, receiver, amount, message, anyValue, keyword);
    });
  });
});
