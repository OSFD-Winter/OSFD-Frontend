// @ts-nocheck
import snapshot from "@snapshot-labs/snapshot.js";
import { useState, useEffect } from "react";
import { getProposals, toDateTime } from "../api/helper";

import { SOURCE } from "../utils/constants";

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
    <div>
      {proposals &&
        proposals.map((proposal) => (
          <div key={proposal.id} style={proposalsStyle}>
            <h1>{proposal.title}</h1>
            <p>{proposal.body}</p>
            {proposal.state == "active" && (
              <p style={{ color: "red" }}>Active until {toDateTime(proposal.end)}</p>
            )}
            {proposal.choices.map((choice) => (
              <button
                key={choice}
                style={{ ...proposalsStyle, height: "40px", width: "120px" }}
                onClick={() => console.log(choice)} //vote(id, proposal.id)}
              >
                {choice}
              </button>
            ))}
          </div>
        ))}
    </div>
  );
}

const proposalsStyle = { margin: "20px" };

export default Proposals;
