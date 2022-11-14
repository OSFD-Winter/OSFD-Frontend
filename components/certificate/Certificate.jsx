import { ClassNames } from '@emotion/react'
import styledEngine from '@mui/styled-engine'
import React from 'react'
import styles from './certificate.module.css'

const Certificate = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.glasses}>
            <img src = {'./assets/certificates/glasses-square.png'}></img>
            <h2> TEAM NOUNS DAO MEMBERSHIP</h2>
          </div>
      
        <div className={styles.about__certificate}>

          <div className={styles.text_certificate}>
            <h1> 750 Seats, 1 ETH Participation</h1>
            <p>Wyoming DAO LLC formation Snapshot Voting Structures Gnosis Safe Treasury</p>
            <h1> Capital to fund development of core technologies:</h1>
            <p>Messaging On Blockchains, Postcards Generative Nouns NFTs, Stamps, Scenes Art and Community Spaces</p>
            <p>Post build, capital accumulation, distribute capital by Wyogming LLC DAO guidelines direct to the DAO Certificate holders distribution, direct to wallet, quartely</p>
            <h1> Current avaible: 750</h1>
          </div>

        </div>

        <div className={styles.certificate}>

          <div className={styles.certificate__img}>
            <img src = {'./assets/certificates/Team_Nouns_Stakeholder_Certificate_II.png'} id='1'></img>
          </div>
          <div className={styles.button__img}>
            <img src= {'./assets/certificates/join-button.png'} id='2'></img>
          </div>


        </div>

      </div>
    </section>


  )
}

export default Certificate