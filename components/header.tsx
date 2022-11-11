// @ts-nocheck
// import { useEffect, useState } from "react";
// import axios from 'axios';
// import {
//     Button,
//     TextField,
//     Paper
// } from "@mui/material";

// function Header({ hash }) {
//     return (
//         <div style={{ width: "100%", height: "20vh", backgroundImage: `linear-gradient(to bottom right, #0071e3, #009fe3)`, display: "flex", justifyContent: "center" }}>
//             <img src={"OSFD.svg"} style={{ height: "10vh" }}></img>
//         </div >
//     )
// }

// export default Header
import React from "react";
import Logo from "../assets/osfd-big-logo.png";
import Image from "next/Image";
import Diamond from "../assets/diamond.png";
const Header = () => {
  return (
    <div className="akshar__header">
      <div className="akshar__logo">
        <Image src={Logo} alt="" />
      </div>
      <div className="akshar__diamond">
        <Image height="180px" width="100px" src={Diamond} alt="" />
      </div>
    </div>
  );
};

export default Header;
