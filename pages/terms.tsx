// @ts-nocheck
import {
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  Input,
  TextField,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import Router from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/footer";

let p1 = `
●	You have working knowledge of web3 technologies, specifically NFTs aka Smart Contracts
●	This is risky; you may lose all of your capital
●	Your participation (voting on operations) plays a role in the DAO LLCs overall success
●	Your purchase of the certificate acts as the agreement to our official T&Cs here [link] 

`;

const Home: NextPage = () => {
  return (
    <Box sx={{ height: "100%", backgroundImage: `url(bg.png)` }}>
      <img src={"./header.png"} width="100%"></img>
      <div style={{ marginInline: "10vw" }}>
        <pre>
          <b>TL;DR Terms of Sales:</b>
          {p1}
        </pre>
        <div>
          <b>Legal Stuff:</b>
          <div>
            The Fourth DAO LLC is a decentralized autonomous organization dba
            Team Nouns DAO LLC Pursuant to W.S. 17-31-106(b) The Fourth DAO LLC
            publicly available identifier of our smart contract can be found at
            this address:
            https://etherscan.io/address/0x5827d57e0555b8cce82632c58ef94bad7fcfa0e9#code
            The entity will be smart contract managed. Pursuant to W.S.
            17-341-104 (e), The Fourth DAO LLC will be managed by members and
            will not be exclusively governed & managed algorithmically.
          </div>
        </div>
        <br></br>
        <div>
          <b>The Fourth DAO LLC - WY Certificate of Good Standing</b>
          <div>
            STATE OF WYOMING Office of the Secretary of State I, EDWARD A.
            BUCHANAN, SECRETARY OF STATE of the STATE OF WYOMING, do hereby
            certify that according to the records of this office, The Fourth DAO
            LLC is a Limited Liability Company formed or qualified under the
            laws of Wyoming did on August 23, 2022, comply with all applicable
            requirements of this office. Its period of duration is Perpetual.
            This entity has been assigned entity identification number
            2022-001151482. This entity is in existence and in good standing in
            this office and has filed all annual reports and paid all annual
            license taxes to date, or is not yet required to file such annual
            reports; and has not filed Articles of Dissolution. I have affixed
            hereto the Great Seal of the State of Wyoming and duly generated,
            executed, authenticated, issued, delivered and communicated this
            official certificate at Cheyenne, Wyoming on this 30th day of
            August, 2022 at 4:25 PM. This certificate is assigned ID Number
            054798531.
          </div>
        </div>
        <br></br>
        <div>
          <b>Member Certificate Language:</b>
          <div>
            The Fourth DAO LLC, dba Teams Nouns DAO hereby certifies that [Name]
            is a member of the above named Limited Liability Company and is
            entitled to the full benefits and privileges of such membership
            subject to the duties and obligations as more fully set forth in the
            LLC Operating Agreement In witness whereof the above named LLC has
            caused this Certificate to be executed by its duly authorized
            Members and its LLC Seal to be hereunto affixed
          </div>
        </div>
        <br></br>
        <div>
          <b>Summary:</b>
          <div>
            Each DAO LLC member in this company is required to be actively
            involved in the management of the business (at a minimum to vote
            upon its member-managed ongoing activities), and thus their DAO LLC
            interests are not be considered investment contracts subject to
            securities laws You have low to no expectation of profits and rather
            endeavor to explore and learn about new technologies that may or may
            not create profitable business structures. Any profits distributed
            to you from this DAO LLC are required to be reported as personal
            income as subject to the tax jurisdiction laws you reside in.
          </div>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", paddingBlock: 100 }}
      >
        <Button onClick={() => Router.push(`/`)}>
          <img src={"./black-logo.png"}></img>
        </Button>
      </div>
      <div>
        <Footer />
      </div>
    </Box>
  );
};

export default Home;
