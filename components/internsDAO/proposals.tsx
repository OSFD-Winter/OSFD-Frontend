// @ts-nocheck
import snapshot from "@snapshot-labs/snapshot.js";
import { useState, useEffect } from "react";

function Proposals() {
  const [proposals, setProposals] = useState([]);
  const space = "internsdao.eth";

  ///-----Taking from https://docs.snapshot.org/snapshot.js-----////

  // const hub = "https://testnet.snapshot.org";
  // const client = new snapshot.Client712(hub);
  // const vote = async (option, proposal) => {
  //   const { account } = context;
  //   const receipt = await client.vote(context, account, {
  //     space: space,
  //     proposal: proposal,
  //     type: "single-choice",
  //     choice: option,
  //   });
  // };

  useEffect(() => {
    fetch("https://testnet.snapshot.org/graphql", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `query Proposals {
        proposals(
          first: 20,
          skip: 0,
          where: {
            space_in: ["${space}"],
            state: "active"
          },
          orderBy: "created",
          orderDirection: desc
        ) {
          id
          title
          body
          choices
          start
          end
          snapshot
          state
          author
          space {
            id
            name
          }
        }
      }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => setProposals(data.data.proposals))
      .catch((err) => console.log(err));
    // console.log(proposals);
  }, []);

  return (
    <div>
      {proposals &&
        proposals.map((proposal) => (
          <div style={proposalsStyle}>
            <h1>{proposal.title}</h1>
            <p>{proposal.body}</p>
            {proposal.choices.map((choice, id) => (
              <button
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
