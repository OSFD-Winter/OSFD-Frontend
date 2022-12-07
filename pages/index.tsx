// @ts-nocheck
import { useEffect, useState, useCallback } from "react";
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
import Link from "next/link";
import Router from "next/router";
import Feedback from "../components/feedback";
import GoodsAbi from "../src/Goods.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import MintPreview from "../components/mintPreview";
import Sandbox from "./sandbox";
import Header from "../components/header";
import Footer from "../components/footer";
import Referral from "../components/referral";
import { ToastContainer, toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../src/web3ReactInjector";
import "react-toastify/dist/ReactToastify.css";
import { ReducerContextProvider, useReducerContext } from "../api/context";

import { ETH_GOERLI_ALCHEMY } from "../utils/constants";
import Navbar from "../components/navbar";

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
  const [contracts, setContracts] = useState([
    {
      address: "0x09aD6Fb74584fFbA72C65419c03741325CAE00a1",
      hash: "bafkreiffv5b3tyd2l4j5rti4snixwvghbxsqlnyn6aoxgzrnxbv7pqejhu",
      minted: 36,
      name: "Join Team Nouns",
      price: 1000000000000000,
      supply: 100,
      symbol: "JTN",
    },
    {
      address: "0x4DC9c815F265f491942ED1379758b8a87b2A34D5",
      hash: "bafybeih7wv5h37tef3olkg7lra24ccgcltmtczekbycjytvribcf55vzhm",
      minted: 27,
      name: "Mayan ST",
      price: 10000000000000000,
      supply: 1000,
      symbol: "MST",
    },
    {
      address: "0xdE7e28AfbD62219E97c3BfC5C792576a2ff7c497",
      name: "Vote Stamp",
      symbol: "TNV",
      price: 10000000000000,
      supply: 1000000,
      minted: 21,
      hash: "bafkreigpnzgdynfdnvlspgcoi6b5mtc5wf4af6tqtkir5az7wzi4yt3rgq",
    },
    {
      address: "0x54e305897419eE6941d8941c60724175B2ebAA0c",
      name: "Team Nouns DAO Certificates",
      symbol: "TNDC",
      price: 1000000000000000000,
      supply: 1000,
      minted: 2,
      hash: "bafybeidn5ubtxclqpr55l5gocwstop5moqccgoakhclqxx3uiegdu5fofi",
    },
  ]);

  const [haveMetamask, sethaveMetamask] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const { state, dispatch } = useReducerContext();

  useEffect(() => {
    async function getContracts() {
      const provider = new ethers.providers.JsonRpcProvider(ETH_GOERLI_ALCHEMY);
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
        toast("Failed " + JSON.stringify(error));
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
      if (receipt) {
        // Get updated balance after successful mint
        const balance = await new ethers.providers.Web3Provider(window.ethereum).getBalance(
          state.walletAddress
        );
        const bal = +balance / +1000000000000000000;
        dispatch({ type: "setWalletBalance", payload: bal.toString() });
      }

      console.log(receipt);

      const mintedTokenId = parseInt(receipt.logs[0].topics[3], 16);

      console.log((await contract.baseURI()) + mintedTokenId);
    } catch (error: any) {
      toast("Failed to mint: " + JSON.stringify(error));
      console.log("Failed to mint: ", error);
    }
  }

  return (
    <div
    id='top'
      sx={{
        height: "100%",
        backgroundImage: `url(bg.png)`,
      }}
    >
      <Navbar />
      <Header></Header>
      {contracts && contracts[0] && (
        <div
          style={{
            backgroundColor: "#dcdcdc",
            borderRadius: 30,
            marginInline: "5vw",
            display: "flex",
            marginTop: 100,
            marginBottom: 100,
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
            <MintPreview hash={contracts[0].hash}></MintPreview>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5em",
                  color: "#01052a",
                }}
              >
                <h1>Join Team Nouns</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#474747",
                }}
              >
                Lorem ipsum dolor sit amet, consetetur.
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Button
                  onClick={() => Router.push(`/dao?daoAddress=${curated[0].factory}`)}
                  style={{
                    backgroundColor: "#1b2f91",
                    color: "white",
                    paddingInline: 40,
                  }}
                >
                  VISIT PROJECT
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  color: "#556cd6",
                }}
              >
                supply: {contracts[0].supply - contracts[0].minted}/{contracts[0].supply}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    textAlign: "center",
                    paddingInline: 40,
                    backgroundColor: "#1b2f91",
                    color: "white",
                  }}
                  onClick={async () => {
                    console.log("T");
                    mint(contracts[0]);
                  }}
                >
                  mint {contracts[0].price / 1000000000000000000} eth
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {contracts && contracts[1] && (
        <div
          style={{
            backgroundColor: "#FC9CF9",
            borderRadius: 30,
            marginInline: "5vw",
            display: "flex",
            marginBottom: 100,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5em",
                  color: "#01052a",
                }}
              >
                <h1>Mayan ST (MST)</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#474747",
                }}
              >
                Lorem ipsum dolor sit amet, consetetur.
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 40,
                }}
              >
                <Button
                  onClick={() => Router.push(`/dao?daoAddress=${curated[1].factory}`)}
                  style={{
                    backgroundColor: "#1b2f91",
                    color: "white",
                    paddingInline: 40,
                  }}
                >
                  VISIT PROJECT
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  color: "#556cd6",
                }}
              >
                supply: {contracts[1].supply - contracts[1].minted}/{contracts[1].supply}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    textAlign: "center",
                    paddingInline: 40,
                    backgroundColor: "#1b2f91",
                    color: "white",
                  }}
                  onClick={async () => {
                    mint(contracts[1]);
                  }}
                >
                  mint {contracts[1].price / 1000000000000000000} eth
                </Button>
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              width: "25vw",
              marginInline: 100,
              padding: 20,
            }}
          >
            <MintPreview hash={contracts[1].hash}></MintPreview>
          </div>
        </div>
      )}

      {contracts && contracts[2] && (
        <div
          style={{
            backgroundColor: "#dbecc0",
            borderRadius: 30,
            marginInline: "5vw",
            display: "flex",
            marginBottom: 100,
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
            <MintPreview hash={contracts[2].hash}></MintPreview>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5em",
                  color: "#01052a",
                }}
              >
                <h1>Vote Stamp (TNV)</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#474747",
                }}
              >
                Lorem ipsum dolor sit amet, consetetur.
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Button
                  onClick={() => Router.push(`/dao?daoAddress=${curated[2].factory}`)}
                  style={{
                    backgroundColor: "#1b2f91",
                    color: "white",
                    paddingInline: 40,
                  }}
                >
                  VISIT PROJECT
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  color: "#556cd6",
                }}
              >
                supply: {contracts[2].supply - contracts[2].minted}/{contracts[2].supply}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    textAlign: "center",
                    paddingInline: 40,
                    backgroundColor: "#1b2f91",
                    color: "white",
                  }}
                  onClick={async () => {
                    mint(contracts[2]);
                  }}
                >
                  mint {contracts[2].price / 1000000000000000000} eth
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {contracts && contracts[3] && (
        <div
          style={{
            backgroundColor: "#fff6e8",
            borderRadius: 30,
            marginInline: "5vw",
            display: "flex",
            marginBottom: 100,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5em",
                  color: "#01052a",
                }}
              >
                <h1>Team Nouns DAO</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2em",
                  color: "#01052a",
                }}
              >
                <h1>Certificates (TNDC)</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#474747",
                }}
              >
                Lorem ipsum dolor sit amet, consetetur.
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 40,
                }}
              >
                <Button
                  onClick={() => Router.push(`/dao?daoAddress=${curated[3].factory}`)}
                  style={{
                    backgroundColor: "#1b2f91",
                    color: "white",
                    paddingInline: 40,
                  }}
                >
                  VISIT PROJECT
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  color: "#556cd6",
                }}
              >
                supply: {contracts[3].supply - contracts[3].minted}/{contracts[3].supply}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    textAlign: "center",
                    paddingInline: 40,
                    backgroundColor: "#1b2f91",
                    color: "white",
                  }}
                  onClick={async () => {
                    mint(contracts[3]);
                  }}
                >
                  mint {contracts[3].price / 1000000000000000000} eth
                </Button>
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              width: "50vw",
              marginInline: 100,
              padding: 20,
            }}
          >
            <MintPreview hash={contracts[3].hash}></MintPreview>
          </div>
        </div>
      )}

      {contracts && contracts[3] && (
        <div
          style={{
            backgroundColor: "#BFF5F1",
            borderRadius: 30,
            marginInline: "5vw",
            display: "flex",
            marginBottom: 100,
          }}
        >
          <div
            style={{
              textAlign: "center",
              width: "50vw",
              marginInline: 100,
              padding: 20,
            }}
          >
            <MintPreview hash={contracts[3].hash}></MintPreview>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5em",
                  color: "#01052a",
                }}
              >
                <h1>Wyoming Structured</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2em",
                  color: "#01052a",
                }}
              >
                <h1>DAO OFFERING</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#474747",
                }}
              >
                Lorem ipsum dolor sit amet, consetetur.
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Button
                  onClick={() => Router.push(`/dao?daoAddress=${curated[3].factory}`)}
                  style={{
                    backgroundColor: "#1b2f91",
                    color: "white",
                    paddingInline: 40,
                  }}
                >
                  VISIT PROJECT
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  color: "#556cd6",
                }}
              >
                supply: {contracts[3].supply - contracts[3].minted}/{contracts[3].supply}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    textAlign: "center",
                    paddingInline: 40,
                    backgroundColor: "#1b2f91",
                    color: "white",
                  }}
                  onClick={async () => {
                    mint(contracts[3]);
                  }}
                >
                  mint {contracts[3].price / 1000000000000000000} eth
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "36%",
        }}
      >
        <Paper
          elevation={3}
          style={{
            width: "24vh",
            marginInline: "10vh",
            textTransform: "none",
            textAlign: "center",
            padding: 10,
            backgroundColor: "#f8f8f8",
          }}
        >
          <div
            style={{
              margin: 20,
              fontSize: 30,
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              color: "#19217b",
            }}
          >
            Are You a Founder ?
          </div>
          <Button
            style={{
              textAlign: "center",
              backgroundColor: "#1b2f91",
              color: "white",
            }}
            onClick={() => Router.push("/dao")}
          >
            Create DAO Offering
          </Button>
        </Paper>

        <Paper
          elevation={3}
          style={{
            width: "24vh",
            marginInline: "10vh",
            textTransform: "none",
            textAlign: "center",
            padding: 10,
            backgroundColor: "#f8f8f8",
          }}
        >
          <div
            style={{
              margin: 20,
              fontSize: 30,
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              color: "#19217b",
            }}
          >
            Are You an Investor ?
          </div>
          <Button
            style={{
              textAlign: "center",
              backgroundColor: "#1b2f91",
              color: "white",
            }}
            onClick={() => Router.push("/explore")}
          >
            Discover DAO Offerings
          </Button>
        </Paper>
      </Box>
      <Sandbox></Sandbox>

      <div id='feedback' style={{ marginTop: 100 }}>
        <Feedback></Feedback>
      </div>

      <div>
        <Footer
          gradient={"bg-gradient-to-r from-blue-1000 to-blue-50 relative text-white w-full"}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;
