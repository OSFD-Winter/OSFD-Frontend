import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button, IconButton, TextField } from "@mui/material";
import { CasinoOutlined } from "@mui/icons-material";

import { SERVER } from "../utils/constants";
import Image from "next/image";

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
      .then(({ data, status }) => {
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
      <Image src={image} width="0" height="0" sizes="20vw" className="w-full h-auto" alt="" />
      <Button
        onClick={() => {
          setImage("/spinner.svg");
          getImage();
        }}
        style={{
          width: "fit-content",
          height: "fit-content",
        }}
      >
        Generate <CasinoOutlined />
      </Button>
    </div>
  );
}

export default MintPreview;
