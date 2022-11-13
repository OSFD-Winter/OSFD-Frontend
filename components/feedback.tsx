// @ts-nocheck
import { storage } from "../src/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, TextField, Paper, Box, Input } from "@mui/material";
import { v4 } from "uuid";

function Feedback({ hash: any }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [image, setImage] = useState(null);
  const [url, seturl] = useState("");
  let update = 1;

  // handle image upload
  const uploadImage = () => {
    if (image == null) return;

    const address = `images/${image.name + v4()}`;
    const imageRef = ref(storage, address);
    if (update === 1) {
      uploadBytes(imageRef, image).then((response) => {
        getDownloadURL(ref(storage, address)).then((url) => {
          seturl(url);
        });
        alert("Image Uploaded");
        update = update - 1;
      });
    }
  };

  // useEffect(() => {
  //   listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         console.log(url);
  //       })
  //     })
  //   })
  // }, [])

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
          </>
        )}

        <div style={{ display: "flex", justifyContent: "left" }}>
          <Button
            variant="text"
            style={{ height: "3vh", marginTop: "3vh" }}
            component="label"
            onClick={uploadImage}
          >
            Upload Image
            <input
              type="file"
              name="file"
              id="input_img"
              accept="image/*"
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />
          </Button>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              backgroundColor: "#1b2f91",
              color: "white",
              paddingInline: 40,
            }}
            disabled={sent}
            onClick={() => {
              axios
                .post("https://osfd-backup-2.herokuapp.com/tokens/feedback", {
                  feedback: {
                    title: title,
                    description:
                      desc +
                      " EMAIL: " +
                      email +
                      " IMAGE URL: " +
                      url +
                      " COMING FROM: *ADD PAGE HERE TO TRACK FEEDBACK*",
                  },
                })
                .then(() => {
                  setSent(true);
                  setTitle("");
                  setDesc("");
                  setEmail("");
                });
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
