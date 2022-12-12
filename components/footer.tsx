// @ts-nocheck
import Image from "next/image";
import Link from "next/link";
import osfd from "../public/osfd-small-logo.png";
import { Button } from "@mui/material";

const Footer = ({ gradient }) => {
  return (
    <footer className={gradient + " mt-[25px]"}>
      <div className="md:flex md:justify-around sm:px-12 md:items-center ">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:px-8 px-5 ">
          <div className="m-auto">
            <a className="cursor-pointer">Terms of Service | </a>
            <a className="cursor-pointer">Sales Agreements | </a>
            <a className="cursor-pointer">Privacy Policy</a>
          </div>
          <Button
            style={{
              textShadow: "3px 3px 0px #000000",
              fontSize: "3em",
              fontFamily: "BebasNeue",
              color: "white",
              marginLeft: 30,
            }}
          >
            <Link href="/">OSFD</Link>
          </Button>
          <div className="m-auto">
            <span>© 2022 OSFD All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
