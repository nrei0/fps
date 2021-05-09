import { NextPage } from 'next'
import Head from 'next/head'
import { Gallery } from '../components/gallery'
import Image from 'next/image'
import styles from '../styles/home.module.scss'

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Flick Photo Stream</title>
      <meta name="description" content="Flickr Photo Stream" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <div className={styles.repo}>
        <a href="https://github.com/nrei0/fps" title="Go to Github repo">
          <Image src="/github.png" width="100px" height="41px" />
        </a>
      </div>
      <Gallery />
    </main>

    <footer className={styles.footer}>
      <p>
        This project consumes{' '}
        <a
          href="https://www.flickr.com/services/feeds/docs/photos_public/"
          title="Flickr public API"
        >
          Flickr public API
        </a>
      </p>
      ©{new Date().getFullYear()}{' '}
      <a href="http://nrei.name" title="About dev">
        Andrei Tiurin
      </a>
    </footer>
  </div>
)

export default Home
