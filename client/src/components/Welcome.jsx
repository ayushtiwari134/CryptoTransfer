// imports
import { useContext } from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { SiEthereum } from 'react-icons/si'
import Loader from './Loader'
import { TransactionContext } from '../context/TransactionContext'


// the functional based component
const Welcome = () => {

    // importing and destructuring the context contents from the useContext hook.
    const { connectWallet, currentAccount, formData, handleChange, sendTransaction, isLoading, setFormData } = useContext(TransactionContext);

    // function which is fired everytime the user clicks the "Submit" button.
    const handleSubmit = (e) => {

        // destructuring data from the formData state
        const { addressTo, amount, message, gif } = formData;
        e.preventDefault();

        // checks if the file inputs are empty or not.
        if (!addressTo || !amount || !gif || !message) return;

        // this function carries out the transfer of crypto from the sender to receiver address.
        sendTransaction();
    }

    return (
        <div className="main flex  w-full md:flex-row md:items-center  md:justify-between justify-evenly flex-col min-h-screen text-white lg:px-40 px-20 items-center">
            <div className="left  flex flex-col">
                <div className="left-top text-left">
                    <h1 className='lg:text-[5.5rem] md:text-5xl text-5xl text-gradient py-1'>Send Crypto <br /> Across the World</h1>
                    <p className=' mt-5 lg:text-2xl text-xl font-light md:w-9/12 w-11/12'>Explore the crypto world. Buy and sell currencies easily on Krypt.</p>
                    {!currentAccount ? <button type='button' className='md:w-7/12 w-full my-10 cursor-pointer hover:bg-blue-700 bg-blue-500 text-white px-7 py-3 rounded-full' onClick={connectWallet}>Connect Wallet</button> : <button type='button' className='md:w-7/12 w-full my-10 cursor-pointer  white-glassmorphism text-white px-7 py-3 rounded-full'>Account Connected</button>}
                </div>
            </div>
            <div className="flex  flex-col items-center justify-start  md:mt-0 mt-10">
                <div className='p-3 flex justify-between flex-col rounded-xl h-40 w-[320px] my-5 eth-card white-glassmorphism'>
                    <div className="top flex justify-between">
                        <div className="eth-icon"><SiEthereum fontSize={27} /></div>
                        <div className="infoicon"><BsInfoCircle fontSize={17} /></div>
                    </div>
                    <div className="bottom">
                        {currentAccount ? <p className=' font-light'>Connected account : {currentAccount.slice(0, 4) + "...." + currentAccount.slice(currentAccount.length - 4)}</p> : <p></p>}
                        <p className='text-xl font-semibold'>Ehereum</p>
                    </div>
                </div>

                <div className="form p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                    {isLoading ? <Loader /> :
                        <>
                            <input
                                className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
                                placeholder={"Enter address"}
                                type="text"
                                onChange={(e) => { handleChange(e, 'addressTo') }}
                                value={formData.addressTo} />
                            <input
                                className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
                                placeholder={"Enter amount in ETH"}
                                type="number"
                                step="0.0001"
                                onChange={(e) => { handleChange(e, "amount") }}
                                value={formData.amount} />
                            <input
                                className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
                                placeholder={"Enter keyword"}
                                type="text"
                                step="0.0001"
                                onChange={(e) => { handleChange(e, "gif") }}
                                value={formData.gif} />
                            <input
                                className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
                                placeholder={"Enter message"}
                                type="text"
                                step="0.0001"
                                onChange={(e) => { handleChange(e, 'message') }}
                                value={formData.message} />
                            <button className='my-2 w-full cursor-pointer hover:bg-blue-700 bg-blue-500 text-white p-2 rounded-full' type='button ' onClick={handleSubmit}>Transfer</button>
                        </>}
                </div>
            </div>
        </div>
    )
}

export default Welcome