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
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import Head from "next/head";
import NextImage from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { injected } from "../src/web3ReactInjector";
import { ToastContainer, toast } from "react-toastify";

//import abi from "../src/Factory.json";
//import abi from "../src/SurfFactory.json";
import FactoryAbi from "../src/GoodsFactory.json";
import GoodsAbi from "../src/Goods.json";

import { Web3Storage } from "web3.storage";
import axios from "axios";
import { CasinoOutlined } from "@mui/icons-material";

import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import Feedback from "../components/feedback";
import Footer from "../components/footer";

import { SERVER } from "../utils/constants";

const TOKEN_CLIENT = process.env.TOKEN_CLIENT;

const Home: NextPage = () => {
  const router = useRouter();
  const { factoryAddress } = router.query;

  const { active, activate, account, library } = useWeb3React();
  const [mintRequest, setMintRequest] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const client = new Web3Storage({ TOKEN_CLIENT });

  const [zips, setZips] = useState([]);
  const [chosenZip, setChosenZip] = useState();
  const [preview, setPreview] = useState();

  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [description, setDescription] = useState();
  const [supply, setSupply] = useState();
  const [price, setPrice] = useState();

  const [safe, setSafe] = useState();

  const [tokenGated, setTokenGated] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const [uploading, setUploading] = useState(false);

  //0 zip choose upload,  1 preview & fill, 2 deploy
  const [step, setStep] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSupplyChange = (event) => {
    setSupply(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSafeChange = (event) => {
    setSafe(event.target.value);
  };

  const handleTokenGatedChange = (event) => {
    setTokenGated(!tokenGated);
  };

  const handleAccessTokenChange = (event) => {
    setAccessToken(event.target.value);
  };

  useEffect(() => {
    console.log(factoryAddress);
  }, []);

  useEffect(() => {
    axios.get(`${SERVER}/tokens/zips`).then(({ data }) => setZips(data));
  }, []);

  useEffect(() => {
    if (chosenZip) {
      console.log("chosenZip");
      console.log(chosenZip);

      setPreview({ name: "generating ...", image: "./spinner.svg" });

      axios
        .get(`${SERVER}/tokens/tokenPreview/${chosenZip.hash}`)
        .then(({ data, status }) => {
          setPreview(data);
          console.log(status);
        })
        .catch((error) => {
          if (error.response) {
            setPreview({ image: "/wrong-zip.jpg", name: "wrong format", faulty: true });
            console.log(error.response);
            console.log("error.response");
          }
        });
    }
  }, [chosenZip, setPreview]);

  function ethToGwei(eth) {
    let gwei = eth * 1000000;
    gwei += "000000000000";
    return gwei;
  }

  async function upload() {
    if (uploading) {
      return;
    }

    setUploading(true);

    const fileInput = document.querySelector('input[type="file"]');
    console.log(fileInput);
    console.log(fileInput.files);

    // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put(fileInput.files); // Promise<CIDString>
    // Get info on the Filecoin deals that the CID is stored in
    const info = await client.status(rootCid); // Promise<Status | undefined>

    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid); // Promise<Web3Response | null>
    const files = await res.files(); // Promise<Web3File[]>
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`);
      axios.post(`${SERVER}/tokens/zip`, { hash: file.cid, name: file.name }).then(() => {
        //console.log(data)

        let zip = {
          hash: file.cid,
          name: file.name,
        };
        setZips(zips.concat([zip]));
        setChosenZip(zip);
        setUploading(false);
      });
    }
  }

  const mint = useCallback(async () => {
    if (!library) return toast.error("Wallet connection failed, please try again");

    const signer = library.getSigner(account).connectUnchecked();

    const Factory = new Contract(factoryAddress, FactoryAbi, signer);
    try {
      let res = await Factory.CreateNewGoods(
        name,
        symbol,
        `${SERVER}/tokens/token/${chosenZip.hash}&`,
        description,
        supply,
        ethToGwei(price),
        safe,
        tokenGated ? accessToken : "0x0000000000000000000000000000000000000000"
      );
      console.log("minted !");
      console.log(res);

      Router.push(`/dao`);
    } catch (error: any) {
      toast.error("Failed to deploy: " + JSON.stringify(error));
      console.log("Failed to deploy: ", error);
    }
  }, [
    library,
    account,
    chosenZip,
    description,
    name,
    symbol,
    supply,
    safe,
    price,
    tokenGated,
    accessToken,
  ]);

  useEffect(() => {
    if (library && mintRequest) {
      setMintRequest(false);
      mint();
    }
  }, [library, mintRequest, mint]);

  const handleClickMint = () => {
    if (active) {
      setMintRequest(true);
    } else {
      activate(injected).then(() => setMintRequest(true));
    }
  };

  return (
    <Box sx={{ height: "100%", p: 2 }}>
      <Box style={{ position: "absolute", top: 5, left: 5 }}>
        <Link href={`/`}>
          <a>
            <img src={"./OSFD.svg"} width="80"></img>
          </a>
        </Link>
      </Box>
      <Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginBlock: 15,
            paddingBlock: 15,
            border: "3px solid black",
          }}
        >
          <Input type="file" />
          <Button onClick={upload} style={{ height: 35 }}>
            {uploading ? <img src={"./spinner.svg"} height="100%"></img> : "upload"}{" "}
          </Button>
        </Box>

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginBlock: 2,
            paddingBlock: 2,
            border: "3px solid black",
            overflowX: "auto",
          }}
        >
          {zips &&
            zips.map((zip) => (
              <Button
                key={zip.hash}
                style={{
                  textAlign: "center",
                  marginInline: 6,
                  border: chosenZip == zip ? "2px black solid" : "none",
                }}
                variant="contained"
                onClick={() => {
                  setChosenZip(zip);
                  if (step == 0) {
                    setStep(1);
                  }
                }}
              >
                {zip.name}
              </Button>
            ))}
        </Box>
        {step > 0 && preview && (
          <Box sx={{ textAlign: "center", border: "3px solid black" }}>
            <b>{preview.name}</b>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img key={preview.image} src={preview.image} style={{ height: "35vh" }}></img>
            </div>
            <Button
              onClick={() => {
                setPreview({ name: "generating ...", image: "./spinner.svg" });
                axios
                  .get(`${SERVER}/tokens/tokenPreview/${chosenZip.hash}`)
                  .then(({ data, status }) => {
                    setPreview(data);
                    console.log(status);
                  })
                  .catch((error) => {
                    if (error.response) {
                      setPreview({ image: "/wrong-zip.jpg", name: "wrong format", faulty: true });
                      console.log(error.response);
                      console.log("error.response");
                    }
                  });
              }}
              style={{
                width: "fit-content",
                height: "fit-content",
              }}
            >
              Generate <CasinoOutlined />
            </Button>
          </Box>
        )}
        {preview && preview.faulty && (
          <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ marginInline: 100 }}>
              <a
                href={
                  "https://bafybeic2irli7jr7zczaaweuwhbrft4g5tc4vhuvca2z2mt2tzq6u4udjm.ipfs.w3s.link"
                }
              >
                {" "}
                <b>
                  <u>example zip</u>
                </b>
              </a>
            </div>
            <div style={{ marginInline: 100 }}>
              <a href={"https://whimsical.com/publish-2aKLEyPDbw6yZiULcquYf2"}>
                <b>
                  <u>instructions</u>
                </b>
              </a>
            </div>
          </Box>
        )}
        {preview && !preview.faulty && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <TextField
                id="outlined-name"
                label="Name"
                value={name}
                onChange={handleNameChange}
                style={{ width: "100%", marginInline: 40 }}
              />
              <TextField
                id="outlined-name"
                label="Symbol"
                value={symbol}
                onChange={handleSymbolChange}
                style={{ width: "100%", marginInline: 40 }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <TextField
                id="outlined-name"
                label="Supply"
                value={supply}
                onChange={handleSupplyChange}
                style={{ width: "100%", marginInline: 40 }}
              />
              <TextField
                id="outlined-name"
                label="Price"
                value={price}
                onChange={handlePriceChange}
                style={{ width: "100%", marginInline: 40 }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <TextField
                id="outlined-name"
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                style={{ width: "100%", marginInline: 40 }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, alignItems: "center" }}>
              <TextField
                id="outlined-name"
                label="Safe Address"
                value={safe}
                onChange={handleSafeChange}
                style={{ width: "100%", marginInline: 40 }}
              />
              <>
                <Box style={{ alignText: "center" }}>token gated</Box>
                <Switch
                  checked={tokenGated}
                  onChange={handleTokenGatedChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </>
              <TextField
                id="outlined-name"
                label="Access Token Address"
                disabled={!tokenGated}
                value={accessToken}
                onChange={handleAccessTokenChange}
                style={{ width: "100%", marginInline: 40 }}
              />
            </Box>
          </Box>
        )}

        {name && description && supply && price && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button disabled={isMinting} variant="contained" onClick={handleClickMint}>
              {isMinting ? <CircularProgress /> : "Deploy"}
            </Button>
          </Box>
        )}
      </Box>
      <Feedback></Feedback>

      <div>
        <Footer />
      </div>
    </Box>
  );
};

export default Home;
