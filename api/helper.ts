import type { ProposalState } from "./interfaces";

export const getVotes = (space: string, proposalsState: ProposalState): string => {
  return `query Proposals {
    proposals(
      first: 20,
      skip: 0,
      where: {
        space_in: ["${space}"],
        state: "${proposalsState}"
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
  }`;
};

export const getProposals = async (
  space: string,
  proposalsState: ProposalState,
  source: string
): Promise<any> => {
  try {
    const response = await fetch(`${source}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: getVotes(space, proposalsState),
      }),
    });
    const data = await response.json();
    // console.log(await data.json());
    // console.log("data ", data);
    return data.data.proposals;
  } catch (e) {
    console.log(e);
  }
};

export const toDateTime = (secs: number): string => {
  const t = new Date(Date.UTC(1970, 0, 1)); // Epoch
  t.setUTCSeconds(secs);
  return t.toDateString();
};
