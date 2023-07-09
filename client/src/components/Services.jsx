import React from 'react'

const Services = () => {
    return (
        <div className="mainWrapper gradient-bg-services text-white flex md:flex-row flex-col min-h-screen md:items-center md:justify-between  justify-start lg:px-40 px-20 gap-20">
            <div className="left">
                <div className="heading-text">
                    <h1 className='lg:text-[5.5rem]  text-5xl text-gradient py-1'>Services that we <br />provide.</h1>
                </div>
                <div className="subtext text-xl lg:text-2xl  my-5 font-light">
                    <p>The best choice for purchasing assets, is from us.</p>
                </div>
                <div className="link">
                    <p className='text-blue-400'>Let's get started.</p>
                </div>
            </div>
            <div className="right flex flex-col gap-5">
                <div className="card p-3 w-[350px] white-glassmorphism">
                    <p className='text-2xl'>Security and reliability of the Ethereum Blockchain</p>
                </div>
                <div className="card p-3 w-[350px] white-glassmorphism">
                    <p className='text-2xl'>Transfer cryptocurrencies to any address.</p>
                </div>
                <div className="card p-3 w-[350px] white-glassmorphism">
                    <p className='text-2xl'>Low gas fees.</p>
                </div>
            </div>
        </div>
    )
}

export default Services