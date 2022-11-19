import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { FaCopy } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://api.etherscan.io/";

function Referral() {
    const [referrer, setReferrer] = useState("");
    const [referralLink, setReferralLink] = useState(
        "https://www.teamnouns.xyz?ref="
    );
    const [currentRefferalAmount, setCurrentRefferalAmount] = useState(0);

    useEffect(() => {
        getReferralRewardAmount();
        const URL = document.URL;
        if (URL.includes("ref=")) {
            const tempReferrer = document.URL.split("ref=")[1];
            setReferrer(tempReferrer);
        }
    }, []);
    function getReferralRewardAmount() {
        const apiPlaceholder = "5V84IP6PWKTS51SNIPDNUNURIBU74ERPBK";
        axios
            .get(
                `${API_BASE_URL}api?module=stats&action=ethprice&apikey=${apiPlaceholder}`
            )
            .then((response) => {
                setCurrentRefferalAmount(response.data.result.ethusd / 2);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    return (
        <div
            className="referralProgram"
            style={{
                backgroundImage:
                    "radial-gradient(circle at 44.6% 35.17%, #9f25a6 0, #9018a1 25%, #80059c 50%, #6f0097 75%, #5e0092 100%)",
                height: 750,

                borderRadius: 50,
                width: "cal(85vw + 10vw)",
                position: "relative",
                margin: 0,
                marginTop: 100,
                boxSizing: "border-box",
                maxWidth: "85%",
                marginLeft: "7.5%",
                marginBottom: 100,
            }}
        >
            <div
                className="textImage"
                style={{
                    maxWidth: "100%",
                    color: "white",
                    minWidth: "2rem",
                    height: "auto",
                    textAlign: "center",
                    padding: "10px",
                    paddingTop: "50px",
                }}
            >
                {" "}
                <a style={{ width: "500px" }}>
                    {" "}
                    <img
                        src="Group 276.png"
                        style={{
                            width: "13%",
                            minWidth: "135px",
                            position: "relative",
                            top: "1vw",
                        }}
                        alt=""
                    ></img>{" "}
                </a>
                <span
                    style={{
                        fontSize: "calc(25px + 2vw)",
                        position: "relative",
                        marginLeft: "1.5vw",
                        paddingRight: "0px",
                        fontWeight: "bold",
                    }}
                >
                    {" "}
                    Referral Program
                </span>
            </div>

            <div
                className="Refferal Wallet link"
                style={{
                    paddingTop: 50,
                    textAlign: "center",
                    display: "flex",
                    width: "60%",
                    marginLeft: "17.7%",
                    justifyContent: "space-around",
                    // position: "relative",
                    // left: "4vw",
                }}
            >
                <span
                    style={{
                        color: "white",
                        width: "calc(50rem + 1vw)",
                        fontSize: "calc(8px + 1vw)",
                        paddingRight: 10,
                        fontWeight: "bold",
                        position: "relative",
                        top: "0.2vw",
                        right: "0.8vw",
                    }}
                >
                    REFERRER
                </span>
                <TextField
                    value={referrer}
                    onChange={(e) => {
                        setReferrer(e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                    placeholder="youremail@gmail.com"
                    style={{
                        width: "800px",
                        minWidth: 100,
                        color: "white",
                        borderRadius: 5,
                        backgroundColor: "white",
                        height: 40,
                        position: "relative",
                        top: "0.2vw",
                        // backgroundColor: "white",
                    }}
                ></TextField>

                {/* <Button
                    variant="outlined"
                    size="medium"
                    disabled
                    style={{
                        visibility: "hidden",
                        backgroundColor: "white",
                        marginLeft: "3vw",
                        minWidth: "45px",
                        position: "relative",
                        top: 1,
                        right: "1vw",
                        width: "13vw",
                        fontSize: "calc(10px + 0.3vw)",
                        height: "calc(31px + 0.7vw)",
                        borderRadius: 9,
                        color: "#0F155A",
                    }}
                    sx={{ fontSize: "16 + 1vw", fontWeight: "bold" }}
                >
                    {" "}
                    SEND
                </Button> */}
            </div>

            <div
                style={{
                    textAlign: "center",
                    display: "flex",
                    width: "60%",
                    marginLeft: "5.44%",
                    paddingTop: 20,
                    justifyContent: "space-around",
                }}
            >
                <span
                    style={{
                        color: "white",
                        width: "calc(50rem + 1vw)",
                        fontSize: "calc(8px + 1vw)",
                        fontWeight: "bold",
                        position: "relative",
                        top: "0.2vw",
                        left: "1.33vw",
                    }}
                >
                    Your REFFERAL Link
                </span>
                <TextField
                    value={referralLink}
                    variant="outlined"
                    size="small"
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <FaCopy
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            referralLink
                                        );
                                    }}
                                    style={{ cursor: "pointer" }}
                                    color="#0F155A"
                                />
                            </InputAdornment>
                        ),
                    }}
                    style={{
                        width: "527.5px",
                        minWidth: 90,
                        maxWidth: "550px",
                        color: "white",
                        position: "relative",
                        left: "0.22vw",
                        borderRadius: 5,
                        height: 40,

                        // backgroundColor: "white",
                    }}
                    sx={{ backgroundColor: "white" }}
                ></TextField>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "1vw",
                    paddingTop: 80,
                    marginRight: "10%",
                    paddingBottom: 0,
                }}
            >
                <span
                    style={{
                        fontSize: "calc(5px + 1vw)",
                        fontWeight: "bold",
                        color: "white",
                        marginRight: "5vw",
                        height: "50px",
                        position: "relative",
                        left: "0.9vw",
                    }}
                >
                    Current Reward total for each <br></br>member joining
                    through link
                </span>
                <span
                    style={{
                        fontSize: "calc(14px + 2vw)",
                        fontWeight: "bold",
                        color: "white",
                        marginRight: 15,
                    }}
                >
                    ${currentRefferalAmount}
                </span>
            </div>

            <div
                className="Images"
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: "auto",
                }}
            >
                <a style={{}}>
                    <img
                        src="group 263.png"
                        style={{
                            // width: "127px",
                            // maxheight: "108px",
                            maxWidth: "calc(17px + 8.5vw)",
                            position: "absolute",
                            left: "4vw",
                            bottom: "0vw",
                        }}
                    ></img>
                </a>

                <a style={{}}>
                    <img
                        src="noun-205.png"
                        style={{
                            maxWidth: "calc(25px + 8.5vw)",
                            position: "absolute",
                            left: "27vw",
                            bottom: 0,
                        }}
                    ></img>
                </a>
                <a style={{}}>
                    <img
                        src="noun-105.png"
                        style={{
                            maxWidth: "calc(17px + 8.5vw)",
                            position: "absolute",
                            bottom: 0,
                            left: "40vw",
                        }}
                    ></img>
                </a>
                <a>
                    <img
                        src="noun-346.png"
                        style={{
                            maxWidth: "calc(20px + 9vw)",
                            position: "absolute",
                            bottom: 0,
                            right: "15vw",
                        }}
                    ></img>
                </a>
                <a style={{}}>
                    <img
                        src="noun-227.png"
                        style={{
                            maxWidth: "calc(19px + 7vw)",
                            position: "absolute",
                            right: "5vw",
                            bottom: 0,
                        }}
                    ></img>
                </a>
            </div>
        </div>
    );
}

export default Referral;
