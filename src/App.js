import React, { useEffect, useState } from 'react'
import twitterLogo from './assets/twitter-logo.svg'
import './App.css'
// var data = require('./Solana_DAOs.json')

// Constants
const TWITTER_HANDLE = '_buildspace'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`
const TEST_GIFS = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#000',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
]

const App = () => {
    const [walletAddress, setWalletAddress] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [gifList, setGifList] = useState([])
    const [key, setKey] = useState(null)
    const [color, setColor] = useState('#000')
    const [selected, setSelected] = useState(null)
    const checkIfWalletIsConnected = async () => {
        try {
            const { solana } = window

            if (solana) {
                if (solana.isPhantom) {
                    console.log('Phantom wallet found!')
                    const response = await solana.connect({
                        onlyIfTrusted: true,
                    })
                    console.log(
                        'Connected with Public Key:',
                        response.publicKey.toString()
                    )
                    setWalletAddress(response.publicKey.toString())
                }
            } else {
                alert('Solana object not found! Get a Phantom Wallet 👻')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const connectWallet = async () => {
        const { solana } = window

        if (solana) {
            const response = await solana.connect()
            console.log(
                'Connected with Public Key:',
                response.publicKey.toString()
            )
            setWalletAddress(response.publicKey.toString())
        }
    }

    const sendGif = async () => {
        if (inputValue.length > 0) {
            console.log('Gif link:', inputValue)
            setGifList([...gifList, inputValue])
            setInputValue('')
        } else {
            console.log('Empty input. Try again.')
        }
    }

    const onInputChange = (event) => {
        const { value } = event.target
        setInputValue(value)
    }

    const renderNotConnectedContainer = () => (
        <button
            className='cta-button connect-wallet-button'
            onClick={connectWallet}
        >
            Connect to Wallet
        </button>
    )
    function updateColor(index, hex) {
        setKey(index)
        console.log(index, hex)
        setGifList(
            gifList.map((gif, i) => {
                if (index === i) {
                    return hex
                }
                return gif
            })
        )
    }
    const renderConnectedContainer = () => (
        <div className='connected-container'>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    sendGif()
                }}
            >
                <input
                    type='text'
                    placeholder='Enter gif link!'
                    value={inputValue}
                    onChange={onInputChange}
                />
                <button type='submit' className='cta-button submit-gif-button'>
                    Submit
                </button>
            </form>
            <div className='con'>
                <input
                    type='color'
                    id='head'
                    name='head'
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                ></input>

                <div className='gif-grid'>
                    {gifList.map((gif, index) => {
                        var colors
                        var hex

                        index === selected
                            ? (colors = color)
                            : gif === ''
                            ? (colors = '#fff')
                            : (colors = gif)
                        return (
                            <div className='gif-item' key={index}>
                                <div
                                    style={{ backgroundColor: `${colors}` }}
                                    onClick={() => {
                                        setSelected(index)
                                    }}
                                ></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

    useEffect(() => {
        const onLoad = async () => {
            await checkIfWalletIsConnected()
        }
        window.addEventListener('load', onLoad)
        return () => window.removeEventListener('load', onLoad)
    }, [])

    useEffect(() => {
        if (walletAddress) {
            console.log('Fetching GIF list...')

            // Call Solana program here.

            // Set state
            setGifList(TEST_GIFS)
        }
    }, [walletAddress])

    return (
        <div className='App'>
            <div className={walletAddress ? 'authed-container' : 'container'}>
                <div className='header-container'>
                    {/* <p className='header'>🖼 GIF Portal</p>
                    <p className='sub-text'>
                        View your GIF collection in the metaverse ✨
                    </p> */}
                    {!walletAddress && renderNotConnectedContainer()}
                    {walletAddress && renderConnectedContainer()}
                </div>
                <div className='footer-container'>
                    <img
                        alt='Twitter Logo'
                        className='twitter-logo'
                        src={twitterLogo}
                    />
                    <a
                        className='footer-text'
                        href={TWITTER_LINK}
                        target='_blank'
                        rel='noreferrer'
                    >{`built on @${TWITTER_HANDLE}`}</a>
                </div>
            </div>
        </div>
    )
}

export default App
