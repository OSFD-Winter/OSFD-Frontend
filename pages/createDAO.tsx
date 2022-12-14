// @ts-nocheck
import { Box } from "@mui/system";
import { Button, IconButton, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Description } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
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

import MintPreview from "../components/mintPreview";
import { Web3Storage } from "web3.storage";
import axios from "axios";
import Feedback from "../components/feedback";
import Footer from "../components/footer";
import MintLogs from "../components/mintLogs";

import { ETH_GOERLI_ALCHEMY, DAO_FACTORY_ADDRESS } from "../utils/constants";
import Dao from "./dao";

// const DAO_FACTORY_ADDRESS = process.env.DAO_FACTORY_ADDRESS;
const TOKEN_CLIENT = process.env.TOKEN_CLIENT;

function CreateDAO({ addr }) {
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
        toast.error("Failed " + JSON.stringify(error));
        console.log("Failed  ", error);
      }
    }

    if (active) {
      getContracts();
    } else {
      activate(injected).then(() => getContracts());
    }
  }, [library, daoAddress, addr]);

  useEffect(() => {
    if (step === 7 && DAOContract) {
      async function getContracts() {
        const provider = new ethers.providers.JsonRpcProvider(ETH_GOERLI_ALCHEMY);

        const Factory = new Contract(DAOContract.address, GoodsFactoryAbi, provider);

        const hexToDecimal = (hex) => parseInt(hex, 16);
        try {
          let resContracts = await Factory.getGoodsArray();

          let detailedContracts = [];
          for (let i = 0; i < resContracts.length; i++) {
            const temp = new Contract(resContracts[i], GoodsAbi, provider);
            let tempName = await temp.name();
            let tempSymbol = await temp.symbol();
            let tempPrice = await temp.goodsPrice();
            let tempSupply = await temp.MAX_GOODS();
            let tempMinted = await temp.totalSupply();
            let balance = await provider.getBalance(resContracts[i]);

            //let tempPreview = await temp.previewImage()
            let base = await temp.baseURI();
            let tempHash = base.slice(-60, -1);

            console.log(typeof tempPrice);
            console.log(tempPrice);
            //console.log(tempPreview)
            //console.log(base)

            let r = {
              address: resContracts[i],
              name: tempName,
              symbol: tempSymbol,
              price: hexToDecimal(tempPrice._hex),
              supply: hexToDecimal(tempSupply._hex),
              minted: hexToDecimal(tempMinted._hex),
              hash: tempHash,
              balance: hexToDecimal(balance._hex),
              //preview: tempPreview
            };

            detailedContracts.push(r);
          }

          console.log(detailedContracts);
          setContracts(detailedContracts);
        } catch (error: any) {
          toast.error("Failed " + JSON.stringify(error));
          console.log("Failed  ", error);
        }
      }

      if (active) {
        getContracts();
      } else {
        activate(injected).then(() => getContracts());
      }
    }
  }, [library, step, DAOContract]);

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
    if (!library) return toast.error("Wallet connection failed, please try again");

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
      toast.error("Failed to deploy: " + JSON.stringify(error));
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

      <Dao step={step} daoAddress={daoAddress} />
    </Box>
  );
}

export default CreateDAO;
