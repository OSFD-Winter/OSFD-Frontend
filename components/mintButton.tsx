import { Button } from "@mui/material";
import GoodsAbi from "../src/Goods.json";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../src/web3ReactInjector";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

interface IMint {
  address: string;
  price: string;
  design: string;
}

const neoStyling = {
  bgcolor: "#FFCB7C",
  color: "black",
  border: "1px solid black",
  fontFamily: "Montserrat",
  boxShadow: "1px 1px 0px #000000",
  padding: ".5rem 2rem",
  maxWidth: "200px",
  "&:hover": {
    color: "white",
  },
} as const;

const defaultStyling = {
  width: "100%",
  height: "fit-content",
};

function MintButton({ address, price, design }: IMint) {
  const { active, activate, account, library } = useWeb3React();
  const [pendingMint, setPendingMint] = useState(false);
  const styles = design === "default" ? defaultStyling : neoStyling;
  const stylesVariant: any = design === "default" ? "text" : "contained";

  const mint = useCallback(
    async function () {
      if (!library) {
        activate(injected);
        setPendingMint(true);
        return;
      }
      const signer = library.getSigner(account).connectUnchecked();
      const contract = new Contract(address, GoodsAbi, signer);

      try {
        const mintInitResult = await contract.mintGoods(1, {
          value: price,
        });

        console.log(mintInitResult);

        const receipt = await mintInitResult.wait();

        console.log(receipt);

        const mintedTokenId = parseInt(receipt.logs[0].topics[3], 16);

        console.log((await contract.baseURI()) + mintedTokenId);
      } catch (error: any) {
        toast.error("Failed to mint: " + JSON.stringify(error));
        console.log("Failed to mint: ", error);
      }
    },
    [account, activate, address, library, price]
  );
  useEffect(() => {
    if (library && pendingMint) {
      mint();
      setPendingMint(false);
    }
  }, [library, mint, pendingMint]);

  return (
    <Button
      onClick={() => {
        mint();
      }}
      variant={stylesVariant}
      sx={styles}
    >
      Mint
    </Button>
  );
}

export default MintButton;
