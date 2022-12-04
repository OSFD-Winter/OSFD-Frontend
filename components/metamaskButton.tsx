import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useReducerContext } from "../api/context";
import { ethers } from "ethers";
import { toast } from "react-toastify";

declare global {
  interface Window {
    ethereum: any;
  }
}

const MetaMaskButton = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const { dispatch } = useReducerContext();
  const ethereum = typeof window !== "undefined" && window ? window.ethereum : {};

  // See if Metamask is installed on browser
  useEffect(() => {
    if (window !== undefined) {
      if (!ethereum) {
        sethaveMetamask(false);
      }
    }
  }, []);
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
        return;
      }
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
      toast("Wallet Connected");
    } catch (error) {
      console.log(error);
      setIsConnected(false);
    }
  };

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

  return (
    <Button
      onClick={() => {
        connectWallet();
      }}
      disabled={!haveMetamask}
      variant="contained"
      sx={{
        display: isConnected ? "none" : "flex",
        position: "absolute",
        top: 10,
        right: 10,
        maxHeight: "60px",
        maxWidth: "300px",
        height: "100%",
        width: "100%",
        bgcolor: "#306ac7",
        borderRadius: "5px",
        justifyContent: "center",
        color: "white !IMPORTANT",
        padding: "8px 24px",
        alignItems: "center",
      }}
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
  );
};

export default MetaMaskButton;
