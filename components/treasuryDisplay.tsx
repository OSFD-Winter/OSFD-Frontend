import { Paper } from "@mui/material";
import axios from "axios";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";

type displayProps = {
  safeAddress: string;
};

//const API_BASE_URL = "https://api-goerli.etherscan.io/";
const API_BASE_URL = "https://api.etherscan.io/";

function TreasuryDisplay({ safeAddress }: displayProps) {
  const apiPlaceholder = "5V84IP6PWKTS51SNIPDNUNURIBU74ERPBK";
  const [balance, setBalance] = useState("");
  useEffect(() => {
    getBalance();
  }, []);
  async function getBalance() {
    const resp = await axios.get(
      `${API_BASE_URL}api?module=account&action=balance&address=${safeAddress}&tag=latest&apikey=${apiPlaceholder}`
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
        width: "30vw",
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
