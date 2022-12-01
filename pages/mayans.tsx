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
import Dao from "./dao";
import CreateDAO from "../components/createDAO";

const Home: NextPage = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <Dao addr={"0x4E02C328CA3Ff8A69be6c5ED23fE504AD61EdEb9"}> </Dao>
      {/* <CreateDAO addr={"0x4E02C328CA3Ff8A69be6c5ED23fE504AD61EdEb9"}>></CreateDAO> */}
    </Box>
  );
};

export default Home;
