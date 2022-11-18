// @ts-nocheck
import {
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  Input,
  TextField,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import Router from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Dao from "./dao";
import NounsHeader from "../components/nounsDAO/nounsHeader";
import TreasuryDisplay from "../components/treasuryDisplay";
import Footer from "../components/footer";
import MintPreview from "../components/mintPreview";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../src/web3ReactInjector";
import GoodsAbi from "../src/Goods.json";
import { ReducerContextProvider, useReducerContext } from "../api/context";
const curated = [
  {
    contract: "0x09aD6Fb74584fFbA72C65419c03741325CAE00a1",
    factory: "0xd6F69419B3D289b8f26013Fb43B6A7d22aAba962",
  },
  {
    contract: "0x4DC9c815F265f491942ED1379758b8a87b2A34D5",
    factory: "0x4E02C328CA3Ff8A69be6c5ED23fE504AD61EdEb9",
  },
  { contract: "0xdE7e28AfbD62219E97c3BfC5C792576a2ff7c497" },
  { contract: "0x54e305897419eE6941d8941c60724175B2ebAA0c" },
];

const Home: NextPage = () => {
  const { active, activate, account, library } = useWeb3React();
  const [contracts, setContracts] = useState([]);

  const { ethereum } = typeof window !== "undefined" && window;
  const provider =
    typeof window !== "undefined" &&
    haveMetamask &&
    new ethers.providers.Web3Provider(window.ethereum);
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");

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
      setAccountAddress(accounts[0]);
      dispatch({ type: "setWalletAddress", payload: accounts[0] });
      changeNetWork();
    } catch (error) {
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

  useEffect(() => {
    async function getContracts() {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-goerli.g.alchemy.com/v2/yZIdvCyYdidI1nxEKQeR4mCPmkqP2gS5"
      );
      const hexToDecimal = (hex) => parseInt(hex, 16);
      try {
        let detailedContracts = [];
        for (let i = 0; i < curated.length; i++) {
          const temp = new Contract(curated[i].contract, GoodsAbi, provider);
          let tempName = await temp.name();
          let tempSymbol = await temp.symbol();
          let tempPrice = await temp.goodsPrice();
          let tempSupply = await temp.MAX_GOODS();
          let tempMinted = await temp.totalSupply();
          //let tempPreview = await temp.previewImage()
          let base = await temp.baseURI();
          let tempHash = base.slice(-60, -1);

          console.log(typeof tempPrice);
          console.log(tempPrice);

          let r = {
            address: curated[i].contract,
            name: tempName,
            symbol: tempSymbol,
            price: hexToDecimal(tempPrice._hex),
            supply: hexToDecimal(tempSupply._hex),
            minted: hexToDecimal(tempMinted._hex),
            hash: tempHash,
          };

          detailedContracts.push(r);
        }
        setContracts(detailedContracts);
      } catch (error: any) {
        alert("Failed " + JSON.stringify(error));
        console.log("Failed  ", error);
      }
    }
    getContracts();
  }, []);

  async function mint(cont) {
    if (!library) {
      activate(injected);
      return;
    }

    const signer = library.getSigner(account).connectUnchecked();
    const contract = new Contract(cont.address, GoodsAbi, signer);

    try {
      const mintInitResult = await contract.mintGoods(1, {
        value: cont.price.toString(),
      });

      console.log(mintInitResult);

      //alert("Successfully initiated mint!");

      const receipt = await mintInitResult.wait();

      console.log(receipt);

      const mintedTokenId = parseInt(receipt.logs[0].topics[3], 16);

      console.log((await contract.baseURI()) + mintedTokenId);
    } catch (error: any) {
      alert("Failed to mint: " + JSON.stringify(error));
      console.log("Failed to mint: ", error);
    }
  }

  return (
    <div>
      <NounsHeader />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          className="left-container"
          style={{
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            fontFamily: "Poppins",
            color: "#00008B",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <img
              src={"./nounslogo.png"}
              alt="nouns-logo"
              width="50px"
              style={{ paddingRight: "5px" }}
            />
            <h2>TEAM NOUNS DAO MEMBERSHIP</h2>
          </span>
          <span>
            <p style={{ fontSize: "1.2em" }}>
              <strong>750 Seats, 1 ETH</strong> Participation
            </p>
            <p style={{ fontSize: "0.7em" }}>
              Wyoming DAO LLC Formation Snapshot Voting Structures Gnosis Safe
              Treasury
            </p>
          </span>
          <span>
            <p style={{ fontSize: "1.2em" }}>
              Capital to fund development of core technologies:
            </p>
            <p style={{ fontSize: "0.7em" }}>
              Messaging on Blockchains, Postcards, Generative Nouns NFTs,
              Stamps, Scenes Art and Community Spaces
            </p>
          </span>
          <h2>
            Current Available:
            <x
              style={{
                padding: "0px 10px 0px 10px",
                backgroundColor: "#00008B",
                color: "white",
                borderRadius: "0.5rem",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              750
            </x>
          </h2>
        </div>
        <div
          className="right-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {contracts && contracts[3] && (
            <x
              style={{
                padding: "0px 10px 0px 10px",
                color: "white",
                borderRadius: "0.5rem",
                fontWeight: "bold",
                marginLeft: "15px",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  width: "25vw",
                  marginInline: 100,
                  padding: 20,
                }}
              >
                <MintPreview hash={contracts[3].hash}></MintPreview>
              </div>
            </x>
          )}
          <a href="" style={{}}>
            <img src="./joinEth.png" width="150px" />
          </a>
        </div>
      </div>
      <TreasuryDisplay
        safeAddress={"0x432b351Db56d95F0ed37c7De3E20249200f8d3C9"}
      ></TreasuryDisplay>
      <Footer />
    </div>
  );
};

export default Home;
