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
    Paper
} from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";

import { FC, useCallback, useEffect, useState } from "react";
import axios from 'axios';


const Sandbox: NextPage = () => {
    const [uploading, setUploading] = useState(false);
    const [zip, setZip] = useState("");
    const [preview, setPreview] = useState("");
    const [message, setMessage] = useState("");

    async function upload() {
        if (uploading) {
            return;
        }

        setUploading(true)

        const fileInput = document.querySelector('input[type="file"]')
        console.log(fileInput)
        console.log(fileInput.files)


        var formData = new FormData();

        formData.append("file", fileInput.files[0]);

        axios.post(
            'http://localhost:8000/tokens/zip',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
            .then(({ data }) => {
                console.log(data.zipName)
                setZip(data.zipName)
                setMessage("")
                console.log('SUCCESS!!');
            })
            .catch(({ response }) => {
                setMessage(response.data)
            })
            .finally(
                () => {
                    setUploading(false)
                })
    }

    useEffect(() => {
        if (zip) {
            axios.get('http://localhost:8000/tokens/preview/' + zip)
                .then(function ({ data }) {
                    console.log(data)
                    setPreview(data);
                })
                .catch(({ response }) => {
                    setMessage(response.data)
                })
        }
    }, [zip]);

    return (
        <Box sx={{ height: "100%", marginTop: 20, border: "4px solid black" }}>
            <div style={{ marginBlock: 20, fontSize: 30, display: "flex", justifyContent: "center", fontWeight: "bold", color: "#19217b" }}>
                Builder Sandbox
            </div>

            <div style={{ display: "flex", justifyContent: "center", textAlign: "center", fontSize: "1.2em", fontWeight: "500" }}>
                <div>
                    Builder Sandbox is designed for testing your generative art.
                    <br></br>
                    <div>
                        Sandbox takes the zip file you created as input then returns randomly generated image. &nbsp;
                        <a style={{ color: "darkblue" }} href="https://bafybeich73zpd2fa5wrmnesxgtjgkqc6swavca6yeig2uhfk4xbwgmaqta.ipfs.w3s.link/">Here</a> is an example zip file
                    </div>

                    <br></br>

                    <div>
                        First you need to start thinking with "layers". &nbsp;
                        <a style={{ color: "darkblue" }} href="https://edition.async.art/blog/generative-art-nfts-an-artists-guide">Here</a> is link for a good read
                    </div>

                    <br></br>
                    To create the zip file you need a parent folder which will contain all the subfolders for each layer
                    <br></br>
                    In example zip our parent folder name is "Poster" and subfolders for layers are "00-bg", "01-title", "02-leftnoun" ...
                    <br></br>
                    As you can notice subfolder names have numbers as prefix, it is for layer composing order; lowest number means backmost layer
                    <br></br>
                    It uses alphabetical order thus using numbers optional
                    <br></br>
                    When you upload the zip file composer will randomly select single image from each layer and return the composed image
                    <br></br>
                    <br></br>

                    <br></br>
                    Sandbox <b> only </b> supports <b>.png & .jpg </b> files and your zip should only contains those
                    <br></br>
                    If you keep getting errors feel free to mail your zip and error message to
                    <br></br>
                    <b style={{ color: "darkblue" }}>x+1203246502370008@mail.asana.com</b>
                    <br></br>
                    <br></br>
                </div>
            </div>

            <Box style={{ height: 100, display: "flex", justifyContent: "center", padding: 10, alignItems: "center" }}>
                <Input type="file" />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={upload} style={{ height: 35 }}>{uploading ? <img src={"./spinner.svg"} height="100%"></img> : "upload"} </Button>
                </Box>
            </Box>

            {!message &&
                <Box>
                    <Box style={{ display: "flex", justifyContent: "center", padding: 10 }}>
                        {preview &&
                            <div>
                                <div >
                                    <img key={preview.image} src={preview.image} style={{ maxHeight: "70vh" }}></img>
                                </div>
                            </div>
                        }
                    </Box>
                    {preview && <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={() => {
                            if (zip) {
                                axios.get('http://localhost:8000/tokens/preview/' + zip)
                                    .then(function ({ data }) {
                                        console.log(data)
                                        setPreview(data);
                                        setMessage("")
                                    })
                                    .catch(function ({ response }) {
                                        setMessage(response.data)
                                        console.log('FAILURE!!');
                                    })
                            }
                        }} style={{ height: 35 }}>Variation </Button>
                    </Box>
                    }
                </Box>}

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                {message}
            </Box>


        </Box >
    );
};

export default Sandbox;
