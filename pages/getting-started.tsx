// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import { ReducerContextProvider, useReducerContext } from "../api/context";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

function GettingStarted() {
  const { state, dispatch } = useReducerContext();
  const [contractAddr, setContractAddr] = useState(
    "0x09aD6Fb74584fFbA72C65419c03741325CAE00a1" // TeamNouns
  );

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

  useEffect(() => {
    if (window !== undefined) {
      const { ethereum } = window;

      // Check if user has metamask
      const checkMetamaskAvailability = async () => {
        if (!ethereum) {
          return;
        }
        setChecked1(true);
        checkNetwork();
      };

      // Check if user has switched to goeril network
      const checkNetwork = async () => {
        if (window.ethereum.networkVersion != 5) {
          return;
        }
        setChecked2(true);
        checkBalance();
      };

      // Check if balance is >= 0.05 eth
      const checkBalance = async () => {
        console.log(state);
        if ((state.walletBalance == "") | (parseFloat(state.walletBalance) <= 0.05)) {
          return;
        }
        setChecked3(true);
        checkNFTOwnership();
      };

      // Check if he has an nft of team nouns
      const checkNFTOwnership = () => {
        axios
          .get(
            `https://testnets-api.opensea.io/api/v1/assets?owner=${state.walletAddress}&asset_contract_address=${contractAddr}&order_direction=desc&offset=0&limit=20&include_orders=false`
          )
          .then((res) => {
            if (res.data.assets.length == 0) {
              return;
            }
            // Holds an asset under the contract address
            setChecked4(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      checkMetamaskAvailability();
    }
  }, []);

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input
          className="w-6 h-6 rounded ml-4"
          type="checkbox"
          checked={value}
          onChange={onChange}
        />
        {label}
      </label>
    );
  };

  return (
    <div className="flex bg-blue-50 h-screen w-full overflow-y-scroll">
      <div className="h-screen w-full flex flex-col overflow-y-scroll">
        {/*<Header />*/}
        <div className="h-fit bg-blue-1000 p-5">
          <img src="osfd-small-logo.png" className="object-scale-down h-10 ml-24" />
        </div>
        <div className="text-white font-bold mt-8 mx-32 my-5">
          <div className="flex flex-col">
            <p className="text-7xl my-7 break-words">Getting Started with OSFD</p>
            <p className="text-2xl break-words">
              This page will be a guidance for you to begin your journey with OSFD.
            </p>
          </div>
        </div>
        <div ref={ref1} className="text-white font-bold mt-8 mx-32 my-5">
          <div className="flex flex-col">
            <p className="text-4xl my-5 break-words">
              Install & sync with metamask
              <Checkbox value={checked1} onChange={handleChange1} />
            </p>
            <p className="text-xl break-words my-2">
              It is necessary to have your own cryptocurrency wallet in order to interact with the
              Etherium blockchain.
            </p>
            <p className="text-lg break-words my-2">
              Go to <a href="https://metamask.io/download/">https://metamask.io/download/</a> to
              download and install Metamask to your device.
            </p>
          </div>
        </div>
        <div ref={ref2} className="text-white font-bold mt-8 mx-32 my-5">
          <div className="flex flex-col">
            <p className="text-4xl my-5 break-words">
              Switch network to Goeril testnet
              <Checkbox value={checked2} onChange={handleChange2} />
            </p>
            <p className="text-xl break-words my-2">
              In order to test all OSFD&apos;s features and functionality, you will need to obtain
              test Ether used in the Goerli network. To get Goerli test ETH, you will first switch
              to the Goeril network.
            </p>
            <p className="text-lg break-words my-2">
              To switch to the Goeril network, simply open your Metamask wallet and select the
              Goerli network in the network droplist.
            </p>
          </div>
        </div>
        <div ref={ref3} className="text-white font-bold mt-8 mx-32 my-5">
          <div className="flex flex-col">
            <p className="text-4xl my-5 break-words">
              Get testnet eth from faucet
              <Checkbox value={checked3} onChange={handleChange3} />
            </p>
            <p className="text-xl break-words my-2">
              You can not obtain free test Ether using your wallet address. Some faucets require
              posting on your twitter/facebook account to prevent spamming.
            </p>
            <p className="text-lg break-words my-2">
              Go to <a href="https://faucetlink.to/goerli">https://faucetlink.to/goerli</a> and
              select any active faucet to obtain test Eth.
            </p>
          </div>
        </div>
        <div ref={ref4} className="text-white font-bold mt-8 mx-32 my-5">
          <div className="flex flex-col">
            <p className="text-4xl my-5 break-words">
              Mint NFT from team nouns dao
              <Checkbox value={checked4} onChange={handleChange4} />
            </p>
            <p className="text-xl break-words my-2">You are now ready to mint your first NFT.</p>
            <p className="text-lg break-words my-2">
              Go to the OSFD main page. Chose any NFT offerings and click on the mint button. You
              will complete the transaction via Metamask.
            </p>
          </div>
        </div>
        <div ref={ref5} className="text-white font-bold mt-8 mx-32 my-5">
          <div className="flex flex-col">
            <p className="text-4xl my-5 break-words">
              Create a new dao
              <Checkbox value={checked5} onChange={handleChange5} />
            </p>
            <p className="text-xl break-words my-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p className="text-lg break-words my-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div ref={ref6} className="text-white font-bold mt-8 mx-32 my-5">
          <div className="flex flex-col">
            <p className="text-4xl my-5 break-words">
              Create a collection using sandbox
              <Checkbox value={checked6} onChange={handleChange6} />
            </p>
            <p className="text-xl break-words my-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p className="text-lg break-words my-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default GettingStarted;
