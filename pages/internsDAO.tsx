// @ts-nocheck
import { Box, Button, Card } from "@mui/material";
import MintPreview from "../components/mintPreview";
import Proposals from "../components/proposals";
import Footer from "../components/footer";
import { ArrowLeft } from "@mui/icons-material";
import Link from "next/link";
import React, { useRef } from "react";
import MintButton from "../components/mintButton";
import Feedback from "../components/feedback";
import NFTDisplay from "../components/NFTDisplay";

const InternsDAO: NextPage = () => {
  const space = "internsdao.eth";
  const mint = useRef();
  const projects = useRef();
  const proposals = useRef();

  return (
    <Box sx={{ height: "100%" }}>
      <Box>
        <div className="bg-gradient-to-r from-[#FFCF71] to-[#BDACFF] h-36 flex">
          <div className="m-auto cursor-pointer">
            <Link href="/">
              <img src={"./osfd-small-logo.png"} alt="osfd" />
            </Link>
          </div>

          <div className="flex ml-auto justify-between w-6/12">
            <Button
              onClick={() => {
                mint.current.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }}
              style={{ color: "white", fontSize: "1.5em", textTransform: "none" }}
            >
              Mint
            </Button>
            <Button
              onClick={() => {
                projects.current.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }}
              style={{ color: "white", fontSize: "1.5em", textTransform: "none" }}
            >
              Projects
            </Button>
            <Button
              onClick={() => {
                proposals.current.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }}
              style={{ color: "white", fontSize: "1.5em", textTransform: "none" }}
            >
              Proposals
            </Button>
            <Button style={{ color: "white", fontSize: "1.5em", textTransform: "none" }}>
              About
            </Button>
            <Button style={{ color: "white", fontSize: "1.5em", textTransform: "none" }}>
              Contact
            </Button>
          </div>
          <img src={"./nouns-world.png"} className="h-36 ml-auto"></img>
        </div>

        <div className={"w-[1000px] mx-auto my-10"} ref={mint}>
          <div>
            <MintPreview
              hash={"bafybeidn5ubtxclqpr55l5gocwstop5moqccgoakhclqxx3uiegdu5fofi"}
            ></MintPreview>
            <MintButton
              address="0x09aD6Fb74584fFbA72C65419c03741325CAE00a1"
              price="1000000000000000"
            ></MintButton>
          </div>
          <div className="w-full">
            <div className={"text-[#7E53FF] font-bold text-xl my-10 text-center"}>
              Interns DAO Stakeholder Certificates
            </div>
            <div>
              Silent sir say desire fat him letter. Whatever settling goodness too and honoured she
              building answered her. Strongly thoughts remember mr to do consider debating. Spirits
              musical behaved on we he farther letters. Repulsive he he as deficient newspaper
              dashwoods we. Discovered her his pianoforte insipidity entreaties. Began he at terms
              meant as fancy. Breakfast arranging he if furniture we described on.
            </div>
          </div>
        </div>
      </Box>

      <Box>
        <div className={"flex w-8/12 mx-auto my-10"}>
          <div className="w-full">
            <div className={"text-[#7E53FF] font-bold text-3xl my-10"}>Projects</div>

            <Card className="flex justify-center items-center bg-gradient-to-r from-[#4992FF] to-[#E4EFFF] mb-5">
              <Button
                onClick={() => {
                  window.open(
                    "https://osfd-winter.github.io/Fang-Chat/",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                className={"w-full"}
              >
                <img src={"./chat.png"} style={{ width: 300, marginBlock: 30 }}></img>
                <div className={"w-8/12 text-center normal-case text-[#000]"}>
                  <div className={"font-bold text-xl mb-10"}>OSFD CHAT</div>
                  <div>
                    Wallet to Wallet cryptographically secure feeless chat app built with XMTP SDK &
                    metamask.
                  </div>
                </div>
              </Button>
            </Card>

            <Card
              className="flex justify-center items-center bg-gradient-to-r from-[#FFDBF5] to-[#F47AD2] mb-5"
              ref={projects}
            >
              <Button
                onClick={() => {
                  window.open("https://network1.cc/", "_blank", "noopener,noreferrer");
                }}
                className={"w-full"}
              >
                <div className={"w-8/12 text-center normal-case text-[#000]"}>
                  <div className={"font-bold text-xl mb-10"}>Networks 1-5</div>
                  <div>
                    Social apps enabling posting text, color, image, song and creating bounties for
                    song and image requests wia wallets. Each post contains signatures as proof.
                  </div>
                </div>
                <img
                  src={"./network-5.png"}
                  style={{ width: 300, marginBlock: 30, marginInline: 10 }}
                ></img>
              </Button>
            </Card>

            <Card className="flex justify-center items-center bg-gradient-to-r from-[#ff8000] to-[#ffe6cc] mb-5">
              <Button
                onClick={() => {
                  window.open("https://discord.gg/SfcAZTctf9", "_blank", "noopener,noreferrer");
                }}
                className={"w-full"}
              >
                <img
                  src={"./discord.jpg"}
                  style={{ width: 300, marginBlock: 30, marginInline: 10 }}
                ></img>
                <div className={"w-8/12 text-center normal-case text-[#000]"}>
                  <div className={"font-bold text-xl mb-10"}>Twitter & Discord Bots</div>
                  <div>
                    Twitter &Discord bots can be used for anything, sharing collected feedbacks,
                    collecting wallet addresses, sharing activity of products we built. All for
                    providing more transparent and automated process.
                  </div>
                </div>
              </Button>
            </Card>

            <Card className="flex justify-center items-center bg-gradient-to-r from-[#d6f5d6] to-[#28a428] mb-5">
              <Button className={"w-full"}>
                <div className={"w-8/12  text-center normal-case text-[#000]"}>
                  <div className={"font-bold text-xl mb-10"}>
                    Image Generator AI integration for OSFD
                  </div>
                  <div>
                    Enhancing OSFD creative tools by using DALL-E, Midjourney & Stable Diffusion.
                  </div>
                </div>
                <img src={"./AI.png"} style={{ width: 300, marginBlock: 30 }}></img>
              </Button>
            </Card>

            <Card className="flex justify-center items-center bg-gradient-to-r from-[#78dcfa] to-[#4ec9f5] mb-5">
              <Button className={"w-full"}>
                <div className={"w-8/12  text-center normal-case text-[#000]"}>
                  <div className={"font-bold text-xl mb-10"}>Onchain Rock Paper Scissors Game</div>
                  <div>Mint and play secure decentralised onchainrock paper scissors game.</div>
                </div>
                <img
                  src={
                    "https://static.vecteezy.com/system/resources/previews/000/691/497/original/rock-paper-scissors-neon-icons-vector.jpg"
                  }
                  style={{ width: 300, marginBlock: 30 }}
                ></img>
              </Button>
            </Card>

            <Card className="flex justify-center items-center bg-gradient-to-r from-[#F8F7C5] to-[#FAF719] mb-5">
              <Button className={"w-full"}>
                <div className={"w-8/12  text-center normal-case text-[#000]"}>
                  <div className={"font-bold text-xl mb-10"}>Marketplace for OSFD</div>
                  <div>Feeless NFT marketplace for OSFD</div>
                </div>
                <img
                  src={
                    "https://cdnblog.webkul.com/blog/wp-content/uploads/2022/09/the-emergence-of-NFT-marketplace-in-the-mordern-era.png"
                  }
                  style={{ width: 300, marginBlock: 30 }}
                ></img>
              </Button>
            </Card>
          </div>
          <NFTDisplay owner="0x4bA9285EDE9D46Bc367ee1d5cD5a8F1d9e6572e6" />
        </div>
      </Box>
      <div className="flex justify-center" ref={proposals}>
        <Proposals space={space}></Proposals>
      </div>
      <div style={{ marginTop: 100 }}>
        <Feedback></Feedback>
      </div>
      <Footer gradient={"bg-gradient-to-r from-[#BFADFC] to-[#FCCD79]"} />
    </Box>
  );
};

export default InternsDAO;
