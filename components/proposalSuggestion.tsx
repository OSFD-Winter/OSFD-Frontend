import { Box, Button, TextField } from "@mui/material";

const proposalsStyle = {
  border: "1px solid black",
  fontFamily: "Montserrat",
  boxShadow: "2px 2px 0px #000000",
  padding: "1rem",
} as const;

const ProposalSuggestion = () => {
  return (
    <>
      <Box sx={{ ...proposalsStyle, bgcolor: "#8BEC94" }} className="rounded-lg my-5 flex flex-col">
        Any Suggestions?
        <TextField
          id="proposal-suggestions"
          name="suggestions"
          variant="outlined"
          multiline
          rows={6}
          className="bg-white rounded-lg"
        />
      </Box>
      <Button variant="contained" sx={{ ...proposalsStyle, bgcolor: "#FF4D42" }}>
        Submit
      </Button>
    </>
  );
};

export default ProposalSuggestion;
