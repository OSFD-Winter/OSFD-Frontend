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
import NounsHeader from "../components/nounsDAO/nounsHeader";
import TreasuryDisplay from "../components/treasuryDisplay";
import Footer from "../components/footer"
import Refferal from "../components/referral";

const Home: NextPage = () => {
    return (
        <div >
            <NounsHeader />
            <TreasuryDisplay safeAddress={"0x432b351Db56d95F0ed37c7De3E20249200f8d3C9"}> </TreasuryDisplay>
            <Refferal />
            <Footer />
        </div>
    );
};

export default Home;
