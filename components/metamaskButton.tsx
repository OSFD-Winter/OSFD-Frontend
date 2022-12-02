import { useEffect, useState } from "react";
import { Button, ButtonUnstyled } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useReducerContext } from "../api/context";
import { ethers } from "ethers";

const MetaMaskButton = () => {
  //TODO: dont use ethers
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const { state, dispatch } = useReducerContext();

  const { ethereum } = typeof window !== "undefined" && window;
  const { active, activate, account, library } = useWeb3React();
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
      // handle other "switch" errors
      setIsConnected(false);
    }
    // handle other "switch" errors
    setIsConnected(false);
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      dispatch({ type: "setWalletAddress", payload: accounts[0] });
      changeNetWork();
      let balance = await new ethers.providers.Web3Provider(window.ethereum).getBalance(
        accounts[0]
      );
      let bal = ethers.utils.formatEther(balance);
      dispatch({ type: "setWalletBalance", payload: bal });
      //console.log(state);
    } catch (error) {
      //console.log(error);
      setIsConnected(false);
    }
  };

  // See if Metamask is installed on browser
  useEffect(() => {
    if (window !== undefined) {
      const { ethereum } = window;
      const checkMetamaskAvailability = async () => {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        sethaveMetamask(true);
      };
      checkMetamaskAvailability();
    }
  }, []);
  return (
    <Button
      onClick={() => connectWallet}
      sx={{
        // display: isConnected ? "None" : "flex",
        position: "absolute",
        top: 10,
        right: 10,
        maxHeight: "60px",
        maxWidth: "280px",
        height: "100%",
        width: "100%",
        backgroundColor: "#306ac7",
        borderRadius: "5px",
        justifyContent: "center",
        color: "white",
        padding: "8px 24px",
        alignItems: "center",
      }}
    >
      {/* haveMetaMask */}
      {true ? (
        <div>
          {/* isConnected */}
          {false ? (
            <></>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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
