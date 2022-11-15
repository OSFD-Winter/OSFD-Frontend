import React from "react";
import Logo from "../assets/osfd-big-logo.png";
import Image from "next/image";
import Diamond from "../assets/diamond.png";
const Header = () => {
    return (
        <div className="akshar__header">
            <div className="akshar__logo">
                <Image src={Logo} alt="" />
            </div>
            <div className="akshar__diamond">
                <Image height="180px" width="100px" src={Diamond} alt="" />
            </div>
        </div>
    );
};

export default Header;
