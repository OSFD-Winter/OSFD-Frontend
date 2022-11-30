// @ts-nocheck
import { Box } from "@mui/system";
import { Button, IconButton, TextField } from "@mui/material";

import Router from "next/router";
import { useRouter } from "next/router";
import Link from "next/link";

import Feedback from "../components/feedback";
import Footer from "../components/footer";
import CreateDAO from "../components/createDAO";

function Dao({ addr }) {
  const router = useRouter();
  const { daoAddress } = router.query;

  return (
    <Box sx={{ height: "100%", p: 2 }}>
      <Box style={{ position: "absolute", top: 5, left: 5 }}>
        <Link href={`/`}>
          <a>
            <img src={"./OSFD.svg"} width="80"></img>
          </a>
        </Link>
      </Box>

      <CreateDAO></CreateDAO>

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
