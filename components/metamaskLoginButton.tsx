import React, { useEffect, useState } from "react";
import CSS from "csstype";
import { ethers } from "ethers";

declare global {
    interface Window {
        ethereum?: any;
    }
  }
const divStyle: CSS.Properties = {
    // Temp styles to make component scrollable
    overflowX: "auto",
    height: "100px",
    width: "auto",
    fontSize: "14px",
};

const clickableStyle: CSS.Properties = {
    cursor: "pointer",
};


function metamaskLoginButton() {
    const { ethereum }= window;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const [haveMetamask, sethaveMetamask] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [accountAddress, setAccountAddress] = useState("");

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                sethaveMetamask(false);
            }
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccountAddress(accounts[0]);
            setIsConnected(true);
            changeNetWork();
        } catch (error) {
            setIsConnected(false);
        }
    };

    const changeNetWork = async () => {
        try {
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: "0x5"}], // Goerli Testner
            });
          } catch (err: any) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (err.code === 4902) {
              try {
                await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x5',
                      chainName: 'Goerli Testnet',
                      rpcUrls: ['https://goerli.prylabs.net'],
                    },
                  ],
                });
              } catch (addError) {
                // handle "add" error
              }
            }
            // handle other "switch" errors
          }    
    }

    // See if Metamask is installed on browser
    useEffect(() => {
        const { ethereum } = window;
        const checkMetamaskAvailability = async () => {
            if (!ethereum) {
                sethaveMetamask(false);
            }
            sethaveMetamask(true);
        };
        checkMetamaskAvailability();
    }, []);

    

    return (
         <div className="flex h-screen w-screen justify-center bg-[#ffedd5]">
                {haveMetamask ? (
                    <div className="flex w-full h-full items-center justify-center">
                        {isConnected ? (
                             <p>Connected!</p>
                        ) : (
                            <div className="flex flex-col items-center">
                                <button
                                    className="flex bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-5 rounded items-center"
                                    onClick={connectWallet}
                                >
                                    <div>Connect with Metamask</div>
                                    <img
                                        src="MetaMask-logo.png"
                                        className="object-scale-down h-12 w-12 ml-3"
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Please Install MataMask</p>
                )}
        </div>
    );
}

export default metamaskLoginButton;
