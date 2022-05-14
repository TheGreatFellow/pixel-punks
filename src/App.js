import React, { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { BN, Program, Provider, web3 } from "@project-serum/anchor";
import idl from "./myepicproject.json";
import kp from "./keypair.json";
import "./App.css";

// SystemProgram is a reference to the Solana runtime!
// const { SystemProgram } = web3;

// Create a keypair for the account that will hold the Hex data.
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

// Get our program's id form the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl("devnet");

// Control's how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: "processed",
};

// Constants
const TEST_GIFS = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  // const [inputValue, setInputValue] = useState('')
  const [hexList, setHexList] = useState([]);
  // const [key, setKey] = useState(null)
  const [color, setColor] = useState("#000000");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    const get = async () => {
      try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        const account = await program.account.baseAccount.fetch(
          baseAccount.publicKey
        );

        console.log("Got the account", account);
        setHexList(account.hexList);
      } catch (error) {
        console.log("Error in getHexList: ", error);
      }
    };
    if (walletAddress) {
     get()
    }
  }, [walletAddress]);


  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect({
            onlyIfTrusted: true,
          });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

//   const createHexAccount = async () => {
//     try {
//       const provider = getProvider();
//       const program = new Program(idl, programID, provider);
//       console.log("ping");
//       await program.rpc.startStuffOff({
//         accounts: {
//           baseAccount: baseAccount.publicKey,
//           user: provider.wallet.publicKey,
//           systemProgram: SystemProgram.programId,
//         },
//         signers: [baseAccount],
//       });
//       console.log(
//         "Created a new BaseAccount w/ address:",
//         baseAccount.publicKey.toString()
//       );
//       await getHexList();
//     } catch (error) {
//       console.log("Error creating BaseAccount account:", error);
//     }
// };

    const getHexList = async () => {
        try {
          const provider = getProvider();
          const program = new Program(idl, programID, provider);
          const account = await program.account.baseAccount.fetch(
            baseAccount.publicKey
          );

          console.log("Got the account", account);
          setHexList(account.hexList);
        } catch (error) {
          console.log("Error in getHexList: ", error);
        }
      };

  const addHex = async () => {
    console.log(selected, color);
    try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
  
        await program.rpc.updateHex(new BN(selected), color, {
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
          },
        });
        console.log("Hex successfully added");
        await getHexList();
      } catch (error) {
        console.log("Error sending GIF:", error);
      }
  }

  const getItemForIndex = (index) => {
    if(hexList.length > 0){
      const item = hexList.find((element) => element.pixId.toNumber() === index)
      return item
    }
  }

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <div className="con">
        <input
          type="color"
          id="head"
          name="head"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        ></input>
        <div className="gif-grid">
          {
          TEST_GIFS.map((_, index) => {
            let item = getItemForIndex(index)
           let _color = index === selected ? color : item === undefined ? "#fff" : item.hexCode;
            return (
              <div className="gif-item" key={index}>
                <div
                  style={{ backgroundColor: `${_color}` }}
                  onClick={() => {
                    setSelected(index);
                  }}
                ></div>
              </div>
            );
          })
          }
        </div>
        <button
          className="cta-button connect-wallet-button"
          onClick={addHex}
        >
          Paint Pixel
        </button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
      </div>
    </div>
  );
}

export default App;

