// @ts-nocheck
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Paper } from "@mui/material";

function Header({ hash }) {
  return (
    <div
      style={{
        width: "100%",
        height: "20vh",
        backgroundImage: `linear-gradient(to bottom right, #0071e3, #009fe3)`,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img src={"OSFD.svg"} style={{ height: "10vh" }}></img>
    </div>
  );
}

export default Header;
