// @ts-nocheck
import { Box, Button, Card, Slide } from "@mui/material";
import MintPreview from "../components/mintPreview";
import Proposals from "../components/proposals";
import Footer from "../components/footer";
import { ArrowLeft } from "@mui/icons-material";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MintButton from "../components/mintButton";
import Feedback from "../components/feedback";
import ProjectCard from "../components/projectCard";
import image from "next/image";
import InternsFeedback from "../components/internsDAO/internsDAOFb";
import ProposalSuggestion from "../components/proposalSuggestion";

const projects = [
  {
    color: "#C3FF94",
    name: "OSFD CHAT",
    desc: "Wallet to Wallet cryptographically secure feeless chat app built with XMTP SDK & metamask.",
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
    desc: "Mint and play secure decentralized onchainrock paper scissors game.",
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
  const [inView, setInView] = useState(null);

  const toggleNavBtn = useCallback(function (e) {
    const containerInView = e[0].target;
    document.querySelectorAll(".option-nav").forEach((item) => {
      item.style.borderBottom = "";
    });
    e.forEach((entry) => {
      if (containerInView.isSameNode(mint.current) && entry.isIntersecting) {
        document.querySelector(".mint-nav").style.borderBottom = "2px solid black";
        console.log("mint");
      } else if (containerInView.isSameNode(projectsRef.current) && entry.isIntersecting) {
        document.querySelector(".projects-nav").style.borderBottom = "2px solid black";
        console.log("project");
      } else if (containerInView.isSameNode(proposals.current) && entry.isIntersecting) {
        document.querySelector(".proposals-nav").style.borderBottom = "2px solid black";
        console.log("proposals");
      }
    });
    console.log(e[0].intersectionRatio);
    // console.log(e);
    // console.log(mint.current);
  }, []);
  useEffect(() => {
    let options = {
      rootMargin: "100px",
      threshold: 0.9,
    };
    let observer = new IntersectionObserver(toggleNavBtn, options);
    let observer2 = new IntersectionObserver(toggleNavBtn, { threshold: 0.7 });
    let observer3 = new IntersectionObserver(toggleNavBtn, { threshold: 1 });
    observer.observe(mint.current);
    observer2.observe(projectsRef.current);
    observer3.observe(proposals.current);
  }, [toggleNavBtn]);

  return (
    // TODO: highlight what sections are in view
    <Box
      className={
        "bg-gradient-to-r from-[#73CBFD] to-[#A8E8DA] bg-fixed bg-center bg-no-repeat bg-cover"
      }
    >
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
              className="mint-nav option-nav"
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
              className="projects-nav option-nav"
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
              className="proposals-nav option-nav"
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

      <Box
        className={" my-10 flex w-10/12 mx-auto bg-fixed bg-center bg-cover bg-no-repeat"}
        ref={mint}
      >
        <div className="w-6/12 mx-auto flex flex-col items-center">
          <h1 className={"font-bold text-xl mb-10 text-center font-Poppins "}>
            Interns DAO Stakeholder Certificates
          </h1>
          <div className="leading-8">
            Interns DAO is a place where you can learn, build and ship with other interns from
            around the world. There are two ways to join us - building or investing!
            <br />
            <br />
            • Interns DAO is a decentralized organization that allows interns around the world to
            come together and work on projects they&apos;re interested in.
            <br />
            <br />
            • There are three main actors in Interns DAO: stakeholders, builders, and product
            owners. Stakeholders have the ability to change product owners, while builders can
            complete tasks and claim bounties.
            <br />
            <br />• The goal of Interns DAO is to provide opportunities for students to learn and
            build projects aligned with their interests. If successful, builders will be compensated
            via bounties.
          </div>
          <MintButton
            address="0x09aD6Fb74584fFbA72C65419c03741325CAE00a1"
            price="1000000000000000"
            design="neo"
          ></MintButton>
        </div>
        <Box style={{ width: 500 }}>
          <MintPreview
            hash={"bafybeidn5ubtxclqpr55l5gocwstop5moqccgoakhclqxx3uiegdu5fofi"}
            design={"neo"}
          />
        </Box>
      </Box>

      <Box
        ref={projectsRef}
        style={{ backgroundColor: "rgba(24, 24, 24, 0.4)", overflow: "hidden" }}
      >
        <div className="w-full p-24">
          <div className={"text-white font-bold text-4xl mb-24 "}>Projects</div>
          <Box className={"columns-2"}>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                desc={project.desc}
                image={project.image}
                left={index < 3}
                color={project.color}
                index={index}
              />
            ))}
          </Box>
        </div>
      </Box>
      <div className="flex flex-col justify-center p-24" ref={proposals}>
        <h2 className="text-black text-3xl font-bold">Proposals</h2>
        <div className="flex justify-between gap-8">
          <div className="w-1/3">
            <Proposals space={space}></Proposals>
          </div>
          {/* <div className="w-7/12">
            <ProposalSuggestion />
          </div> */}
        </div>
      </div>
      <div style={{ marginTop: 100 }}>
        <InternsFeedback></InternsFeedback>
      </div>
      <Footer gradient={"bg-gradient-to-r from-[#D57EEA] to-[#FCCB90] "} />
    </Box>
  );
};

export default InternsDAO;
