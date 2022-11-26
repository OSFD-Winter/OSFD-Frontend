// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

function GettingStarted() {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);

  const handleChange1 = () => {
    setChecked1(!checked1);
  };

  const handleChange2 = () => {
    setChecked2(!checked2);
  };

  const handleChange3 = () => {
    setChecked3(!checked3);
  };

  const handleChange4 = () => {
    setChecked4(!checked4);
  };

  const handleChange5 = () => {
    setChecked5(!checked5);
  };

  const handleChange6 = () => {
    setChecked6(!checked6);
  };

  useEffect(() => {
    if (checked1) {
      ref2.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [checked1]);

  useEffect(() => {
    if (checked2) {
      ref3.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [checked2]);

  useEffect(() => {
    if (checked3) {
      ref4.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [checked3]);

  useEffect(() => {
    if (checked4) {
      ref5.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [checked4]);

  useEffect(() => {
    if (checked5) {
      ref6.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [checked5]);

  useEffect(() => {
    if (checked6) {
      // Do something...
    }
  }, [checked6]);

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input class="w-6 h-6 rounded ml-4" type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  return (
    <div>
      <div className="flex bg-sky-600 h-screen w-screen overflow-y-scroll">
        <div className="container h-screen flex flex-col overflow-y-scroll">
          {/*<Header />*/}
          <div className="h-fit bg-sky-900 p-5">
            <img src="osfd-small-logo.png" className="object-scale-down h-10 ml-24" />
          </div>
          <div className="text-white font-bold mt-8 mx-32 my-5">
            <div className="container flex flex-col">
              <p className="text-7xl my-7 break-words">Getting Started with OSFD</p>
              <p className="text-2xl break-words">
                This page will be a guidance for you to begin your journey with OSFD.
              </p>
            </div>
          </div>
          <div ref={ref1} className="text-white font-bold mt-8 mx-32 my-5">
            <div className="container flex flex-col">
              <p className="text-4xl my-5 break-words">
                Install & sync with metamask
                <Checkbox value={checked1} onChange={handleChange1} />
              </p>
              <p className="text-xl break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <p className="text-lg break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div ref={ref2} className="text-white font-bold mt-8 mx-32 my-5">
            <div className="container flex flex-col">
              <p className="text-4xl my-5 break-words">
                Switch network to goeril testnet
                <Checkbox value={checked2} onChange={handleChange2} />
              </p>
              <p className="text-xl break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <p className="text-lg break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div ref={ref3} className="text-white font-bold mt-8 mx-32 my-5">
            <div className="container flex flex-col">
              <p className="text-4xl my-5 break-words">
                Get testnet eth from faucet
                <Checkbox value={checked3} onChange={handleChange3} />
              </p>
              <p className="text-xl break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <p className="text-lg break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div ref={ref4} className="text-white font-bold mt-8 mx-32 my-5">
            <div className="container flex flex-col">
              <p className="text-4xl my-5 break-words">
                Mint NFT from team nouns dao
                <Checkbox value={checked4} onChange={handleChange4} />
              </p>
              <p className="text-xl break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <p className="text-lg break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div ref={ref5} className="text-white font-bold mt-8 mx-32 my-5">
            <div className="container flex flex-col">
              <p className="text-4xl my-5 break-words">
                Create a new dao
                <Checkbox value={checked5} onChange={handleChange5} />
              </p>
              <p className="text-xl break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <p className="text-lg break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div ref={ref6} className="text-white font-bold mt-8 mx-32 my-5">
            <div className="container flex flex-col">
              <p className="text-4xl my-5 break-words">
                Create a collection using sandbox
                <Checkbox value={checked6} onChange={handleChange6} />
              </p>
              <p className="text-xl break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <p className="text-lg break-words my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default GettingStarted;
