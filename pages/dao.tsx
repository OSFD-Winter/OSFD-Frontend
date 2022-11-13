// @ts-nocheck
import { Box } from "@mui/system";
import {
    Button,
    IconButton,
    TextField,
} from "@mui/material";
import Image from 'next/image'
import { useEffect, useState, useCallback } from "react";
import { Description } from "@mui/icons-material";

import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { injected } from "../src/web3ReactInjector";

import DAOFactoryAbi from "../src/DAOFactory.json";
import GoodsFactoryAbi from "../src/GoodsFactory.json";
import GoodsAbi from "../src/Goods.json";

import Router from 'next/router'
import { useRouter } from 'next/router'
import Link from 'next/link'

import MintPreview from "../components/mintPreview"
import { Web3Storage } from 'web3.storage'
import axios from 'axios';
import Feedback from "./feedback"
import Footer from "../components/footer"
import MintLogs from "../components/mintLogs";

const DAO_FACTORY_ADDRESS = process.env.DAO_FACTORY_ADDRESS;
const TOKEN_CLIENT = process.env.TOKEN_CLIENT;

function Dao({ addr }) {
    const router = useRouter()
    const client = new Web3Storage({ TOKEN_CLIENT })

    const { daoAddress } = router.query

    const { active, activate, account, library } = useWeb3React();
    const [deployRequest, setDeployRequest] = useState(false);

    const [step, setStep] = useState(0)

    const [name, setName] = useState("");
    const [about, setAbout] = useState("");

    const [roadmap, setRoadmap] = useState("");
    const [banner, setBanner] = useState("");
    const [website, setWebsite] = useState("");


    const [DAOContract, setDAOContract] = useState()
    const [contracts, setContracts] = useState([])
    const [link, setLink] = useState()

    useEffect(() => {
        if (step === 7 && DAOContract) {
            async function getContracts() {

                const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/yZIdvCyYdidI1nxEKQeR4mCPmkqP2gS5");

                const Factory = new Contract(DAOContract.address, GoodsFactoryAbi, provider)

                const hexToDecimal = hex => parseInt(hex, 16);
                try {
                    let resContracts = await Factory.getGoodsArray()

                    let detailedContracts = [];
                    for (let i = 0; i < resContracts.length; i++) {
                        const temp = new Contract(resContracts[i], GoodsAbi, provider)
                        let tempName = await temp.name()
                        let tempSymbol = await temp.symbol()
                        let tempPrice = await temp.goodsPrice()
                        let tempSupply = await temp.MAX_GOODS()
                        let tempMinted = await temp.totalSupply()
                        let balance = await provider.getBalance(resContracts[i])

                        //let tempPreview = await temp.previewImage()
                        let base = await temp.baseURI()
                        let tempHash = base.slice(-60, -1);

                        console.log(typeof (tempPrice))
                        console.log(tempPrice)
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
                            balance: hexToDecimal(balance._hex)
                            //preview: tempPreview
                        }

                        detailedContracts.push(r);
                    }

                    console.log(detailedContracts)
                    setContracts(detailedContracts)

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
        }
    }, [library, step, DAOContract]);

    useEffect(() => {
        async function getContracts() {
            const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/yZIdvCyYdidI1nxEKQeR4mCPmkqP2gS5");

            const hexToDecimal = hex => parseInt(hex, 16);

            let address = addr ? addr : daoAddress;
            console.log(address)
            try {
                if (address) {
                    const temp = new Contract(address, GoodsFactoryAbi, provider)
                    let tempOwner = await temp.owner()
                    let tempName = await temp.daoName()
                    let tempAbout = await temp.daoAbout()
                    let tempMetadataUri = await temp.daoMetadata()

                    let metadata;
                    axios.get(tempMetadataUri)
                        .then(
                            ({ data }) => {
                                console.log(data)
                                metadata = data;
                            }
                        ).catch(error => {
                            if (error.response) {
                                console.log(error.response);
                                console.log("error.response");
                            }
                        });

                    console.log(tempOwner)
                    console.log(tempName)

                    let r = {
                        address: address,
                        owner: tempOwner,
                        name: tempName,
                        about: tempAbout,
                        metadata: metadata
                    }
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
        setStep((step) => step + 1)
    };

    const handlePrev = () => {
        setStep((step) => step - 1)
    };

    const deploy = useCallback(async () => {
        if (!library) return alert("Wallet connection failed, please try again");

        const signer = library.getSigner(account).connectUnchecked();

        const DAOFactory = new Contract(DAO_FACTORY_ADDRESS, DAOFactoryAbi, signer)

        // prepare metadata ipfs
        const daoMetadata = {
            roadmap: roadmap,
            banner: banner,
            website: website
        }

        const blobMetadata = new Blob([JSON.stringify(daoMetadata)], { type: 'application/json' })

        const files = [
            new File([blobMetadata], 'metadata.json')
        ]

        const cid = await client.put(files)
        console.log('stored files with cid:', cid)
        let metadatauri = `https://${cid}.ipfs.w3s.link/`
        console.log(metadatauri)
        try {
            console.log(name + about + metadatauri)
            let res = await DAOFactory.CreateNewDAO(name, about, metadatauri)
            const receipt = await res.wait();
            console.log(receipt)
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
                    <a >
                        <img src={"./OSFD.svg"} width="80"></img>
                    </a>
                </Link>
            </Box>

            {step == 0 &&
                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <Box style={{ textAlign: "center", fontSize: "1.4em" }}>
                        <div style={{ margin: 50 }}>
                            Choose from Templates
                        </div>
                        <IconButton onClick={handleNext}>
                            <Image src="/dao.png" alt="dao" width="100" height="100" />
                        </IconButton>
                        <br></br>
                        Quick Template
                    </Box>
                </Box>
            }

            {step == 1 &&
                <Box style={{ height: "100%" }}>

                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
                        <Button onClick={handlePrev}>
                            prev
                        </Button>
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
                                <Button onClick={handleNext}>
                                    next
                                </Button>
                            </div>
                        </Box>
                    </Box>

                </Box>
            }

            {step == 2 &&
                <Box style={{ height: "100%" }}>

                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
                        <Button onClick={handlePrev}>
                            prev
                        </Button>
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
                                <Button onClick={handleNext}>
                                    next
                                </Button>
                            </div>
                        </Box>
                    </Box>

                </Box>
            }

            {step == 3 &&
                <Box style={{ height: "100%" }}>

                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
                        <Button onClick={handlePrev}>
                            prev
                        </Button>
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
                                <Button onClick={handleNext}>
                                    next
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Box>
            }
            {step == 4 &&
                <Box style={{ height: "100%" }}>
                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
                        <Button onClick={handlePrev}>
                            prev
                        </Button>
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
                                <Button onClick={handleNext}>
                                    next
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Box>
            }
            {step == 5 &&
                <Box style={{ height: "100%" }}>

                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
                        <Button onClick={handlePrev}>
                            prev
                        </Button>
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
                                <Button onClick={handleNext}>
                                    preview
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Box>
            }
            {step == 6 &&
                <div style={{ textAlign: "center" }}>
                    <div>
                        <Button onClick={handlePrev}>
                            prev
                        </Button>
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


                    <Button onClick={handleClickDeploy}>
                        Deploy DAO Contract
                    </Button>
                </div>
            }
            {step == 7 && DAOContract &&
                <div style={{ textAlign: "center", margin: 50 }}>
                    <div>
                        {DAOContract.metadata && <img src={DAOContract.metadata.banner} style={{ height: "20vh" }}></img>}
                        <h1>{DAOContract.name}</h1>
                        <br></br>

                        {DAOContract.about}

                        <br></br>

                        {DAOContract.metadata && <Button onClick={() => { window.open(DAOContract.metadata.website, '_blank', 'noopener,noreferrer'); }}>Website</Button>}
                    </div>

                    <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {contracts &&
                            contracts.map(
                                (cont) =>
                                    <Box
                                        key={cont.address}
                                        style={{ border: "2px black solid", margin: 40, width: "25vw", padding: 5 }}
                                    >
                                        <Box style={{ textAlign: "center", fontSize: "1.5em" }} >
                                            {cont.name}  {"(" + cont.symbol + ")"}
                                        </Box>


                                        <Box style={{ textAlign: "center" }} >
                                            {//<img src={ } style={{ width: "100%" }}></img>
                                            }
                                            <MintPreview hash={cont.hash}></MintPreview>

                                            balance {cont.balance / 1000000000000000000} eth
                                            <br></br>
                                            supply: {cont.supply - cont.minted}/{cont.supply}
                                            <br></br>
                                            <Button

                                                variant="contained"
                                                style={{ textAlign: "center", marginInline: 6 }}
                                                onClick={async () => {
                                                    if (!library) return alert("Wallet connection failed, please try again");

                                                    const signer = library.getSigner(account).connectUnchecked();
                                                    const contract = new Contract(cont.address, GoodsAbi, signer);

                                                    try {

                                                        const mintInitResult = await contract.mintGoods(1, {
                                                            value: (cont.price).toString(),
                                                        });

                                                        console.log(mintInitResult);

                                                        //alert("Successfully initiated mint!");

                                                        const receipt = await mintInitResult.wait();

                                                        console.log(receipt);

                                                        const mintedTokenId = parseInt(receipt.logs[0].topics[3], 16);

                                                        console.log(await contract.baseURI() + mintedTokenId);

                                                        //alert(`Successfully minted token ${mintedTokenId}!`);

                                                        setLink(`https://testnets.opensea.io/assets/rinkeby/${receipt.logs[0].address}/${mintedTokenId}`)


                                                    } catch (error: any) {
                                                        alert("Failed to mint: " + JSON.stringify(error));
                                                        console.log("Failed to mint: ", error);
                                                    }
                                                }}
                                            >
                                                mint {cont.price / 1000000000000000000} eth
                                            </Button>
                                            <MintLogs address={cont.address}></MintLogs>

                                            {DAOContract && DAOContract.owner == account &&
                                                <Button variant="contained" onClick={
                                                    async () => {
                                                        if (!library) return alert("Wallet connection failed, please try again");

                                                        const signer = library.getSigner(account).connectUnchecked();
                                                        const contract = new Contract(cont.address, GoodsAbi, signer);

                                                        try {


                                                            const withdrawRes = await contract.withdraw();

                                                            console.log(withdrawRes);



                                                        } catch (error: any) {
                                                            alert("Failed to mint: " + JSON.stringify(error));
                                                            console.log("Failed to mint: ", error);
                                                        }
                                                    }
                                                }>
                                                    Withdraw
                                                </Button>
                                            }
                                        </Box>
                                    </Box>
                            )
                        }
                    </Box>

                    {link && <Button onClick={() => { window.open(link, '_blank', 'noopener,noreferrer'); }}>mint reveal</Button>}




                    {DAOContract && DAOContract.owner == account &&
                        <Button onClick={() => Router.push(`/minter?factoryAddress=${DAOContract.address}`)}>
                            CREATE NEW Collection
                        </Button>
                    }
                </div>
            }

            <div style={{ justifyContent: "center", display: "flex" }}>
                {(daoAddress == "0xd6F69419B3D289b8f26013Fb43B6A7d22aAba962" || addr == "0xd6F69419B3D289b8f26013Fb43B6A7d22aAba962") && <h3>Timeline</h3>}
            </div>
            <div style={{ justifyContent: "center", display: "flex", margin: 20 }}>
                {(daoAddress == "0xd6F69419B3D289b8f26013Fb43B6A7d22aAba962" || addr == "0xd6F69419B3D289b8f26013Fb43B6A7d22aAba962") && <img src={"./Timeline.png"} ></img>}
            </div>
            <Feedback ></Feedback>
            <div>
                <Footer />
            </div>
        </Box >
    );
}

export default Dao;
