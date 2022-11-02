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
    Paper
} from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import Router from 'next/router'
import { FC, useCallback, useEffect, useState } from "react";
import axios from 'axios';
import Dao from "./dao"



const Home: NextPage = () => {

    return (
        <Box sx={{ height: "100%" }}>
            <Dao addr={"0xd6F69419B3D289b8f26013Fb43B6A7d22aAba962"} > </Dao>


        </Box >
    );
};

export default Home;
