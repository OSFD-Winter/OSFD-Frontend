// @ts-nocheck
import { storage } from "../../src/firebase_images";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState, useRef } from "react";
import { Button, TextField, Paper, Box, Input, IconButton, DialogContent } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { v4 } from "uuid";
import spinnerImage from "../public/spinner.svg";
import { ToastContainer, toast } from "react-toastify";
import { SERVER } from "../utils/constants";

const neoBorder = {
  border: "1px solid black",
  fontFamily: "Montserrat",
  boxShadow: "1px 1px 0px #000000",
} as const;

function InternsFeedback({ hash: any }) {
  const discordWebhookUrl =
    "https://discord.com/api/webhooks/1048923636565807134/KVnUHflpU5XeSMxmFQrLSgwa9ENpVptyH6QMw1qI3sCsLQA6MLDnaNHKEJjAlwzD1b9b";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [sent, setSent] = useState(false);
  const [url, seturl] = useState("NA");
  const [uploading, setUploading] = useState(false);
  const stopRender = useRef(true);
  let update = 1;

  // handle image upload
  const uploadImage = (image) => {
    if (!image) return;
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
      <div className="mx-auto p-24">
        {!sent && (
          <div className="flex flex-col gap-2 ">
            <h2 className="text-white text-3xl font-bold">FEEDBACK</h2>
            <div className="flex gap-2">
              <TextField
                variant="outlined"
                placeholder="Title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                fullWidth
                sx={neoBorder}
                className="bg-white rounded-lg"
              />
              <TextField
                id="outlined-name"
                placeholder="E-mail"
                variant="outlined"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                fullWidth
                multiline
                rows={1}
                sx={neoBorder}
                className="bg-white rounded-lg"
              />
            </div>
            <TextField
              id="outlined-name"
              placeholder="Description"
              variant="outlined"
              value={desc}
              onChange={(event) => {
                setDesc(event.target.value);
              }}
              fullWidth
              multiline
              rows={3}
              sx={neoBorder}
              className="bg-white rounded-lg"
            />
            <div>
              <Box className="flex items-center gap-4">
                <label htmlFor="input_img">
                  <Input
                    sx={{ display: "none" }}
                    accept="image/*"
                    id="input_img"
                    type="file"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                      uploadImage(event.target.files[0]);
                      console.log(event.target.files[0]);
                    }}
                  />
                  <Button
                    sx={{
                      ...neoBorder,
                      color: "black",
                      bgcolor: "#FFF48F",
                    }}
                    variant="contained"
                    component="span"
                    endIcon={<CloudUploadOutlinedIcon />}
                  >
                    Attach Files
                  </Button>
                </label>
                {image && (
                  <div>
                    {uploading && url !== "NA" ? (
                      <img
                        src="https://logosbynick.com/wp-content/uploads/2021/01/animated-gif.gif"
                        alt=""
                        height="30px"
                        width="30px"
                      />
                    ) : (
                      <p>Image Uploaded</p>
                    )}
                  </div>
                )}
                <Button
                  disabled={sent || title === "" || desc === "" || email === ""}
                  // push to discord using webhooks
                  onClick={() => {
                    stopRender.current = false;
                    pushToDiscord();
                  }}
                  variant="contained"
                  sx={{ ...neoBorder, bgcolor: "#4277FF", color: "white !IMPORTANT" }}
                >
                  Send
                </Button>
              </Box>
            </div>
          </div>
        )}
        {sent && (
          <Paper
            sx={{
              ...neoBorder,

              bgcolor: "#4277FF",
              color: "white !IMPORTANT",
              width: "10vw",
              textAlign: "center",
              margin: "0 auto",
            }}
            elevation={3}
          >
            Received!
          </Paper>
        )}
      </div>
    </div>
  );
}

export default InternsFeedback;
