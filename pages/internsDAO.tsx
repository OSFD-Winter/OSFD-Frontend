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
import ProjectCard from "../components/projectCard";
import image from "next/image";

const projects = [
  {
    color: "#C3FF94",
    name: "OSFD CHAT",
    desc: "Wallet to Wallet cryptographically secure feeless chat app built with XMTP SDK &metamask.",
    image: "./chat.png",
  },
  {
    color: "#94B2FF",
    name: "Networks 1-5",
    desc: "Social apps enabling posting text, color, image, song and creating bounties for song and image requests wia wallets. Each post contains signatures as proof.",
    image: "./network-5.png",
  },
  {
    color: "#C3FF94",
    name: "Image Generator AI integration for OSFD",
    desc: "Enhancing OSFD creative tools by using DALL-E, Midjourney & Stable Diffusion.",
    image: "./AI.png",
  },
  {
    color: "#FFE194",
    name: "Onchain Rock Paper Scissors Game",
    desc: "Mint and play secure decentralised onchainrock paper scissors game.",
    image:
      "https://static.vecteezy.com/system/resources/previews/000/691/497/original/rock-paper-scissors-neon-icons-vector.jpg",
  },
  {
    color: "#FF94F4",
    name: "Marketplace for OSFD",
    desc: "NFT marketplace for trading NFTs created by OSFD contracts without paying any fee.",
    image: "https://agentestudio.com/uploads/post/image/187/main_Article_Covers_NFT.png",
  },
  {
    color: "#FFE194",
    name: "Twitter & Discord Bots",
    desc: " Twitter & Discord bots can be used for anything, sharing collected feedbacks, collecting wallet addresses, sharing activity of products we built. All for providing more transparent and automated process.",
    image: "./discord.jpg",
  },
];

const InternsDAO: NextPage = () => {
  const space = "internsdao.eth";
  const mint = useRef();
  const projectsRef = useRef();
  const proposals = useRef();

  return (
    <Box className={"bg-gradient-to-r from-[#73CBFD] to-[#A8E8DA] "}>
      <Box
        className={
          "h-[100px] border-solid border-2 rounded-b-3xl bg-gradient-to-r from-[#D57EEA] to-[#FCCB90] flex items-center sticky top-0 z-10"
        }
      >
        <Button
          style={{
            textShadow: "3px 3px 0px #000000",
            fontSize: "3em",
            fontFamily: "BebasNeue",
            color: "white",
            marginLeft: 30,
            lineHeight: "77px",
          }}
        >
          <Link href="/">OSFD</Link>
        </Button>
        <Box style={{ marginLeft: "auto" }}>
          <div className="flex ml-auto justify-between mr-[36px]">
            <Button
              onClick={() => {
                mint.current.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }}
              style={{ fontFamily: "Montserrat", fontSize: "1.3em", color: "#000000" }}
            >
              Mint
            </Button>
            <Button
              onClick={() => {
                projectsRef.current.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }}
              style={{ fontFamily: "Montserrat", fontSize: "1.3em", color: "#000000" }}
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
              style={{ fontFamily: "Montserrat", fontSize: "1.3em", color: "#000000" }}
            >
              Proposals
            </Button>
            <Button style={{ fontFamily: "Montserrat", fontSize: "1.3em", color: "#000000" }}>
              About
            </Button>
            <Button style={{ fontFamily: "Montserrat", fontSize: "1.3em", color: "#000000" }}>
              Contact
            </Button>
          </div>
        </Box>
      </Box>

      <Box className={" my-10 flex w-10/12 mx-auto"} ref={mint}>
        <div className="w-6/12 mx-auto">
          <div className={"font-bold text-xl my-10 text-center font-Poppins "}>
            Interns DAO Stakeholder Certificates
          </div>
          <div>
            Silent sir say desire fat him letter. Whatever settling goodness too and honoured she
            building answered her. Strongly thoughts remember mr to do consider debating. Spirits
            musical behaved on we he farther letters. Repulsive he he as deficient newspaper
            dashwoods we. Discovered her his pianoforte insipidity entreaties. Began he at terms
            meant as fancy. Breakfast arranging he if furniture we described on.
          </div>
          <MintButton
            address="0x09aD6Fb74584fFbA72C65419c03741325CAE00a1"
            price="1000000000000000"
          ></MintButton>
        </div>
        <Box style={{ width: 500 }}>
          <MintPreview hash={"bafybeidn5ubtxclqpr55l5gocwstop5moqccgoakhclqxx3uiegdu5fofi"} />
        </Box>
      </Box>

      <Box style={{ backgroundColor: "rgba(24, 24, 24, 0.4)" }}>
        <div>
          <div className="w-full p-24">
            <div className={"text-white font-bold text-4xl mb-24 "}>Projects</div>

            <Box className={"columns-2"} ref={projectsRef}>
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.name}
                  name={project.name}
                  desc={project.desc}
                  image={project.image}
                  left={index < 3}
                  color={project.color}
                />
              ))}
            </Box>
          </div>
        </div>
      </Box>
      <div className="flex justify-center" ref={proposals}>
        <Proposals space={space}></Proposals>
      </div>
      <div style={{ marginTop: 100 }}>
        <Feedback></Feedback>
      </div>
      <Footer gradient={"bg-gradient-to-r from-[#D57EEA] to-[#FCCB90] "} />
    </Box>
  );
};

export default InternsDAO;
