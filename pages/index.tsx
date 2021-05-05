import { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/home.module.scss'

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Flick Photo Stream</title>
      <meta name="description" content="Flickr Photo Stream" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>Gallery WIP</main>

    <footer className={styles.footer}>
      ©{new Date().getFullYear()}{' '}
      <a href="https://github.com/nrei0" title="Github - Andrei Tiurin">
        Andrei Tiurin
      </a>
    </footer>
  </div>
)

export default Home
