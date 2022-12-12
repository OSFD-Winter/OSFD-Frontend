// @ts-nocheck
import { storage } from "../../src/firebase_images";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState, useRef } from "react";
import { Button, TextField, Paper, Box, Input, IconButton } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { v4 } from "uuid";
import spinnerImage from "../public/spinner.svg";
import { ToastContainer, toast } from "react-toastify";
import { SERVER } from "../utils/constants";

function InternsFeedback({ hash: any }) {
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
        toast.success("Image Uploaded");
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
    <div style={{ backgroundColor: "rgba(24, 24, 24, 0.4)" }} className="w-full">
      <div className="mx-auto w-4/5">
        {!sent && (
          <div className="flex flex-col gap-2 ">
            <h2 className="text-white text-3xl font-bold">FEEDBACK</h2>
            <div className="flex gap-2">
              <TextField
                variant="outlined"
                label="Title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                fullWidth
                className="bg-white rounded-lg"
              />
              <TextField
                id="outlined-name"
                label="E-mail"
                variant="outlined"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                fullWidth
                multiline
                rows={1}
                className="bg-white rounded-lg"
              />
            </div>
            <TextField
              id="outlined-name"
              label="Description"
              variant="outlined"
              value={desc}
              onChange={(event) => {
                setDesc(event.target.value);
              }}
              fullWidth
              multiline
              rows={3}
              className="bg-white rounded-lg"
            />
            <div>
              {url === "NA" ? (
                <Box>
                  {/* <Input
                    type="file"
                    name="file"
                    id="input_img"
                    accept="image/*"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                  /> */}
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="raised-button-file">
                    <IconButton  component="span">
                      Attach Files
                      <CloudUploadOutlinedIcon />
                    </IconButton>
                  </label>
                  <Box>
                    <Button onClick={uploadImage}>
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
          </div>
        )}
        <Button
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
    </div>
  );
}

export default InternsFeedback;
