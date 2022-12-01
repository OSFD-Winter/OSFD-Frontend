// @ts-nocheck
import Image from "next/image";
import osfd from "../public/osfd-big-logo.png";
import diamond from "../public/diamond.png";
const Header = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-1000 to-blue-50 flex">
      <div className="w-1/5 flex justify-center items-center ml-auto mr-22vw mt-0 mb-0">
        <Image src={osfd} alt="main logo" fill />
      </div>
      <div className="w-8vw flex justify-center items-center mr-8vw opacity-10">
        <Image src={diamond} alt="diamond logo" fill />
      </div>
    </div>
  );
};
export default Header;
