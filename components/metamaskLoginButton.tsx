import React, { useEffect, useState } from "react";
import CSS from "csstype";
import { ethers } from "ethers";

declare global {
    interface Window {
        ethereum?: any;
    }
  }
const divStyle: CSS.Properties = {
};

const buttonStyle: CSS.Properties = {
};




function metamaskLoginButton() {
    const { ethereum }= window;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const [haveMetamask, sethaveMetamask] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [accountAddress, setAccountAddress] = useState("");

    const changeNetWork = async () => {
        try {
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: "0x5"}], // Goerli Testnet
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
         <div>
                {haveMetamask ? (
                    <div>
                        {isConnected ? (
                            <div>
                                {accountAddress.slice(0, 4)}
                                    ...
                                {accountAddress.slice(38, 42)}
                            </div>
                        ) : (
                            <div>
                                <button onClick={connectWallet}>
                                    <div>Connect with Metamask</div>
                                    <img src="MetaMask-logo.png"/>
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
