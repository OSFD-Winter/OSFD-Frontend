/* eslint-disable jsx-a11y/anchor-is-valid */
import { BsDownload } from "react-icons/bs";
import type { CardInterface } from "../api/interfaces";

const Card = ({ image, title, href }: CardInterface) => {
  return (
    <div className="min-h-[50px] w-full">
      <div className="relative flex m-0 shadow-xs rounded border border-gray-300 bg-white">
        <div className="p-2">
          <img src={image} alt="sticker" className="w-full object-cover h-12 mx-auto"></img>
        </div>
        <div className="flex-auto">
          <div className="p-5">
            <h5 className="font-medium text-base">:{title}:</h5>
          </div>
        </div>
        <button>
          <a className="w-7 h-10 flex items-center text-center m-3" href={href} download>
            <BsDownload size={28} />
          </a>
        </button>
      </div>
    </div>
  );
};

export default Card;
