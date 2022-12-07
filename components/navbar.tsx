// @ts-nocheck
import Image from "next/image";
import { React } from "react";
import logo from "../public/osfd-small-logo.png";
import { useRouter } from "next/router";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import MetaMaskButton from "./metamaskButton";

const Navbar = ({ refTop, refSandbox, refFeedback }) => {
  const router = useRouter();

  return (
    <div
      style={{ backgroundImage: "linear-gradient(to right, #040619, #255aec)" }}
      className="sticky top-0 z-10 p-5 shadow"
    >
      <div className="flex gap-9 font-medium text-white bg-headerbg">
        <div className="flex justify-start cursor-pointer">
          <Image
            onClick={() => {
              refTop ? refTop.current.scrollIntoView({ behavior: "smooth" }) : router.push("/");
            }}
            src={logo}
          />
        </div>
        <ul
          style={{ fontFamily: "Poppins", src: "url(./fonts/Poppins-Bold.ttf)" }}
          className="flex items-center w-full justify-evenly mr-[200px]"
        >
          <Link href="/internsDAO">
            <p className="hover:text-[#d3d3d3] hover:opacity-75 cursor-pointer">Interns DAO</p>
          </Link>
          <Link href="/teamnouns">
            <p className="hover:text-[#d3d3d3] hover:opacity-75 cursor-pointer">Team Nouns DAO</p>
          </Link>
          <p
            onClick={() => {
              refSandbox
                ? refSandbox.current.scrollIntoView({ behavior: "smooth" })
                : router.push("/sandbox");
            }}
            className="hover:text-[#d3d3d3] hover:opacity-75 cursor-pointer"
          >
            SANDBOX
          </p>
          <Link href="/terms">
            <p className="hover:text-[#d3d3d3] hover:opacity-75 cursor-pointer">ABOUT</p>
          </Link>
          <p
            onClick={() => {
              refFeedback
                ? refFeedback.current.scrollIntoView({ behavior: "smooth" })
                : router.push("/feedback");
            }}
            className="hover:text-[#d3d3d3] hover:opacity-75 cursor-pointer"
          >
            CONTACT
          </p>
        </ul>
        <MetaMaskButton />
      </div>
    </div>
  );
};

export default Navbar;
