// @ts-nocheck
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import axios from "axios";

function GetStarted() {
    return (
        <div className="container flex bg-sky-400 h-screen w-screen overflow-y-scroll">
            <div className="container h-screen flex flex-col overflow-y-scroll">
                <div className="h-fit bg-sky-900 p-5">
                    <img
                        src="osfd-small-logo.png"
                        className="object-scale-down h-10 ml-24"
                    />
                </div>
                <div className="text-white font-bold mt-8 mx-28 my-5">
                    <div className="container flex flex-col">
                        <p className="text-7xl my-5 break-words">
                            Get Started with OSFD
                        </p>
                        <p className="break-words">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className="text-white font-bold mt-8 mx-28 my-5">
                    <div className="container flex flex-col">
                        <p className="text-5xl my-5 break-words">
                            Install & sync with metamask
                        </p>
                        <p className="break-words">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className="text-white font-bold mt-8 mx-28 my-5">
                    <div className="container flex flex-col">
                        <p className="text-5xl my-5 break-words">
                            Switch network to goeril testnet
                        </p>
                        <p className="break-words">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className="text-white font-bold mt-8 mx-28 my-5">
                    <div className="container flex flex-col">
                        <p className="text-5xl my-5 break-words">
                            Get testnet eth from faucet
                        </p>
                        <p className="break-words">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className="text-white font-bold mt-8 mx-28 my-5">
                    <div className="container flex flex-col">
                        <p className="text-5xl my-5 break-words">
                            Mint NFT from team nouns dao
                        </p>
                        <p className="break-words">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className="text-white font-bold mt-8 mx-28 my-5">
                    <div className="container flex flex-col">
                        <p className="text-5xl my-5 break-words">
                            Create a new dao
                        </p>
                        <p className="break-words">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className="text-white font-bold mt-8 mx-28 my-5">
                    <div className="container flex flex-col">
                        <p className="text-5xl my-5 break-words">
                            Create a collection using sandbox
                        </p>
                        <p className="break-words">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className="text-white font-bold mt-8 mx-28 my-5">
                    <div className="container flex flex-col">
                        <p className="text-5xl my-5 break-words">
                            Mint a collection from your own dao
                        </p>
                        <p className="break-words">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetStarted;
