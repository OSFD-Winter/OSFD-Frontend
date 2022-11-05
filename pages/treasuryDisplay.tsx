import { Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type displayProps = {
    safeAddress: string;
};

function TreasuryDisplay({ safeAddress }: displayProps) {
    const apiPlaceholder = "";
    const API_URL = `https://api-goerli.etherscan.io/api?module=account&action=balance&address=${safeAddress}&tag=latest&apikey=${apiPlaceholder}`;
    const [balance, setBalance] = useState("");
    useEffect(() => {
        getBalance();
    }, []);
    async function getBalance() {
        const resp = await axios.get(API_URL);
        setBalance(resp.data.balance);
    }
    return (
        <Paper
            elevation={3}
            style={{
                fontSize: "1.75rem",
                width: "20vh",
                textAlign: "center",
                margin: ".5em auto",
            }}
        >
            {balance}$112.5
        </Paper>
    );
}

export default TreasuryDisplay;
