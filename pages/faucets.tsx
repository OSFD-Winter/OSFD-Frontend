import React from "react";
import Image from "next/image";

import styles from "../styles/Faucets.module.css";
import BigLogo from "../public/osfd-big-logo.png";

const faucets = () => {
  const Header = () => {
    return (
      <nav className={styles.header__container}>
        <div className={styles.logo}>
          <Image src={BigLogo} alt="" />
        </div>
      </nav>
    );
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div>faucets</div>
      </div>
    </>
  );
};

export default faucets;
