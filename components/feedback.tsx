// @ts-nocheck
import { useEffect, useState } from "react";
import axios from 'axios';
import {
    Button,
    TextField,
    Paper
} from "@mui/material";

function Feedback({ hash }) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    return (
        <div style={{ width: "100%", paddingInline: "20vw" }}>
            <Paper elevation={3} style={{ paddingInline: "10vw", backgroundColor: "#f8f8f8", paddingBlock: 40, color: "#01052a" }}>
                {!sent && <>
                    <div style={{ display: "flex", justifyContent: "center", color: "#01052a", fontSize: 40 }}>
                        FEEDBACK
                    </div>

                    <TextField
                        variant="standard"
                        label="Title"
                        value={title}
                        onChange={(event) => { setTitle(event.target.value); }}
                        style={{ padding: 10 }}
                        fullWidth
                    />
                    <br></br>

                    <TextField
                        id="outlined-name"
                        label="Description"
                        value={desc}
                        onChange={(event) => { setDesc(event.target.value); }}
                        style={{ padding: 10 }}
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <br></br>
                    <TextField
                        id="outlined-name"
                        label="E-mail"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value); }}
                        style={{ padding: 10 }}
                        fullWidth
                        multiline
                        rows={1}
                    />
                    <br></br>
                </>

                }
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        style={{ backgroundColor: "#1b2f91", color: "white", paddingInline: 40 }}
                        disabled={sent}
                        onClick={() => {

                            axios.post(
                                'https://osfd-backup-2.herokuapp.com/tokens/feedback',
                                { feedback: { title: title, description: desc + " email: " + email } }
                            ).then(() => {
                                setSent(true);
                                setTitle("");
                                setDesc("");
                                setEmail("");
                            }
                            )
                        }}
                    >
                        {sent ? "Received!" : "Send"}
                    </Button>

                </div>
            </Paper>
        </div >
    )
}

export default Feedback