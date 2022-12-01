// @ts-nocheck
import { Box } from "@mui/system";
import { Button, IconButton, TextField } from "@mui/material";
import { useEffect, useState, useCallback } from "react";

import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";

import Router from "next/router";
import { useRouter } from "next/router";
import Link from "next/link";

import MintPreview from "../components/mintPreview";
import MintLogs from "../components/mintLogs";

import Feedback from "../components/feedback";
import Footer from "../components/footer";
import CreateDAO from "../components/createDAO";

function Dao({ addr }) {
  const router = useRouter();
  const { daoAddress } = router.query;
  const { step, DAOContract, contracts } = CreateDAO();
  const { active, activate, account, library } = useWeb3React();

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

  return (
    <Box sx={{ height: "100%", p: 2 }}>
      <Box style={{ position: "absolute", top: 5, left: 5 }}>
        <Link href={`/`}>
          <a>
            <img src={"./OSFD.svg"} width="80"></img>
          </a>
        </Link>
      </Box>

      <CreateDAO addr={addr}></CreateDAO>

      {step == 7 && DAOContract && (
        <div style={{ textAlign: "center", margin: 50 }}>
          <div>
            {DAOContract.metadata && (
              <img src={DAOContract.metadata.banner} style={{ height: "20vh" }}></img>
            )}
            <h1>{DAOContract.name}</h1>
            <br></br>

            {DAOContract.about}

            <br></br>

            {DAOContract.metadata && (
              <Button
                onClick={() => {
                  window.open(DAOContract.metadata.website, "_blank", "noopener,noreferrer");
                }}
              >
                Website
              </Button>
            )}
          </div>

          <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {contracts &&
              contracts.map((cont) => (
                <Box
                  key={cont.address}
                  style={{ border: "2px black solid", margin: 40, width: "25vw", padding: 5 }}
                >
                  <Box style={{ textAlign: "center", fontSize: "1.5em" }}>
                    {cont.name} {"(" + cont.symbol + ")"}
                  </Box>

                  <Box style={{ textAlign: "center" }}>
                    {
                      //<img src={ } style={{ width: "100%" }}></img>
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
                            value: cont.price.toString(),
                          });

                          console.log(mintInitResult);

                          //alert("Successfully initiated mint!");

                          const receipt = await mintInitResult.wait();

                          console.log(receipt);

                          const mintedTokenId = parseInt(receipt.logs[0].topics[3], 16);

                          console.log((await contract.baseURI()) + mintedTokenId);

                          //alert(`Successfully minted token ${mintedTokenId}!`);

                          setLink(
                            `https://testnets.opensea.io/assets/rinkeby/${receipt.logs[0].address}/${mintedTokenId}`
                          );
                        } catch (error: any) {
                          alert("Failed to mint: " + JSON.stringify(error));
                          console.log("Failed to mint: ", error);
                        }
                      }}
                    >
                      mint {cont.price / 1000000000000000000} eth
                    </Button>
                    <MintLogs address={cont.address}></MintLogs>
                    {DAOContract && DAOContract.owner == account && (
                      <Button
                        variant="contained"
                        onClick={async () => {
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
                        }}
                      >
                        Withdraw
                      </Button>
                    )}
                  </Box>
                </Box>
              ))}
          </Box>

          {link && (
            <Button
              onClick={() => {
                window.open(link, "_blank", "noopener,noreferrer");
              }}
            >
              mint reveal
            </Button>
          )}

          {DAOContract && DAOContract.owner == account && (
            <Button onClick={() => Router.push(`/minter?factoryAddress=${DAOContract.address}`)}>
              CREATE NEW Collection
            </Button>
          )}
        </div>
      )}

      <div style={{ justifyContent: "center", display: "flex" }}>
        {(daoAddress == "0xd6F69419B3D289b8f26013Fb43B6A7d22aAba962" ||
          addr == "0xd6F69419B3D289b8f26013Fb43B6A7d22aAba962") && <h3>Timeline</h3>}
      </div>
      <div style={{ justifyContent: "center", display: "flex", margin: 20 }}>
        {(daoAddress == "0xd6F69419B3D289b8f26013Fb43B6A7d22aAba962" ||
          addr == "0xd6F69419B3D289b8f26013Fb43B6A7d22aAba962") && (
          <img src={"./Timeline.png"}></img>
        )}
      </div>
      <Feedback></Feedback>
      <div>
        <Footer />
      </div>
    </Box>
  );
}

export default Dao;
