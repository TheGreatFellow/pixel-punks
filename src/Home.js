import React, { useState } from 'react'
import './Home.css'
import Arrow from './assets/arrow.svg'
import Ape from './assets/pixel-ape.png'
import BWApe from './assets/pixel-ape-bw.png'
import ArrowRight from './assets/arrow-right.svg'
const Home = () => {
    const [ape, setApe] = useState(BWApe)
    return (
        <div className='page'>
            <head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossorigin
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap'
                    rel='stylesheet'
                />
            </head>
            <button className='connect-wallet'>Connect Wallet</button>
            <div className='hbar'>Pixel Punks</div>
            <div className='navbar'>
                <div className='navbar-item'> Home </div>
                <div className='navbar-item'> Services </div>
                <div className='navbar-item'> Community </div>
                <div className='navbar-item'> Contact Us </div>
            </div>
            <div className='section'>
                <div className='left-container'>
                    <div className='heading-container'>
                        <div className='stroke-heading'>Try it </div>
                        <div className='stroke-heading-off'>First!</div>
                    </div>
                    <div className='sub-heading'>
                        1. Pick a color
                        <br />
                        2. Select a pixel <br />
                        3. Approve transaction.
                    </div>
                    <div className='color-container'>
                        <img alt='Twitter Logo' className='arrow' src={Arrow} />
                        <input type='color' className='input-color' />
                        <p className='n'>1</p>
                    </div>
                </div>
                <div className='right-container'>
                    <div className='x-container'>
                        <div className='grid-container'></div>
                        <p className='n2'>2</p>
                    </div>

                    <div className='x-container'>
                        <button className='primary-button'>Pix it</button>
                        <p className='n3'>3</p>
                    </div>
                </div>
            </div>
            <div className='section-info'>
                <h1 className='info-heading'>
                    NFT holders of a commuinty collaborate together to make a
                    Pixie-NFT and get paid for it.
                </h1>
            </div>
            <div className='section'>
                <div className='left-container2'>
                    <div
                        className='grid-container'
                        onMouseOver={() => setApe(Ape)}
                        onMouseOut={() => setApe(BWApe)}
                    >
                        <img src={ape} className='ape' alt='ape' />
                    </div>
                </div>
                <div className='right-container2'>
                    <div className='container-heading'>
                        We plan to collaborate with NFT communities.
                    </div>
                    <div className='container-sub-heading'>
                        Collecting NFT is cool, But making your own NFT is
                        cool-er. Making it with your community? Even better
                    </div>
                    <div className='y-container'>
                        <button className='primary-button'>Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
