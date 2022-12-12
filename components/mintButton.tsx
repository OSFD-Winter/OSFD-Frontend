import { Button } from "@mui/material";
import GoodsAbi from "../src/Goods.json";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../src/web3ReactInjector";
import { toast } from "react-toastify";

interface IMint {
  address: string;
  price: string;
}

function MintButton({ address, price }: IMint) {
  const { active, activate, account, library } = useWeb3React();

  async function mint() {
    if (!library) {
      activate(injected);
      mint();
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
  }

  return (
    <Button
      onClick={() => {
        mint();
      }}
      style={{
        width: "100%",
        height: "fit-content",
      }}
    >
      Mint
    </Button>
  );
}

export default MintButton;
