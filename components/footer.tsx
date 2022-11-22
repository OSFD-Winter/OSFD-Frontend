// @ts-nocheck

function Footer() {
  return (
    <footer
      style={{
        backgroundImage:
          "linear-gradient(to right, #01010A, #010529, #171e74, #2673FF)",
        position: "relative",
        height: "150px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          height: "100%",
          maxWidth: "90%",
          paddingTop: "30px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: 17,
          }}
        >
          <a href={"/terms"}> Terms of Service </a> | Sales Agreements | Privacy
          Policy
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {" "}
          <img src="./osfd-small-logo.png" alt="osfd"></img>{" "}
        </div>

        <div
          style={{
            fontSize: 19,
          }}
        >
          © 2022 OSFD All rights reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
