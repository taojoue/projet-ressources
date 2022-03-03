import React from 'react'
import styles from '../styles/Intro.module.css'
import gifsegway from '../public/img/Segway Scooter.gif'
import Image from 'next/image'

const Intro = () => {
  return (
    <div className={styles.container}>
        <div className={styles.band}>
          <Image className={styles.gifsegway} src={gifsegway} alt="loading..."/>
        
        
        </div>
        <div className={styles.band}>
          two
        </div>
    </div>
  )
}

export default Intro