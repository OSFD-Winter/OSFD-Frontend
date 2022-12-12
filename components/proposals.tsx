// @ts-nocheck
import snapshot from "@snapshot-labs/snapshot.js";
import { useState, useEffect } from "react";
import { getProposals, toDateTime } from "../api/helper";
import { SOURCE } from "../utils/constants";
import { Button } from "@mui/material";

const proposalsStyle = {
  border: "1px solid black",
  fontFamily: "Montserrat",
  boxShadow: "2px 2px 0px #000000",
  padding: "1rem",
} as const;
function Proposals({ space }) {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    getProposals(space, "active", `${SOURCE}/graphql`)
      .then((proposals) => setProposals(proposals))
      .catch((e) => console.log(e));
  }, []);

  // useEffect(async () => {
  //   try {
  //     const proposals = await getProposals(space, "active", `${hub}/graphql`);
  //     setProposals(proposals);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  return (
    <div className={"my-5"}>
      {proposals &&
        proposals.map((proposal) => (
          <div
            key={proposal.id}
            style={{ ...proposalsStyle, backgroundColor: "#8BEC94" }}
            className={"rounded-lg"}
          >
            <b>{proposal.title}</b>
            <p>{proposal.body}</p>
            {proposal.state == "active" && (
              <p style={{ color: "red" }}>Active until {toDateTime(proposal.end)}</p>
            )}
            <div className="flex justify-between gap-2">
              {proposal.choices.map((choice) => (
                <Button
                  variant="contained"
                  key={choice}
                  sx={{
                    ...proposalsStyle,
                    height: "40px",
                    width: "120px",
                    bgcolor: "#FFF",
                    color: "black",
                  }}
                  onClick={() => console.log(choice)} //vote(id, proposal.id)}
                >
                  {choice}
                </Button>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Proposals;
