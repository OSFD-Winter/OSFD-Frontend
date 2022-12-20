import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Zoom } from "@mui/material";
import { CasinoOutlined } from "@mui/icons-material";

import { SERVER } from "../utils/constants";

interface IHash {
  hash: string;
  design: string;
}

interface IPreview {
  name: string;
  image: string;
}

const neoStyling = {
  bgcolor: "#FF8DC4",
  color: "black",
  border: "1px solid black",
  fontFamily: "Montserrat",
  boxShadow: "1px 1px 0px #000000",
  width: "100%",
  marginTop: "10px",
  "&:hover": {
    color: "white",
  },
} as const;

const defaultStyling = {
  width: "100%",
  height: "fit-content",
};

function MintPreview({ hash, design }: IHash) {
  const styles = design === "default" ? defaultStyling : neoStyling;
  const stylesVariant: any = design === "default" ? "text" : "contained";
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
      <Zoom in={true}>
        <img className="w-full" src={image} alt="" />
      </Zoom>

      <Button
        onClick={() => {
          setImage("/spinner.svg");
          getImage();
        }}
        variant={stylesVariant}
        sx={styles}
      >
        Generate <CasinoOutlined />
      </Button>
    </div>
  );
}

export default MintPreview;
