// @ts-nocheck
import { Box } from "@mui/system";
import { Button, IconButton, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { injected } from "../src/web3ReactInjector";

import DAOFactoryAbi from "../src/DAOFactory.json";
import GoodsFactoryAbi from "../src/GoodsFactory.json";
import GoodsAbi from "../src/Goods.json";

import Router from "next/router";
import { useRouter } from "next/router";
import Link from "next/link";

import MintPreview from "./mintPreview";
import { Web3Storage } from "web3.storage";
import axios from "axios";
import MintLogs from "./mintLogs";

import { ETH_GOERLI_ALCHEMY } from "../utils/constants";
import Dao from "../pages/dao";

const DAO_FACTORY_ADDRESS = process.env.DAO_FACTORY_ADDRESS;
const TOKEN_CLIENT = process.env.TOKEN_CLIENT;

function CreateDAO() {
  const { addr } = Dao;

  const router = useRouter();
  const client = new Web3Storage({ TOKEN_CLIENT });

  const { daoAddress } = router.query;

  const { active, activate, account, library } = useWeb3React();
  const [deployRequest, setDeployRequest] = useState(false);

  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const [roadmap, setRoadmap] = useState("");
  const [banner, setBanner] = useState("");
  const [website, setWebsite] = useState("");

  const [DAOContract, setDAOContract] = useState();
  const [contracts, setContracts] = useState([]);
  const [link, setLink] = useState();

  useEffect(() => {
    async function getContracts() {
      const provider = new ethers.providers.JsonRpcProvider(ETH_GOERLI_ALCHEMY);

      const hexToDecimal = (hex) => parseInt(hex, 16);

      let address = addr ? addr : daoAddress;
      console.log(address);
      try {
        if (address) {
          const temp = new Contract(address, GoodsFactoryAbi, provider);
          let tempOwner = await temp.owner();
          let tempName = await temp.daoName();
          let tempAbout = await temp.daoAbout();
          let tempMetadataUri = await temp.daoMetadata();

          let metadata;
          axios
            .get(tempMetadataUri)
            .then(({ data }) => {
              console.log(data);
              metadata = data;
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                console.log("error.response");
              }
            });

          console.log(tempOwner);
          console.log(tempName);

          let r = {
            address: address,
            owner: tempOwner,
            name: tempName,
            about: tempAbout,
            metadata: metadata,
          };
          setDAOContract(r);
          setStep(7);
        }
      } catch (error: any) {
        alert("Failed " + JSON.stringify(error));
        console.log("Failed  ", error);
      }
    }

    if (active) {
      getContracts();
    } else {
      activate(injected).then(() => getContracts());
    }
  }, [library, daoAddress, addr]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleRoadmapChange = (event) => {
    setRoadmap(event.target.value);
  };

  const handleBannerChange = (event) => {
    setBanner(event.target.value);
  };

  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  const handleNext = () => {
    setStep((step) => step + 1);
  };

  const handlePrev = () => {
    setStep((step) => step - 1);
  };

  const deploy = useCallback(async () => {
    if (!library) return alert("Wallet connection failed, please try again");

    const signer = library.getSigner(account).connectUnchecked();

    const DAOFactory = new Contract(DAO_FACTORY_ADDRESS, DAOFactoryAbi, signer);

    // prepare metadata ipfs
    const daoMetadata = {
      roadmap: roadmap,
      banner: banner,
      website: website,
    };

    const blobMetadata = new Blob([JSON.stringify(daoMetadata)], { type: "application/json" });

    const files = [new File([blobMetadata], "metadata.json")];

    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    let metadatauri = `https://${cid}.ipfs.w3s.link/`;
    console.log(metadatauri);
    try {
      console.log(name + about + metadatauri);
      let res = await DAOFactory.CreateNewDAO(name, about, metadatauri);
      const receipt = await res.wait();
      console.log(receipt);
      setStep(7);
    } catch (error: any) {
      alert("Failed to deploy: " + JSON.stringify(error));
      console.log("Failed to deploy: ", error);
    }
  }, [library, account, name, about, roadmap, banner, website]);

  useEffect(() => {
    if (library && deployRequest) {
      setDeployRequest(false);
      deploy();
    }
  }, [library, deployRequest, deploy]);

  const handleClickDeploy = () => {
    if (active) {
      setDeployRequest(true);
    } else {
      activate(injected).then(() => setDeployRequest(true));
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

      {step == 0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box style={{ textAlign: "center", fontSize: "1.4em" }}>
            <div style={{ margin: 50 }}>Choose from Templates</div>
            <IconButton onClick={handleNext}>
              <Image src="/dao.png" alt="dao" width="100" height="100" />
            </IconButton>
            <br></br>
            Quick Template
          </Box>
        </Box>
      )}

      {step == 1 && (
        <Box style={{ height: "100%" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90%",
            }}
          >
            <Button onClick={handlePrev}>prev</Button>
            <Box>
              <div style={{ textAlign: "center", margin: 50, fontSize: "1.3em" }}>
                Name of the DAO
              </div>
              <TextField
                id="outlined-name"
                label="Nouns Cola Offering"
                value={name}
                onChange={handleNameChange}
                style={{ marginInline: 40 }}
              />
              <div style={{ textAlign: "center", margin: 50 }}>
                <Button onClick={handleNext}>next</Button>
              </div>
            </Box>
          </Box>
        </Box>
      )}

      {step == 2 && (
        <Box style={{ height: "100%" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90%",
            }}
          >
            <Button onClick={handlePrev}>prev</Button>
            <Box style={{ width: "50%" }}>
              <div style={{ textAlign: "center", margin: 50, fontSize: "1.3em" }}>
                About the DAO
              </div>
              <TextField
                id="outlined-name"
                label="Describe your DAO"
                value={about}
                onChange={handleAboutChange}
                style={{ marginInline: 40, width: "100%" }}
                multiline
                rows={3}
              />
              <div style={{ textAlign: "center", margin: 50 }}>
                <Button onClick={handleNext}>next</Button>
              </div>
            </Box>
          </Box>
        </Box>
      )}

      {step == 3 && (
        <Box style={{ height: "100%" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90%",
            }}
          >
            <Button onClick={handlePrev}>prev</Button>
            <Box style={{ width: "50%" }}>
              <div style={{ textAlign: "center", margin: 50, fontSize: "1.3em" }}>
                Link for Roadmap
              </div>
              <TextField
                id="outlined-name"
                label="Enter the Link for Roadmap"
                value={roadmap}
                onChange={handleRoadmapChange}
                style={{ marginInline: 40, width: "100%" }}
              />
              <div style={{ textAlign: "center", margin: 50 }}>
                <Button onClick={handleNext}>next</Button>
              </div>
            </Box>
          </Box>
        </Box>
      )}
      {step == 4 && (
        <Box style={{ height: "100%" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90%",
            }}
          >
            <Button onClick={handlePrev}>prev</Button>
            <Box style={{ width: "50%" }}>
              <div style={{ textAlign: "center", margin: 50, fontSize: "1.3em" }}>
                Link for Banner Image
              </div>
              <TextField
                id="outlined-name"
                label="Enter the Link for Banner Image"
                value={banner}
                onChange={handleBannerChange}
                style={{ marginInline: 40, width: "100%" }}
              />
              <div style={{ textAlign: "center", margin: 50 }}>
                <Button onClick={handleNext}>next</Button>
              </div>
            </Box>
          </Box>
        </Box>
      )}
      {step == 5 && (
        <Box style={{ height: "100%" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90%",
            }}
          >
            <Button onClick={handlePrev}>prev</Button>
            <Box style={{ width: "50%" }}>
              <div style={{ textAlign: "center", margin: 50, fontSize: "1.3em" }}>
                Link for Website
              </div>
              <TextField
                id="outlined-name"
                label="Enter dao website link"
                value={website}
                onChange={handleWebsiteChange}
                style={{ marginInline: 40, width: "100%" }}
              />
              <div style={{ textAlign: "center", margin: 50 }}>
                <Button onClick={handleNext}>preview</Button>
              </div>
            </Box>
          </Box>
        </Box>
      )}
      {step == 6 && (
        <div style={{ textAlign: "center" }}>
          <div>
            <Button onClick={handlePrev}>prev</Button>
            <img src={banner} style={{ height: "20vh" }}></img>

            <h1>{name}</h1>
            <br></br>

            {about}

            <br></br>
            {website}
            <br></br>

            <h3>ROADMAP</h3>
            <iframe src={roadmap} width="100%" style={{ height: "40vh" }}></iframe>
          </div>

          <Button onClick={handleClickDeploy}>Deploy DAO Contract</Button>
        </div>
      )}
    </Box>
  );
}

export default CreateDAO;
