import Head from 'next/head'
import Image from 'next/image'
import Intro from '../components/Intro'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Resources relationnelles</title>
        <meta name="description" content="Resources relationnelles, un guide pour vos relations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Intro/>
    </div>
  )
}
