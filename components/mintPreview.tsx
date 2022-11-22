// @ts-nocheck
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button, IconButton, TextField } from "@mui/material";
import { CasinoOutlined } from "@mui/icons-material";

import { SERVER } from "../utils/constants"

function MintPreview({ hash }) {
  const [image, setImage] = useState("./spinner.svg");

  useEffect(() => {
    axios
      .get(`${SERVER}/tokens/tokenPreview/${hash}`)
      .then(({ data, status }) => {
        setImage(data.image);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response");
        }
      });
  }, [hash]);

  return (
    <div>
      <img src={image} style={{ width: "100%" }}></img>
      <Button
        onClick={() => {
          setImage("./spinner.svg");
          axios
            .get(
              `${SERVER}/tokens/tokenPreview/${hash}`
            )
            .then(({ data, status }) => {
              setImage(data.image);
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                console.log("error.response");
              }
            });
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
