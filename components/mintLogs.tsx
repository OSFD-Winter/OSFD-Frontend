import React, { useEffect, useState } from "react";
import CSS from "csstype";
import axios from "axios";

import { ETHERSCAN_MAINNET } from "../utils/constants"

type addressProps = {
  address: string;
};

const divStyle: CSS.Properties = {
  // Temp styles to make component scrollable
  overflowX: "auto",
  height: "100px",
  width: "auto",
  fontSize: "14px",
};

const clickableStyle: CSS.Properties = {
  cursor: "pointer",
};

const ETHERSCAN = process.env.ETHERSCAN;

function MintLogs({ address }: addressProps) {
  const [minters, setMinters] = useState([]); // [{mintAddr:String, tokenID:Sting, time:String, hash:String}, ..., {}]

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Redirect to etherscan when the element is clicked
  const handleAddressClick = (address: string) => {
    openInNewTab(`${ETHERSCAN_MAINNET}/address/${address}`);
  };

  const handleIDClick = (hash: string) => {
    openInNewTab(`https://goerli.etherscan.io/tx/${hash}`);
  };

  async function getMinters() {
    try {
      const res = await axios.get(
        `https://api-goerli.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN}`
      );
      let minters = res?.data.result.map(function (transaction: any) {
        return {
          minterAddr: transaction["to"],
          tokenID: transaction["tokenID"],
          time: transaction["timeStamp"],
          hash: transaction["hash"],
        };
      });
      setMinters(minters);
    } catch (err) {
      console.log("MintLogs: Something is wrong with the address");
      console.log(err);
    }
  }

  useEffect(() => {
    getMinters();
  }, []);

  return (
    <div style={divStyle}>
      {/* Reverse the list to make the element just appended comes first */}
      {minters
        ?.slice(0)
        .reverse()
        .map((minter: any) => {
          return (
            <div key={minter.tokenID}>
              <p>
                <span
                  style={clickableStyle}
                  onClick={() => handleAddressClick(minter.minterAddr)}
                >
                  {minter.minterAddr.slice(0, 6)}
                  ...
                  {minter.minterAddr.slice(38, 42)}
                </span>
                <span>&nbsp;minted&nbsp;</span>
                <span
                  style={clickableStyle}
                  onClick={() => handleIDClick(minter.hash)}
                >
                  {minter.tokenID}!
                </span>
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default MintLogs;
