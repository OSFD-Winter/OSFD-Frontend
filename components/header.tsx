// @ts-nocheck
import Image from "next/image";
import osfd from "../public/osfd-big-logo.png";
import diamond from "../public/diamond.png";
import MetaMaskButton from "./metamaskButton";
const Header = () => {
  return (
    <div className="h-13vh w-full bg-gradient-to-r from-blue-1000 to-blue-50 flex items-center sticky top-0 z-10">
      <MetaMaskButton />
      <div className="relative h-4/5 w-22vw mx-auto mt-0 mb-0">
        <Image src={osfd} alt="main logo" layout="fill" objectFit="contain" />
      </div>
      <div className="absolute h-full w-8vw right-0  mr-8vw opacity-10">
        <Image src={diamond} alt="diamond logo" layout="fill" objectFit="contain" />
      </div>
    </div>
  );
};
export default Header;
