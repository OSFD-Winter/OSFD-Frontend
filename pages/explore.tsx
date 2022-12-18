// @ts-nocheck
import { FC, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { injected } from "../src/web3ReactInjector";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import FactoryAbi from "../src/GoodsFactory.json";
import GoodsAbi from "../src/Goods.json";
import Link from "next/link";
import { useRouter } from "next/router";

import DAOFactoryAbi from "../src/DAOFactory.json";
import GoodsFactoryAbi from "../src/GoodsFactory.json";
import Router from "next/router";
import axios from "axios";
import Feedback from "../components/feedback";
import Footer from "../components/footer";

import { ETH_GOERLI_ALCHEMY } from "../utils/constants";
import MintButton from "../components/mintButton";

const DAO_FACTORY_ADDRESS = process.env.DAO_FACTORY_ADDRESS;

function Explore() {
  const router = useRouter();
  const { factoryAddress } = router.query;

  const { active, activate, account, library } = useWeb3React();
  const [contracts, setContracts] = useState([
    {
      address: "0x09aD6Fb74584fFbA72C65419c03741325CAE00a1",
      hash: "bafkreiffv5b3tyd2l4j5rti4snixwvghbxsqlnyn6aoxgzrnxbv7pqejhu",
      symbol: "MST",
      name: "Join Team Nouns",
      price: 1000000000000000,
      supply: 100,
      desc: "Description",
      preview:
        "https://media.gettyimages.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=gi&k=20&c=_Yaofm8sZLZkKs1eMkv-zhk8K4k5u0g0fJuQrReWfdQ=",
    },
    {
      address: "0x09aD6Fb74584fFbA72C65419c03741325CAE00a1",
      hash: "bafkreiffv5b3tyd2l4j5rti4snixwvghbxsqlnyn6aoxgzrnxbv7pqejhu",
      symbol: "MST",
      name: "Join Team Nouns",
      price: 1000000000000000,
      supply: 100,
      desc: "Description",
      preview:
        "https://media.gettyimages.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=gi&k=20&c=_Yaofm8sZLZkKs1eMkv-zhk8K4k5u0g0fJuQrReWfdQ=",
    },
    {
      address: "0x09aD6Fb74584fFbA72C65419c03741325CAE00a1",
      hash: "bafkreiffv5b3tyd2l4j5rti4snixwvghbxsqlnyn6aoxgzrnxbv7pqejhu",
      symbol: "MST",
      name: "Join Team Nouns",
      price: 1000000000000000,
      supply: 100,
      desc: "Description",
      preview:
        "https://media.gettyimages.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=gi&k=20&c=_Yaofm8sZLZkKs1eMkv-zhk8K4k5u0g0fJuQrReWfdQ=",
    },
  ]);
  const [DAOs, setDAOs] = useState([]);
  const [link, setLink] = useState();

  useEffect(() => {
    if (active) {
      getContracts();
      getContractDetails();
    }
  }, [library, factoryAddress]);

  async function getContracts() {
    if (!library) return console.log("Wallet connection failed, please try again");
    if (!factoryAddress) return console.log("w");
    const signer = library.getSigner(account).connectUnchecked();

    const Factory = new Contract(factoryAddress, FactoryAbi, signer);

    const hexToDecimal = (hex) => parseInt(hex, 16);
    try {
      let resContracts = await Factory.getGoodsArray();

      let detailedContracts = [];
      for (let i = 0; i < resContracts.length; i++) {
        const temp = new Contract(resContracts[i], GoodsAbi, signer);
        let tempName = await temp.name();
        let tempSymbol = await temp.symbol();
        let tempPrice = await temp.goodsPrice();
        let tempSupply = await temp.MAX_GOODS();
        let tempPreview = await temp.previewImage();

        console.log(typeof tempPrice);
        console.log(tempPrice);
        console.log(tempPreview);

        let r = {
          address: resContracts[i],
          name: tempName,
          symbol: tempSymbol,
          price: hexToDecimal(tempPrice._hex),
          supply: hexToDecimal(tempSupply._hex),
          preview: tempPreview,
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

  async function getContractDetails() {
    const provider = new ethers.providers.JsonRpcProvider(ETH_GOERLI_ALCHEMY);
    const Factory = new Contract(DAO_FACTORY_ADDRESS, DAOFactoryAbi, provider);

    const hexToDecimal = (hex) => parseInt(hex, 16);
    try {
      let resContracts = await Factory.getFactoryArray();
      console.log(resContracts);

      let detailedContracts = [];

      for (let i = 0; i < resContracts.length; i++) {
        const temp = new Contract(resContracts[i], GoodsFactoryAbi, provider);
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

        let r = {
          address: resContracts[i],
          owner: tempOwner,
          name: tempName,
          about: tempAbout,
          metadata: metadata,
        };

        console.log(r);

        detailedContracts.push(r);
      }

      console.log(detailedContracts);
      setDAOs(detailedContracts);
    } catch (error: any) {
      toast.error("Failed " + JSON.stringify(error));
      console.log("Failed  ", error);
    }
  }
  function toggleMetaMaskSignin() {
    activate(injected).then(() => {
      getContracts();
      getContractDetails();
    });
  }

  return (
    <div className="flex justify-center flex-col ">
      <Box className=" top-5 left-5 ">
        <Link href={`/`}>
          <a>
            <img src={"./OSFD.svg"} width="80"></img>
          </a>
        </Link>
      </Box>
      <div className="flex">
        {contracts &&
          contracts.map((cont) => (
            <Box
              key={cont.address}
              className="rounded-lg shadow-lg max-w-sm flex flex-col mx-auto mb-10"
            >
              <h1 className="text-2xl font-semibold mt-0 mb-6 text-center">
                {cont.name} {"(" + cont.symbol + ")"}
              </h1>

              <div className=" items-center align-center text-center font-[Poppins]">
                <img src={cont.preview} className=" w-15"></img>
                <p className="text-gray-700 font-thin mb-4">{cont.desc}</p>
                <p className=" text-gray-300 font-normal mb-4">Supply: {cont.supply}</p>
                <MintButton
                  address={`0x09aD6Fb74584fFbA72C65419c03741325CAE00a1`}
                  price={`1000000000000000`}
                />
                {/* <Button
                  variant="contained"
                  style={{
                    textAlign: "center",
                    marginInline: 6,
                  }}
                  onClick={async () => {
                    if (!library) return toast.error("Wallet connection failed, please try again");

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

                      //alert(`Successfully minted token ${mintedTokenId}!`);

                      setLink(
                        `https://testnets.opensea.io/assets/rinkeby/${receipt.logs[0].address}/${mintedTokenId}`
                      );
                    } catch (error: any) {
                      toast.error("Failed to mint: " + JSON.stringify(error));
                      console.log("Failed to mint: ", error);
                    }
                  }}
                >
                  mint {cont.price / 1000000000000000000} eth
                </Button> */}
              </div>
            </Box>
          ))}
      </div>

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
        }}
      >
        {DAOs &&
          DAOs.map((dao) => (
            <Box
              key={dao.address}
              style={{
                border: "2px black solid",
                margin: 50,
                width: "25vw",
              }}
            >
              <Box
                style={{
                  textAlign: "center",
                  fontSize: "1.5em",
                  margin: 10,
                }}
              >
                {dao.name}
              </Box>

              <Box
                style={{
                  textAlign: "center",
                  fontSize: "1em",
                  margin: 10,
                }}
              >
                {dao.about}
              </Box>
              <Button fullWidth onClick={() => Router.push(`/dao?daoAddress=${dao.address}`)}>
                visit
              </Button>
            </Box>
          ))}
      </Box>
      <br></br>
      {link && (
        <Button
          onClick={() => {
            window.open(link, "_blank", "noopener,noreferrer");
          }}
        >
          view at opensea
        </Button>
      )}
      <Feedback></Feedback>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Explore;
