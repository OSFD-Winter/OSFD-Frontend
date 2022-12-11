// @ts-nocheck
import { Box } from "@mui/system";
import { Button, IconButton, TextField } from "@mui/material";
import Image from "next/image";

import Link from "next/link";

import { ETH_GOERLI_ALCHEMY } from "../utils/constants";
import Dao from "../pages/dao";

const DAO_FACTORY_ADDRESS = process.env.DAO_FACTORY_ADDRESS;
const TOKEN_CLIENT = process.env.TOKEN_CLIENT;

function CreateDAO({
  addr,
  step,
  about,
  name,
  roadmap,
  banner,
  website,
  handleNext,
  handleNameChange,
  handlePrev,
  handleAboutChange,
  handleRoadmapChange,
  handleBannerChange,
  handleWebsiteChange,
  handleClickDeploy,
}) {
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
