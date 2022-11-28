// @ts-nocheck
import { Box, Button } from "@mui/material";
import MintPreview from "../components/mintPreview";
import Proposals from "../components/proposals";
import Footer from "../components/footer";
import { ArrowLeft } from "@mui/icons-material";

/*
osfd home page
mint mint module scroll
products
proposals
about
contact
*/

/*
mint module will contain mint preview & functional mint button

props 
contract address
optional prop
hash

if hash exist dont read chain
*/

const InternsDAO: NextPage = () => {
  const space = "internsdao.eth";

  return (
    <Box sx={{ height: "100%" }}>
      <Box>
        <div className="bg-gradient-to-r from-[#FFCF71] to-[#BDACFF] h-36 flex">
          <img src={"./osfd-small-logo.png"} className="h-16 my-auto ml-8" />
          <div className="flex ml-auto justify-between w-6/12">
            <Button style={{ color: "white", fontSize: "1.5em", textTransform: "none" }}>
              {" "}
              Mint
            </Button>
            <Button style={{ color: "white", fontSize: "1.5em", textTransform: "none" }}>
              {" "}
              Products
            </Button>
            <Button style={{ color: "white", fontSize: "1.5em", textTransform: "none" }}>
              {" "}
              Proposals
            </Button>
            <Button style={{ color: "white", fontSize: "1.5em", textTransform: "none" }}>
              {" "}
              About
            </Button>
            <Button style={{ color: "white", fontSize: "1.5em", textTransform: "none" }}>
              {" "}
              Contact
            </Button>
          </div>
          <img src={"./nouns-world.png"} className="h-36 ml-auto"></img>
        </div>

        <div className={"flex w-8/12 mx-auto my-10"}>
          <div className="w-full ">
            <div className={"text-[#7E53FF] font-bold text-xl my-10"}>
              Interns DAO Stakeholder Certificates
            </div>
            <div>
              Silent sir say desire fat him letter. Whatever settling goodness too and honoured she
              building answered her. Strongly thoughts remember mr to do consider debating. Spirits
              musical behaved on we he farther letters. Repulsive he he as deficient newspaper
              dashwoods we. Discovered her his pianoforte insipidity entreaties. Began he at terms
              meant as fancy. Breakfast arranging he if furniture we described on.
            </div>
            <div className="w-full flex justify-center">
              <Button style={{ color: "#7E53FF", fontSize: "1.5em", textTransform: "none" }}>
                {" "}
                Mint
              </Button>
            </div>
          </div>

          <div className={"w-72 flex ml-36"}>
            <MintPreview
              hash={"bafkreiffv5b3tyd2l4j5rti4snixwvghbxsqlnyn6aoxgzrnxbv7pqejhu"}
            ></MintPreview>
          </div>
        </div>
      </Box>

      <Box>
        <div className={"flex w-8/12 mx-auto my-10"}>
          <div className="w-full ">
            <div className={"text-[#7E53FF] font-bold text-3xl my-10"}>Products</div>
            <div className={"text-[#7E53FF] font-bold text-xl my-10"}>OSFD CHAT</div>
            <div>Wallet to Wallet secure feeless chat app built with XMTP SDK.</div>
            <div className={"text-[#7E53FF] font-bold text-xl my-10"}>Networks 1-5</div>
            <div>
              Social apps enabling posting text, color, image, song and creating bounties for song
              and image requests.
            </div>
            <div className={"text-[#7E53FF] font-bold text-xl my-10"}>
              Image Generator AI integration for OSFD
            </div>
            <div>Enhancing OSFD creative tools by using DALL-E, Midjourney & Stable Diffusion.</div>
            <div className={"text-[#7E53FF] font-bold text-xl my-10"}>Discord Bot</div>
            <div>
              Discord bots can be used for anything, sharing feedbacks we got, collecting wallet
              addresses, sharing activity of products we built. All for providing more transparent
              and automated process.
            </div>
          </div>
        </div>
      </Box>

      <Proposals space={space}></Proposals>

      <Footer gradient={"linear-gradient(to right, #BFADFC,  #FCCD79)"} />
    </Box>
  );
};

export default InternsDAO;
