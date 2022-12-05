import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { CasinoOutlined } from "@mui/icons-material";

import { SERVER } from "../utils/constants";

interface IHash {
  hash: string;
}

interface IPreview {
  name: string;
  image: string;
}

function MintPreview({ hash }: IHash) {
  const [image, setImage] = useState("/spinner.svg");

  useEffect(() => {
    getImage();
  }, [hash]);
  function getImage() {
    axios
      .get<IPreview>(`${SERVER}/tokens/tokenPreview/${hash}`)
      .then(({ data }) => {
        setImage(data.image);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response");
        }
      });
  }
  return (
    <div>
      <img className="w-full" src={image} alt="" />
      <Button
        onClick={() => {
          setImage("/spinner.svg");
          getImage();
        }}
        style={{
          width: "100%",
          height: "fit-content",
        }}
      >
        Generate <CasinoOutlined />
      </Button>
    </div>
  );
}

export default MintPreview;
