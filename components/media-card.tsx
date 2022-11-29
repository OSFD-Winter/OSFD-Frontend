/* eslint-disable jsx-a11y/anchor-is-valid */

import { BsDownload } from "react-icons/bs";

function Card() {
  return (
    <div className="max-w-xs max-h-2">
      <div className="relative flex m-0 shadow-xs rounded border border-gray-300 bg-white">
        <div className="flex-no-shrink p-2">
          <img alt="sticker" className="h-12 mx-auto" src="noun-205.png"></img>
        </div>
        <div className="flex-auto card-block justify-between relative">
          <div className="p-4">
            <h5 className="font-medium text-xl">:Title:</h5>
          </div>
        </div>
        <a className=" w-10 h-10 flex items-center text-center m-3" href="#">
          <BsDownload size={28} />
        </a>
      </div>
    </div>
  );
}

export default Card;
