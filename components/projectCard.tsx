// @ts-nocheck
import { Box, Button, Card, withStyles, Slide } from "@mui/material";

function ProjectCard({ name, desc, image, left, color, index }) {
  return (
    <Slide direction={left ? "right" : "left"} in={true} timeout={500} mountOnEnter unmountOnExit>
      <Card
        style={{
          backgroundColor: color,
          border: "2px solid black",
          boxShadow: "2px 2px 0px #000000",
          borderRadius: 15,
          height: 300,
          padding: "1.125rem",
        }}
        className="flex justify-center mb-5 gap-4"
      >
        {left && (
          <img
            src={image}
            alt=""
            style={{
              width: 300,
              border: "2px solid black",
              borderRadius: 10,
            }}
          ></img>
        )}

        <div
          className={` text-left normal-case text-[#000] max-w-xs ${
            left ? "ml-auto mr-20" : "mr-auto ml-20"
          }`}
        >
          <div className="mb-4">
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
            alt=""
            style={{
              width: 300,
              border: "2px solid black",
              borderRadius: 10,
            }}
          ></img>
        )}
      </Card>
    </Slide>
  );
}

export default ProjectCard;
