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
import Footer from "../components/footer";
import Referral from "../components/referral";

const Home: NextPage = () => {
    return (
        <div>
            <NounsHeader />
            <div
                className="container"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                }}
            >
                <div
                    className="left-container"
                    style={{
                        maxWidth: "500px",
                        display: "flex",
                        flexDirection: "column",
                        fontFamily: "Poppins",
                        color: "#00008B",
                    }}
                >
                    <span style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={"./nounslogo.png"}
                            alt="nouns-logo"
                            width="50px"
                            style={{ paddingRight: "5px" }}
                        />
                        <h2>TEAM NOUNS DAO MEMBERSHIP</h2>
                    </span>
                    <span>
                        <p style={{ fontSize: "1.2em" }}>
                            <strong>750 Seats, 1 ETH</strong> Participation
                        </p>
                        <p style={{ fontSize: "0.7em" }}>
                            Wyoming DAO LLC Formation Snapshot Voting Structures
                            Gnosis Safe Treasury
                        </p>
                    </span>
                    <span>
                        <p style={{ fontSize: "1.2em" }}>
                            Capital to fund development of core technologies:
                        </p>
                        <p style={{ fontSize: "0.7em" }}>
                            Messaging on Blockchains, Postcards, Generative
                            Nouns NFTs, Stamps, Scenes Art and Community Spaces
                        </p>
                    </span>
                    <h2>
                        Current Available:
                        <x
                            style={{
                                padding: "0px 10px 0px 10px",
                                backgroundColor: "#00008B",
                                color: "white",
                                borderRadius: "0.5rem",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            750
                        </x>
                    </h2>
                </div>
                <div
                    className="right-container"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img
                        src="./Team_Nouns_Stakeholder_Certificate_II.png"
                        alt="dummy-img"
                        style={{ objectFit: "contain", width: "500px" }}
                    ></img>
                    <x
                        style={{
                            padding: "0px 10px 0px 10px",
                            color: "white",
                            borderRadius: "0.5rem",
                            fontWeight: "bold",
                            marginLeft: "15px",
                            marginTop: "5px",
                        }}
                    >
                        <a href="" style={{}}>
                            <img src="./joinEth.png" width="150px" />
                        </a>
                    </x>
                </div>
            </div>
            <TreasuryDisplay
                safeAddress={"0x432b351Db56d95F0ed37c7De3E20249200f8d3C9"}
            ></TreasuryDisplay>
            <Referral />
            <Footer />
        </div>
    );
};

export default Home;
