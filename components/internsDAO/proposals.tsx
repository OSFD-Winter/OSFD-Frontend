// @ts-nocheck
import snapshot from "@snapshot-labs/snapshot.js";
import { useState, useEffect } from "react";
import { getProposals } from "../../api/helper";

function Proposals() {
  const [proposals, setProposals] = useState([]);
  const space = "internsdao.eth";
  const source = "https://testnet.snapshot.org";
  useEffect(() => {
    getProposals(space, "active", `${source}/graphql`)
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
