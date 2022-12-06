import { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import { useReducerContext } from "../api/context";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { injected } from "../src/web3ReactInjector";

declare global {
  interface Window {
    ethereum: any;
  }
}

const generalStyle = {
  position: "absolute",
  top: 10,
  right: 10,
  bgcolor: "#306ac7",
  borderRadius: "5px",
  color: "white !IMPORTANT",
  padding: "8px 24px",
  zIndex: 11,
} as const;

const MetaMaskButton = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useReducerContext();
  const ethereum = typeof window !== "undefined" && window ? window.ethereum : {};

  // See if Metamask is installed on browser
  useEffect(() => {
    if (window !== undefined) {
      if (!ethereum) {
        sethaveMetamask(false);
        setLoading(false);
        return;
      }
    }
    // Check if wallet is connected already, if so hide button and initialize states
    injected.isAuthorized().then((authorized) => {
      if (authorized) {
        initializeWalletAndBalance();
      } else {
        setLoading(false);
      }
    });
  }, []);
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
        return;
      }
      initializeWalletAndBalance();
    } catch (error) {
      console.log(error);
      setIsConnected(false);
    }
  };
  async function initializeWalletAndBalance() {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    dispatch({ type: "setWalletAddress", payload: accounts[0] });
    changeNetWork();
    const balance = await new ethers.providers.Web3Provider(window.ethereum).getBalance(
      accounts[0]
    );
    const bal = +balance / +1000000000000000000;
    dispatch({ type: "setWalletBalance", payload: bal.toString() });
    setLoading(false);
  }
  const changeNetWork = async () => {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }], // Goerli Testnet
      });
      setIsConnected(true);
    } catch (err: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (err.code === 4902) {
        addEthereumChain();
      }
      // handle other "switch" errors
      setIsConnected(false);
    }
  };

  async function addEthereumChain() {
    try {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x5",
            chainName: "Goerli Testnet",
            rpcUrls: ["https://goerli.prylabs.net"],
          },
        ],
      });
      setIsConnected(true);
    } catch (addError) {
      // handle "add" error
      setIsConnected(false);
    }
  }
  // Display button if metamask is installed or needs to be installed
  return (haveMetamask && !isConnected) || (!haveMetamask && !isConnected)
    ? !loading && (
        <Button
          onClick={() => {
            connectWallet();
          }}
          disabled={!haveMetamask}
          variant="contained"
          sx={[
            ...[generalStyle],
            {
              display: isConnected ? "none" : "flex",
              maxHeight: "60px",
              maxWidth: "300px",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          {haveMetamask ? (
            <div>
              {isConnected ? (
                <></>
              ) : (
                <div className="flex items-center">
                  <div>Connect with Metamask</div>
                  <img
                    style={{
                      height: "50px",
                      marginLeft: "6px",
                    }}
                    src="MetaMask-logo.png"
                    alt=""
                  />
                </div>
              )}
            </div>
          ) : (
            <p>Please Install MataMask</p>
          )}
        </Button>
      )
    : !loading && (
        <Paper sx={generalStyle} elevation={3}>
          <span>Wallet Address: {state.walletAddress}</span>
          <br />
          <span>Balance: {state.walletBalance} ETH</span>
        </Paper>
      );
};

export default MetaMaskButton;
