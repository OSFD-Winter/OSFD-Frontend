import React from "react";
import Image from "next/image";

import styles from "../styles/Faucets.module.css";
import BigLogo from "../public/osfd-big-logo.png";
import {
  alchemy,
  allThatNode,
  chainlink,
  ethDrop,
  paradigm,
  pk910,
  unitap,
} from "../public/faucets components/faucetImages.js";

const faucets = () => {
  const Header = () => {
    return (
      <nav className={styles.header__container}>
        <div className={styles.logo}>
          <Image src={BigLogo} alt="OSFD Logo" />
        </div>
      </nav>
    );
  };

  const FaucetImage = () => {
    return (
      <>
        <div className={styles.image__container}>
          <Image src={alchemy} />
          <Image src={allThatNode} />
          <Image src={chainlink} />
          <Image src={ethDrop} />
          <Image src={paradigm} />
          <Image src={pk910} />
          <Image src={unitap} />
        </div>
      </>
    );
  };

  return (
    <>
      <Header />
      <FaucetImage />
      <div className={styles.container}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className="image">image</div>

            <div className="amount">amount</div>

            <div className="balance">balance</div>

            <div className="wallet">wallet</div>

            <div className="visit">visit button</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default faucets;
