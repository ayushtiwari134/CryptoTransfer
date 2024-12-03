import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const getEthereumContract = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
        return transactionContract;
    } else {
        console.error("Ethereum object not found. Please install MetaMask.");
        return null;
    }
};

export const TransactionProvider = ({ children }) => {
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ addressTo: "", amount: "", message: "", gif: "" });
    const [currentAccount, setCurrentAccount] = useState('');

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) {
                console.warn("MetaMask is not installed!");
                return;
            }
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log("Wallet connected:", accounts[0]);
            } else {
                console.log("No authorized account found.");
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed! Please install it to use this app.");
                return;
            }
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
            console.log("Connected account:", accounts[0]);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const sendTransaction = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed!");
                return;
            }
            const { addressTo, amount, message, gif } = formData;
            if (!addressTo || !amount || !message || !gif) {
                alert("Please fill in all the fields!");
                return;
            }

            const transactionContract = await getEthereumContract();
            if (!transactionContract) return;

            const parsedAmount = ethers.parseEther(amount);

            await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208", // 21000 Gwei
                    value: parsedAmount.toString(16),
                }],
            });

            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message,
                gif
            );

            setIsLoading(true);
            console.log(`Transaction hash: ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);

            const transactionCount = await transactionContract.getTotalTransactions();
            setTransactionCount(transactionCount.toNumber());
            setFormData({ addressTo: "", amount: "", message: "", gif: "" });
        } catch (error) {
            console.error("Error sending transaction:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && window.ethereum) {
            checkIfWalletIsConnected();
        } else {
            console.warn("MetaMask not detected. Please install MetaMask to use this app.");
        }
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                formData,
                handleChange,
                sendTransaction,
                isLoading,
                setFormData,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};