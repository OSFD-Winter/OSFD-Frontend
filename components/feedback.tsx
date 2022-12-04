// @ts-nocheck
import { storage } from "../src/firebase_images";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState, useRef } from "react";
import { Button, TextField, Paper, Box, Input } from "@mui/material";
import { v4 } from "uuid";
import spinnerImage from "../public/spinner.svg";

import { SERVER } from "../utils/constants";

function Feedback({ hash: any }) {
  const discordWebhookUrl =
    "https://discord.com/api/webhooks/1048923636565807134/KVnUHflpU5XeSMxmFQrLSgwa9ENpVptyH6QMw1qI3sCsLQA6MLDnaNHKEJjAlwzD1b9b";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [image, setImage] = useState(null);
  const [url, seturl] = useState("NA");
  const [uploading, setUploading] = useState(false);
  const stopRender = useRef(true);
  let update = 1;

  // handle image upload
  const uploadImage = () => {
    if (image == null) return;
    setUploading(true);
    const address = `images/${image.name + v4()}`;
    const imageRef = ref(storage, address);
    if (update === 1) {
      uploadBytes(imageRef, image).then((response) => {
        getDownloadURL(ref(storage, address)).then((url) => {
          seturl(url);
        });
        alert("Image Uploaded");
        update = update - 1;
        setUploading(false);
      });
    }
  };

  const pushToDiscord = () => {
    if (stopRender.current) {
      return;
    }
    if (email === "" || desc === "" || title === "") {
      setTimeout(() => {}, 4000);
      return;
    }
    const condensedData = "Email: " + email + "\nDescription: " + desc + "\nImage: " + url;
    const message = {
      content: condensedData,
      username: "User Feedback || Title: " + title,
    };
    if (title === "" || desc === "" || email === "") {
      setTimeout(() => {}, 4000);
      return;
    }
    try {
      fetch(discordWebhookUrl + "?wait=true", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(message),
      });
      setTimeout(() => {}, 4000);
    } catch (error) {
      console.log(error);
    }
    setSent(true);
  };

  return (
    <div style={{ width: "100%", paddingInline: "20vw" }}>
      <Paper
        elevation={3}
        style={{
          paddingInline: "10vw",
          backgroundColor: "#f8f8f8",
          paddingBlock: 40,
          color: "#01052a",
        }}
      >
        {!sent && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#01052a",
                fontSize: 40,
              }}
            >
              FEEDBACK
            </div>

            <TextField
              variant="standard"
              label="Title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              style={{ padding: 10 }}
              fullWidth
            />
            <br></br>

            <TextField
              id="outlined-name"
              label="Description"
              variant="standard"
              value={desc}
              onChange={(event) => {
                setDesc(event.target.value);
              }}
              style={{ padding: 10 }}
              fullWidth
              multiline
              rows={3}
            />
            <br></br>
            <TextField
              id="outlined-name"
              label="E-mail"
              variant="standard"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              style={{ padding: 10 }}
              fullWidth
              multiline
              rows={1}
            />
            <br></br>
            <div style={{ display: "flex", justifyContent: "left" }}>
              {url === "NA" ? (
                <Box
                  style={{
                    height: 100,
                    display: "flex",
                    justifyContent: "center",
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <Input
                    type="file"
                    name="file"
                    id="input_img"
                    accept="image/*"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={uploadImage} style={{ height: 35 }}>
                      {uploading === false ? (
                        "upload"
                      ) : (
                        <img
                          src="https://logosbynick.com/wp-content/uploads/2021/01/animated-gif.gif"
                          alt=""
                          height="30px"
                          width="30px"
                        />
                      )}
                    </Button>
                  </Box>
                </Box>
              ) : (
                "Image Uploaded."
              )}
            </div>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              backgroundColor: "#1b2f91",
              color: "white",
              paddingInline: 40,
            }}
            disabled={sent || title === "" || desc === "" || email === ""}
            // push to discord using webhooks
            onClick={() => {
              stopRender.current = false;
              pushToDiscord();
            }}
          >
            {sent ? "Received!" : "Send"}
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Feedback;
