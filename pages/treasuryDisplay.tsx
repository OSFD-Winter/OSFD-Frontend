import axios from "axios";
import { useEffect, useState } from "react";

type displayProps = {
    safeAddress: string;
};

// API docs: https://safe-transaction-mainnet.safe.global/   
const API_BASE_URL = "safe-transaction-mainnet.safe.global/api";

function TreasuryDisplay({ safeAddress }: displayProps) {
    const [balance, setBalance] = useState("");
    useEffect(() => {
        getBalance();
    }, []);
    async function getBalance() {
        const resp = await axios.get(
            `${API_BASE_URL}/v1/safes/${safeAddress}/balances/`
        );
        setBalance(resp.data.balance);
    }
    // Temporarily store in div
    return <div>{balance}</div>;
}

export default TreasuryDisplay;
