import React from 'react'
import styles from './certificate.module.css'
import CertificateTeamNouns from  '../../public/assets/certificates/Team_Nouns_Stakeholder_Certificate_II.png' 
import JoinButtonOpen from '../../public/assets/certificates/join-button-open.png' 
import JoinButton from '../../public/assets/certificates/join-button.png' 
import GlassesSquare from '../../public/assets/certificates/glasses-square.png'

function Certificate () {
  return (
    <div className={styles.test}>
        <img src= {GlassesSquare} />
        <img src = {CertificateTeamNouns}/>
        <img src = {JoinButton}/>
        <img src = {JoinButtonOpen}/>
        <p>Teste</p>
    </div>
  )
}

export default Certificate