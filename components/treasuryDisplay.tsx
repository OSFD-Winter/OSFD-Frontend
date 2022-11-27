import { Paper } from "@mui/material";
import axios from "axios";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";

import { API_BASE_URL, API_PLACE_HOLDER } from "../utils/constants";

type displayProps = {
  safeAddress: string;
};

function TreasuryDisplay({ safeAddress }: displayProps) {
  const [balance, setBalance] = useState("");
  useEffect(() => {
    getBalance();
  }, []);
  async function getBalance() {
    const resp = await axios.get(
      `${API_BASE_URL}/api?module=account&action=balance&address=${safeAddress}&tag=latest&apikey=${API_PLACE_HOLDER}`
    );
    const weiBalance = resp.data.result;

    const tempBalance = formatEther(weiBalance);
    setBalance(tempBalance);
  }
  return (
    <Paper
      elevation={3}
      style={{
        fontSize: "1.75rem",
        fontWeight: "bold",
        width: "30vw",
        textAlign: "center",
        color: "white",
        margin: ".5em auto",
        borderRadius: "1rem",
        padding: "30px",
        background: "#0b0051",
      }}
    >
      Current Balance:
      <span> {balance} ETH</span>
    </Paper>
  );
}

export default TreasuryDisplay;
