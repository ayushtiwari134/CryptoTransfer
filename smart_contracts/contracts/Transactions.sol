//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
//this marks the beginning of the contract.
contract Transactions {
    
    // a variable is defined to store the total number of transactions.
    uint256 transactionCount;

    // an event is fired to basically mimic a function call.
    event Transfer(
        address sender,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    // all the data from the forms in the frontend will be stored in the form of a struct.
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // initializing an array of the struct TransferStruct datatype.
    TransferStruct[] transactions;

    //function which appends the data from each created struct into the list which was created before.
    function addToBlockchain(
        address payable receiver,
        uint amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        // the event was fired here.
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    // a function to read the entire list and return it.
    function readFromBlockchain()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    // function to return the total number of transactions or basically the length of the list that was created.
    function getTotalTransactions() public view returns (uint256) {
        return transactionCount;
    }
}
