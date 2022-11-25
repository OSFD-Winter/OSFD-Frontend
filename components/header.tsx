// @ts-nocheck
import Image from "next/image";
import osfd from "../public/osfd-big-logo.png";
import diamond from "../public/diamond.png";
const Header = () => {
  return (
    <div
      className="akshar__header"
      style={{
        width: "100%",
        maxHeight: "30vh",
        backgroundImage: "linear-gradient(to right, #060124, #265cf0)",
        display: "flex",
      }}
    >
      <div
        className="akshar__logo"
        style={{
          width: "20vw",
          height: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "22vw",
          marginTop: "0",
          marginBottom: "0",
        }}
      >
        <Image src={osfd} alt="main logo" fill />
      </div>
      <div
        className="akshar__diamond"
        style={{
          width: "8vw",
          height: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "8vw",
          opacity: "0.1",
        }}
      >
        <Image src={diamond} alt="diamond logo" fill />
      </div>
    </div>
  );
};
export default Header;
