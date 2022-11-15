import React from "react";
import Logo from "../assets/osfd-big-logo.png";
import Diamond from "../assets/diamond.png";
const Header = () => {
    return (
        <div
            className="akshar__header"
            style={{
                width: "100%",
                maxHeight: "30vh",
                backgroundImage: "linear-gradient(to right, #060124, #265cf0)",
                display: "flex"
            }}
        >
            <div className="akshar__logo">
                <img
                    src={Logo}
                    style={{
                        width: "20vw",
                        height: "inherit",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "auto",
                        marginRight: "22vw",
                        marginTop: "0",
                        marginBottom: "0"
                    }}
                    alt=""
                />
            </div>
            <div className="akshar__diamond">
                <img
                    height="180px"
                    width="100px"
                    style={{
                        width: "10vw",
                        height: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "8vw",
                        opacity: "0.1"
                    }}
                    src={Diamond}
                    alt=""
                />
            </div>
        </div>
    );
};

export default Header;
