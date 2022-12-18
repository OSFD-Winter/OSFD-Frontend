// @ts-nocheck
import {
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  Input,
  TextField,
  Paper,
  FileInput,
} from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";

import { FC, useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import { SANDBOX } from "../utils/constants";
import { red } from "@mui/material/colors";
import { FaUnderline } from "react-icons/fa";
import Navbar from "../components/navbar";
import Feedback from "../components/feedback";
import Footer from "../components/footer";
/* eslint-disable @next/next/no-img-element */

const Sandbox: NextPage = () => {
  const [uploading, setUploading] = useState(false);
  const [zip, setZip] = useState("");
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const refFeedback = useRef();

  async function upload() {
    if (uploading) {
      return;
    }

    setUploading(true);

    const fileInput = document.querySelector('input[type="file"]');
    console.log(fileInput);
    console.log(fileInput.files);

    var formData = new FormData();

    formData.append("file", fileInput.files[0]);

    axios
      .post(`${SANDBOX}/tokens/zip`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        console.log(data.zipName);
        setZip(data.zipName);
        setMessage("");
        console.log("SUCCESS!!");
      })
      .catch(({ response }) => {
        setMessage(response.data);
      })
      .finally(() => {
        setUploading(false);
      });
  }

  async function getFile() {
    // query read input
    //const upload = document.getElementById("upload_file")
    var upload = document.querySelector('input[type="file"]');
    // get textbox dom.
    var doc = document.getElementById("doc");
    // filename
    var fileName = upload.files[0] ? upload.files[0].name : " ";
    // fileaddress
    var filePath = upload.value;
    // load name into textbox
    doc.value = fileName;
    console.log(fileName);
    console.log(filePath);
  }

  // waiting for function
  async function cancel_zip() {}
  // waiting for function
  async function create_NFT() {}

  useEffect(() => {
    if (zip) {
      axios
        .get(`${SANDBOX}/tokens/preview/` + zip)
        .then(function ({ data }) {
          console.log(data);
          setPreview(data);
        })
        .catch(({ response }) => {
          setMessage(response.data);
        });
    }
  }, [zip]);

  return (
    <Box sx={{ height: "100%" }}>
      <Navbar refFeedback={refFeedback} />

      <div
        style={{
          marginBlock: 20,
          fontSize: 30,
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          color: "#19217b",
        }}
      >
        Builder Sandbox Instruction
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "Left",
          fontSize: "1.2em",
          fontWeight: "500",
        }}
      >
        <div>
          Builder Sandbox is designed for testing your generative art.
          <br></br>
          <div>
            Sandbox takes the zip file you created as input then returns randomly generated image.
            &nbsp;
          </div>
          <div>
            <a
              style={{ color: "darkblue", textDecoration: "underline darkblue" }}
              href="https://bafybeich73zpd2fa5wrmnesxgtjgkqc6swavca6yeig2uhfk4xbwgmaqta.ipfs.w3s.link/"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="text">Here</Button>
            </a>
            is an example zip file
          </div>
          <br></br>
          <div>
            First you need to start thinking with &quot;layers&quot;. &nbsp;
            <a
              style={{ color: "darkblue", textDecoration: "underline darkblue" }}
              href="https://edition.async.art/blog/generative-art-nfts-an-artists-guide"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="text">Here</Button>
            </a>{" "}
            is link for a good read
          </div>
          <br></br>
          To create the zip file you need a parent folder which will contain all the subfolders for
          each layer
          <br></br>
          In example zip our parent folder name is &quot;Poster&quot; and subfolders for layers are
          &quot;00-bg&quot;, &quot;01-title&quot;, &quot;02-leftnoun&quot; ...
          <br></br>
          <div style={{ display: "flex", justifyContent: "center", marginBlock: "20px" }}>
            <img
              className="Folder Structure"
              alt="Folder_Structure"
              src="./Sandbox Components/Folder Structure.svg"
            />
          </div>
          As you can notice subfolder names have numbers as prefix, it is for layer composing order;
          lowest number
          <br></br>
          means backmost layer It uses alphabetical order thus using numbers optional. When you
          upload the zip file
          <br></br>
          composer will randomly select single image from each layer and return the composed image
          Sandbox only
          <br></br>
          supports <b>.png & .jpg</b> files and your zip should only contains those.
          <br></br>
          <br></br>
          If you keep getting errors feel free to mail your zip and error message to
          <br></br>
          <b style={{ color: "darkblue" }}>tox+1203246502370008@mail.asana.com</b>
          <br></br>
          <br></br>
        </div>
      </div>

      <Box
        style={{
          height: 100,
          display: "flex",
          justifyContent: "center",
          padding: 10,
          alignItems: "center",
          color: "grey",
        }}
      >
        <Button component="label" onsubmit="return checksubmit()" onClick={getFile}>
          <img alt="Choose_File_Buttton" src="./Sandbox Components/Choose File Button.svg" />
          <Input type="file" id="upload_file" style={{ opacity: 0, marginLeft: -60, width: 75 }} />
          <input
            type="text"
            style={{
              height: 50,
              display: "flex",
              fontSize: 25,
              border: "1px solid",
              marginLeft: 20,
            }}
            id="doc"
          ></input>
        </Button>

        <Box sx={{ display: "flex", justifyContent: "center", marginLeft: 5 }}>
          <Button onClick={upload} style={{ height: 35 }}>
            {uploading ? (
              <CircularProgress />
            ) : (
              <img alt="Upload_Button" src="./Sandbox Components/Upload Button.svg" />
            )}
          </Button>
        </Box>
      </Box>

      {!message && (
        <Box>
          <Box style={{ display: "flex", justifyContent: "center", padding: 10 }}>
            {preview && (
              <div>
                <div>
                  <img key={preview.image} src={preview.image} style={{ maxHeight: "70vh" }}></img>
                </div>
              </div>
            )}
          </Box>
          {preview && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => {
                  if (zip) {
                    axios
                      .get(`${SANDBOX}/tokens/preview/` + zip)
                      .then(function ({ data }) {
                        console.log(data);
                        setPreview(data);
                        setMessage("");
                      })
                      .catch(function ({ response }) {
                        setMessage(response.data);
                        console.log("FAILURE!!");
                      });
                  }
                }}
                style={{ height: 35 }}
              >
                Variation{" "}
              </Button>
            </Box>
          )}

          {preview && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={cancel_zip} style={{ height: 35, marginRight: 60 }}>
                <img alt="Cancel_Button" src="./Sandbox Components/Cancel Button.svg" />
              </Button>

              <Button onClick={create_NFT} style={{ height: 35, marginLeft: 60 }}>
                <img alt="Create_Button" src="./Sandbox Components/Create Button.svg" />
              </Button>
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>{message}</Box>

      <div ref={refFeedback} style={{ marginTop: 100 }}>
        <Feedback></Feedback>
      </div>

      <Footer gradient={"bg-gradient-to-r from-blue-1000 to-blue-50 relative text-white w-full"} />
    </Box>
  );
};

export default Sandbox;
