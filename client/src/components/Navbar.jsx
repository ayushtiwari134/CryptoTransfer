import { useState } from 'react'
import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { ethers } from 'ethers';
const Navbar = () => {
    const [open, setOpen] = useState(false)

    return (
        <nav className='text-xl text-white pt-4'>
            <div className="navbar md:flex items-center hidden justify-between px-[6.5rem]">
                <div className="logo">
                    Logo
                </div>
                <div className="links">
                    <ul className='flex gap-5 items-center'>
                        <li className="items">Market</li>
                        <li className="items">Exchange</li>
                        <li className="items">Tutorials</li>
                        <li className="items">Wallet</li>
                        <button className='cursor-pointer hover:bg-blue-700 bg-blue-500 text-white px-7 py-3 rounded-full'>Sign up</button>
                    </ul>
                </div>

            </div>
            <div onClick={() => { setOpen(!open) }} className="icons md:hidden absolute top-4 right-4 text-[28px] cursor-pointer z-50">
                {open ? <AiOutlineClose /> : <HiMenuAlt4 />}
            </div>
            {open ? <div className="blue-glassmorphism p-11 w-[70vw] mobile-menu md:hidden items-center text-white absolute top-0 right-0 flex flex-col justify-center gap-5 h-screen animate-slide-in z-40">
                <div className="logo">
                    Logo
                </div>
                <div className="links">
                    <ul className='flex items-center flex-col gap-10'>
                        <li className="items">Market</li>
                        <li className="items">Exchange</li>
                        <li className="items">Tutorials</li>
                        <li className="items">Wallet</li>
                        <button className='cursor-pointer hover:bg-blue-700 bg-blue-500 text-white px-7 py-3 rounded-full'>Sign up</button>
                    </ul>
                </div>
            </div> : <div></div>}
        </nav>
    )
}

export default Navbar