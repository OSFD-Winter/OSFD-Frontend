import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { FaCopy } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useReducerContext } from "../api/context";

const API_BASE_URL = "https://api.coinbase.com/v2/prices/";

function Referral() {
  const [referrer, setReferrer] = useState("");
  const [referralLink, setReferralLink] = useState(
    "https://www.teamnouns.xyz?ref="
  );
  const [currentReferralAmount, setCurrentReferralAmount] = useState(0);
  const { state } = useReducerContext();
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    getReferralRewardAmount();
    const URL = document.URL;
    if (URL.includes("ref=")) {
      // Fill referrer input if URL is referral link
      const tempReferrer = document.URL.split("ref=")[1];
      setReferrer(tempReferrer);
    }
    const tempAddress = state.walletAddress;
    if (tempAddress !== "") {
      setWalletAddress(tempAddress);
      setReferralLink("https://www.teamnouns.xyz?ref=" + tempAddress);
    } else {
      setReferralLink("Connect Your Wallet");
    }
  }, [state]);

  function getReferralRewardAmount() {
    axios
      .get(`${API_BASE_URL}ETH-USD/buy`)
      .then((response) => {
        const price: number = response.data.data.amount;
        setCurrentReferralAmount(price / 2);
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
          display: "flex",
          justifyContent: "center",
          maxWidth: "100%",
          color: "white",
          minWidth: "2rem",
          height: "auto",
          textAlign: "center",
          padding: "50px 10px 10px 10px",
        }}
      >
        {" "}
        <a style={{ width: "13%" }}>
          {" "}
          <img
            src="Group 276.png"
            style={{
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

      <div>
        <div
          className="grid grid-cols-referral-row w-3/5 mx-auto content-center justify-center"
          style={{
            paddingTop: 50,
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "calc(8px + 1vw)",
              fontWeight: "bold",
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
            placeholder="Enter wallet address ex. 0x4ba..."
            style={{
              gridArea: "1 / 2 / 2 / 3",
              minWidth: 100,
              color: "white",
              borderRadius: 5,
              backgroundColor: "white",
              height: 40,
            }}
          ></TextField>
          {/* <Button
                        variant="outlined"
                        size="medium"
                        disabled
                        style={{
                            gridArea: "1 / 3 / 3 / 4",
                            // visibility: "hidden",
                            backgroundColor: "white",
                            minWidth: "45px",
                            fontSize: "calc(10px + 0.3vw)",
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
          className="grid grid-cols-referral-row w-3/5 mx-auto content-center justify-center "
          style={{
            paddingTop: 20,
          }}
        >
          <span
            style={{
              color: "white",
              gridArea: "1 / 1 / 2 / 2",
              fontSize: "calc(8px + 1vw)",
              fontWeight: "bold",
            }}
          >
            Your REFERRAL Link
          </span>
          <TextField
            aria-readonly
            value={referralLink}
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <FaCopy
                    onClick={() => {
                      navigator.clipboard.writeText(referralLink);
                    }}
                    style={{ cursor: "pointer" }}
                    color="#0F155A"
                  />
                </InputAdornment>
              ),
            }}
            style={{
              minWidth: 90,
              maxWidth: "550px",
              color: "white",
              position: "relative",
              borderRadius: 5,
              height: 40,
            }}
            sx={{ backgroundColor: "white" }}
          ></TextField>
        </div>
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
          Current Reward total for each <br></br>member joining through link
        </span>
        <span
          style={{
            fontSize: "calc(14px + 2vw)",
            fontWeight: "bold",
            color: "white",
            marginRight: 15,
          }}
        >
          ${currentReferralAmount}
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
            src="leftNoun.png"
            alt="group 263.png"
            style={{
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
