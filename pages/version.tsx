import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer";
import { Button } from "@mui/material";
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
    console.log(process.env.GITHUB_API_TOKEN);

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
    setInterval(() => sendRequest(commitCount), 90000);
  }, [commitCount]);

  return (
    <div>
      <div className="navbar bg-gradient-to-r from-blue-1000 to-blue-50 relative text-white w-full   ">
        <div className="p-6">
          <h1 className="text-4xl text-black font-bold text-center">Version v1.0</h1>
        </div>
      </div>

      <ul className="flex flex-wrap  justify-center w-9/12 m-auto mt-8 	">
        {commits.map((index) => {
          return (
            <ul
              className="flex flex-col bg-gradient-to-r from-[#ff8000] to-[#ffe6cc]  shadow-gray-400 border-gray-300 border-2 m-3 h-56 w-72	items-center rounded-lg	p-1	 hover:border-purple-700 justify-center text-sm"
              key={index.sha}
            >
              <li>
                <strong>Name: </strong>
                {index.commit.author.name}
              </li>
              <li>
                <strong>Message: </strong>
                {index.commit.message}
              </li>
              <li>
                <strong>Date: </strong>
                {index.commit.author.date.split("T", 1)}
              </li>
              <li>
                <strong>Time: </strong>
                {index.commit.author.date.split("T").pop().split("Z", 1)}
              </li>

              <li>
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
                  <GitHubIcon className="text-white" />
                </a>
              </li>
            </ul>
          );
        })}
      </ul>
      <ToastContainer />

      <div className="w-full flex justify-center mt-8">
        <Button
          variant="contained"
          className="rounded-xl w-28 h-15 text-white font-bold m-4  hover:bg-purple-900"
          onClick={() => loadMoreCommits()}
        >
          {"Load More"}
        </Button>
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
