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
        const weiBalance = resp.data.result;
        const weiConversion = 1000000000000000000;

        const tempBalance = weiBalance / weiConversion;
        setBalance(tempBalance.toFixed(5));
    }
    return (
        <Paper
            elevation={3}
            style={{
                fontSize: "1.75rem",
                width: "30vh",
                textAlign: "center",
                margin: ".5em auto",
            }}
        >
            Current Balance: <br />
            <span>{balance} ETH</span>
        </Paper>
    );
}

export default TreasuryDisplay;
