import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer";
import GitHubIcon from "@mui/icons-material/GitHub";

const Version = () => {
  const [commits, setCommits] = useState([]);

  // Send toastify notifications if new commits are added
  const notifyNewCommits = (incomingData: any, localData: any) => {
    const oldCommits = [];
    for (let i = 0; i < localData.length; i++) {
      for (let z = 0; z < incomingData.length; z++) {
        if (localData[i].sha === incomingData[z].sha) {
          oldCommits.push(localData[i]);
        }
      }
    }

    toast(`${15 - oldCommits.length} new commits
      `);
  };
  //Get Data from Github commits page

  // Load older commits
  const [commitCount, changeCount] = useState(15);
  const loadMoreCommits = () => {
    changeCount(commitCount + 15);
  };

  useEffect(() => {
    const octokit = new Octokit({
      auth: process.env.GITHUB_API_TOKEN,
    });

    const sendRequest = async (commitCount: any) => {
      const owner = "OSFD-Winter",
        repo = "OSFD-Frontend",
        per_page = commitCount;

      const mostRecentCommits = await octokit.request(`GET /repos/{owner}/{repo}/commits`, {
        owner,
        repo,
        per_page,
      });
      //1st load
      if (localStorage.getItem("data") === null) {
        localStorage.setItem("data", JSON.stringify(mostRecentCommits.data));
        // disable new commit notification when old commits are getting loaded
      } else if (mostRecentCommits.data.length === 15) {
        let localArray = JSON.parse(localStorage.getItem("data"));
        notifyNewCommits(mostRecentCommits.data, localArray);
        localStorage.setItem("data", JSON.stringify(mostRecentCommits.data));
      }

      setCommits(mostRecentCommits.data);
    };

    sendRequest(commitCount);
    setInterval(() => sendRequest(commitCount), 200000);
  }, [commitCount]);

  const [box, showBox] = useState("h-10");
  const [clickCount, IncreaseCount] = useState(0);

  const showFullInfo = () => {
    IncreaseCount(clickCount + 1);
    console.log(clickCount);
    if (clickCount === 0) {
      showBox("h-60");
    } else if (clickCount === 1) {
      showBox("h-10");
    } else if (clickCount % 2 === 0) {
      showBox("h-60");
    } else {
      showBox("h-10");
    }
  };

  return (
    <div>
      <div className="navbar  text-black w-full   ">
        <div className="p-6 border-b-2">
          <h1 className="text-4xl text-black font-bold text-center">Version v1.0</h1>
        </div>
      </div>

      <ul className="flex flex-wrap  justify-center w-9/12 m-auto mt-8 	">
        {commits.map((index) => {
          return (
            <div
              className={
                box +
                " flex-col items-center justify-center	 m-auto w-9/12  overflow-hidden border-b-2 mt-4  cursor-pointer transition-all duration-500  "
              }
              key={index.sha}
            >
              <div
                className="flex flex-row justify-between hover:text-zinc-600 "
                onClick={() => showFullInfo()}
              >
                <div className="font-bold text-3xl">
                  <h2> {index.commit.author.name}</h2>
                </div>
                <div>
                  <h2 className="font-bold text-32l">
                    {" "}
                    {index.commit.author.date.split("T", 1)}/{" "}
                    {index.commit.author.date.split("T").pop().split("Z", 1)}
                  </h2>
                </div>
              </div>
              <div className="p-2 flex flex-row    m-3 h-58 w-full	items-center ">
                <div className="w-40 m-2 h-42">
                  <img src={index.author.avatar_url}></img>
                </div>
                <ul>
                  <li>
                    <p>
                      <strong>Message:</strong> {index.commit.message}
                    </p>
                  </li>
                  <li>
                    {" "}
                    <strong>Merged: </strong>
                    {(() => {
                      switch (index.commit.verification.verified) {
                        case true:
                          return "✅";
                        case false:
                          return "❌";
                        default:
                          return "pending";
                      }
                    })()}
                  </li>
                  <li>
                    <a href={index.html_url}>
                      <GitHubIcon className="text-black" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </ul>
      <ToastContainer progressStyle={{ background: "black" }} />

      <div className="w-full flex justify-center mt-8 underline-offset-2">
        <button
          className="w-28 h-20  text-black font-bold border-2"
          onClick={() => loadMoreCommits()}
        >
          {"Load More"}
        </button>
      </div>
      <Footer
        gradient={
          " bg-gradient-to-r from-blue-1000 to-blue-50 relative text-white w-full mt-[50px]"
        }
      />
    </div>
  );
};

export default Version;
