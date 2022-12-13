// @ts-nocheck
import { Box, Button, Card, withStyles } from "@mui/material";

function ProjectCard({ name, desc, image, left, color }) {
  return (
    <Card
      style={{
        backgroundColor: color,
        border: "2px solid black",
        boxShadow: "2px 2px 0px #000000",
        borderRadius: 15,
        height: 300,
      }}
      className="flex justify-center mb-5"
    >
      {left && (
        <img
          src={image}
          style={{
            width: 300,
            marginBlock: 30,
            margin: 20,
            border: "2px solid black",
            borderRadius: 10,
          }}
        ></img>
      )}

      <div
        className={`w-4/12 text-left normal-case text-[#000] my-auto ${
          left ? "ml-auto mr-24" : "mr-auto ml-24"
        }`}
      >
        <div className={"mb-8"}>
          <p className={"font-bold text-xl mb-4"}>{name}</p>
          <p>{desc}</p>
        </div>
        <Button
          onClick={() => {
            window.open(
              "https://osfd-winter.github.io/Fang-Chat/",
              "_blank",
              "noopener,noreferrer"
            );
          }}
          variant="contained"
          sx={{
            background: "linear-gradient(to right, #FF7575 50%, #FF9B9B 50%)",
            backgroundSize: " 200% 100%",
            backgroundPosition: "right bottom",
            marginLeft: "10px",
            transition: "all .5s ease",
            color: "black",
            border: "1px solid black",
            borderRadius: 2,
            fontFamily: "Montserrat",
            boxShadow: "1px 1px 0px #000000",
            "&:hover": {
              backgroundPosition: "left bottom",
            },
          }}
        >
          view
        </Button>
      </div>

      {!left && (
        <img
          src={image}
          style={{
            width: 300,
            marginBlock: 30,
            margin: 20,
            border: "2px solid black",
            borderRadius: 10,
          }}
        ></img>
      )}
    </Card>
  );
}

export default ProjectCard;
