import React from "react";
import { Card, CardContent, Stack, Typography, Button, Box } from "@mui/material";
import { Send, ArrowRight, ArrowLeft } from "@mui/icons-material";

import "../badge-generator/badgeGeneartor.css";

const BadgeGenerator = () => {
  return (
    <div className="container mx-auto mt-8 ">
      <p className="text-center text-5xl font-semibold mb-10">Badge Generator</p>
      <div className=" pageContainer">
        <div className="flex grid grid-rows-1 grid-cols-4 gap-2 text-center p-10">
          {/* BadgeContent */}
          <div className="row-span-3 ... bg-gradient-to-b from-white to-blue-500 p-8 roundBorder shadow-lg shadow-black h-fit">
            <Card
              variant="outlined"
              className="w-full mx-auto p-1"
              sx={{ borderRaidus: 15, backgroundColor: "rgb(69, 152, 172)" }}
            >
              <CardContent>
                <div className="grid auto-rows-max grid-flow-row gap-4">
                  <div className="h-8 w-3/4 bg-white border-zinc-400 border-2 rounded-lg mx-auto" />
                  <div className="h-6 w-4/5 bg-white border-zinc-400 border-2 rounded-md mx-auto" />
                  <div className="h-20 w-4/5 bg-white border-zinc-400 border-2 rounded-sm mx-auto" />
                  <div className="h-40 w-3/4 bg-white border-zinc-400 border-2 rounded-lg mx-auto customBackground" />
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Select Noun */}
          <div className="col-span-2 px-10">
            <p className="text-xl uppercase text-left">Select Noun</p>
            <div className="grid auto-rows-max grid-flow-row">
              <Card sx={{ boxShadow: 5, borderRadius: "15px" }}>
                <CardContent>
                  <div className="grid grid-cols-4 flex items-center">
                    <div>
                      <ArrowLeft />
                    </div>
                    <div className="h-40 w-full bg-white border-zinc-400 border-2 rounded-lg mx-auto col-span-2" />
                    <div>
                      <ArrowRight />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* change Background */}
              <div className="grid grid-flow-col grid-cols-4 gap-4">
                <div className="col-span-2">
                  <p className="text-xl uppercase text-left my-2">Change Background</p>

                  <Card className=" h-36 w-64" sx={{ boxShadow: 5, borderRadius: "15px" }}>
                    <CardContent>
                      <div className="h-20 w-1/2 bg-white border-zinc-400 border-2 rounded-sm mx-auto" />
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-4 my-5">
                  <div className="my-6 grid grid-flow-row auto-rows-max gap-5">
                    <input
                      type="text"
                      placeholder="Name"
                      className="placeholder:text-black block bg-white w-full border border-slate-300 rounded-md pl-2 pr-3 shadow-sm"
                    />
                    <input
                      type="text"
                      placeholder="ID No."
                      className="placeholder:text-black block bg-white w-full border border-slate-300 rounded-md pl-2 pr-3 shadow-sm"
                    />
                    <input
                      type="text"
                      placeholder="Friend Code"
                      className="placeholder:text-black block bg-white md:w-full lg:w-full border border-slate-300 rounded-md pl-2 pr-3 shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Badge Shape */}
          <div className="col-span-1">
            <p className="text-xl uppercase text-left mt-0">BadgeShape</p>
            <Card sx={{ boxShadow: 5, borderRadius: "15px" }}>
              <CardContent>
                <div className="grid grid-cols-4 flex items-center">
                  <div>
                    <ArrowLeft />
                  </div>
                  <div className="h-40 w-full bg-white border-zinc-400 border-2 rounded-lg mx-auto col-span-2" />
                  <div>
                    <ArrowRight />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div></div>
        </div>
        {/* Join Link */}
        <Box
          sx={{
            overflow: "hidden",
            width: "80%",
            height: 275,
            padding: 2,
            margin: "auto",
          }}
        >
          <Card
            sx={{
              width: "100%",
              height: "65%",
              boxShadow: 5,
              backgroundColor: "rgb(214, 209, 209)",
              borderRadius: "15px",
            }}
          >
            <CardContent className="flex justify-around ">
              <div className="grid grid-cols-4 grid-flow-col gap-4 justify-items-stretch">
                <div className="grid auto-rows-max grid-flow-row self-center ">
                  <Typography variant="h6" className="uppercase" style={styles.closingTextOne}>
                    Create your Badge
                  </Typography>
                  <Typography variant="h6" style={styles.closingTextTwo}>
                    Intern DAO
                  </Typography>
                </div>
                <div className="grid col-span-2 flex p-6 ">
                  <div className="grid gap-4 grid-cols-2 justify-self-center ">
                    <div>
                      <input
                        id="developer"
                        className="peer/draft"
                        type="checkbox"
                        name="Developer"
                        defaultChecked
                      />
                      <label htmlFor="developer" className="peer-checked/draft:text-sky-500 mx-2">
                        Developer
                      </label>
                    </div>
                    <div>
                      <input id="strategy" className="peer/draft" type="checkbox" name="strategy" />
                      <label htmlFor="strategy" className="peer-checked/draft:text-sky-500 mx-2">
                        Strategy
                      </label>
                    </div>
                    <div>
                      <input id="winter" className="peer/draft" type="checkbox" name="winter" />
                      <label htmlFor="winter" className="peer-checked/draft:text-sky-500 mx-2">
                        Winter
                      </label>
                    </div>
                    <div>
                      <input id="2022" className="peer/draft" type="checkbox" name="2022" />
                      <label htmlFor="2022" className="peer-checked/draft:text-sky-500 mx-2">
                        2022
                      </label>
                    </div>
                  </div>
                </div>
                <Stack direction="column" sx={{ alignSelf: "center" }}>
                  <Button variant="contained" color="secondary" size="large" endIcon={<Send />}>
                    Join
                  </Button>
                </Stack>
              </div>
            </CardContent>
          </Card>
        </Box>
      </div>
      {/* Bottom Container */}
      <div className="bottomContainer h-3/4">
        <div className="grid grid-rows-3 grid-flow-col gap-3 flex">
          <div className="col-span-1">
            <image
              src={require("../badge-generator/Images/glasses.png")}
              alt="glasses"
              className="px-10"
            />
          </div>
          <div className="col-span-3">
            <p className="text-5xl mt-5 text-justify font-bold">Your Badge Is Ready</p>
          </div>
          <div className="text-center">
            {" "}
            <Button variant="contained" color="secondary" size="large" endIcon={<Send />}>
              Download
            </Button>
          </div>
        </div>
        <Card
          variant="outlined"
          className="w-80 p-1"
          sx={{
            borderRaidus: "15px",
            backgroundColor: "rgb(69, 152, 172)",
            boxShadow: 5,
          }}
        >
          <CardContent>
            <div className="grid auto-rows-max grid-flow-row gap-4">
              <div className="h-8 w-3/4 bg-white border-zinc-400 border-2 rounded-lg mx-auto" />
              <input
                type="text"
                placeholder="John Smith"
                className="placeholder:text-black text-center font-bold bg-white w-3/4 border border-slate-300 rounded-md pl-2 pr-3 shadow-sm mx-auto"
              />
              <textarea
                rows="4"
                cols="50"
                placeholder={`234987665232056 \n Developer `}
                className="placeholder:text-black font-bold text-center bg-white w-3/4 border border-slate-300 rounded-md pl-2 pr-3 shadow-sm mx-auto"
              />
              <div className="h-40 w-3/4 bg-white border-zinc-400 border-2 rounded-lg mx-auto customBackground" />
              <p className="text-center text-white font-bold">Intern DAO</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="newsLetter">
        <Typography variant="h6" style={styles.newsLetter} class="mb-3">
          NewsLetter
        </Typography>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
          <input
            type="email"
            placeholder="email address"
            className="placeholder:text-blackfont-bold bg-white w-1/4 h-8 border border-slate-300 rounded-md pl-2 pr-3 shadow-sm"
          />

          <Button className="h-7 w-72" variant="contained" color="secondary">
            Sign Up
          </Button>
        </Stack>
      </div>
    </div>
  );
};
const styles = {
  badgeDesigner: {
    padding: 10,
    backgroundColor: "rgb(69, 152, 172)",
  },
  nounDesigner: {
    paddingLeft: 20,
    paddingRight: 20,
    boxShadow: 5,
  },
  nounImages: {
    maxWidth: "130px",
    height: "100%",
    padding: 15,
  },
  badgeShape: {
    margin: "auto",
    padding: 15,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: 1,
  },
  closingTextOne: {
    fontWeight: "500",
    marginTop: 2,
  },
  closingTextTwo: {
    fontWeight: "900",
    letterSpacing: "5px",
    fontSize: "1.85em",
    lineHeight: ".5",
  },
  newsLetter: {
    fontWeight: "800",
    fontSize: "1.85em",
    lineHeight: ".5",
  },
};

export default BadgeGenerator;
