import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

//creates an ethereum object which can be used to fetch accounts from metamask and store them in variables.
const { ethereum } = window;

//this is the contract generation function which helps us allot the contract that we created in solidity to a variable ("transactionContract",in our case) so that we can use the functions in react frontend.
const getEthereumContract = () => {
    // creates a new provider.
    const provider = new ethers.providers.Web3Provider(ethereum);
    // creates a new signer.
    const signer = provider.getSigner();
    // creates the contract object to be used here in react, using the contractAddress, abi(s) of the contract and the signer.
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
}

// this is the main code which sends over the functions throughout the app.
export const TransactionProvider = ({ children }) => {
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ addressTo: "", amount: "", message: "", gif: "" });

    // function to update the fields simultaneously as the user fills them in.
    const handleChange = (e, name) => {

        // we loop through the previous state and update the keys dynamically depending on which field the user enters the data in.
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    // state to set the current account.
    const [currentAccount, setCurrentAccount] = useState('');

    // function to check if the wallet is connected.
    const checkIfWalletIsConnected = async () => {
        try {
            // if ethereum window object is not created, it will ask you to open metamask. 
            if (!ethereum) return alert("Please install metamask!");
            const accounts = await ethereum.request({ method: "eth_accounts" })
            console.log(accounts)
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            }
        } catch (error) {
            console.log(error);
            throw new Error("no ethereum object.")
        }

    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");
            const { addressTo, amount, message, gif } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 gwei
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, gif);
            setIsLoading(true);
            await transactionHash.wait();
            setFormData(({ addressTo: "", amount: "", message: "", gif: "" }))
            setIsLoading(false);

            const transactionCount = await transactionContract.getTotalTransactions();
            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
            throw new Error("no ethereum object.")
        }
    }

    //function to connect the wallet.
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");
            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("no ethereum object.")
        }
    }
    //to check if wallet is connected when the page is first reloaded.
    useEffect(() => {
        // getEthereumContract();
        checkIfWalletIsConnected();
    }, [])

    //returns all the functions and transfers them to all the components throughout the app.
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, handleChange, sendTransaction, isLoading, setFormData }}>
            {children}
        </TransactionContext.Provider >
    )
}

