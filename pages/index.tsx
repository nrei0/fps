import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios, { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { FlickrApiResponse } from '../types/flickr'
import { Gallery } from '../components/gallery'
import { SearchBar } from '../components/search-bar'
import styles from '../styles/home.module.scss'

type AxiosFlickrApiResponse = AxiosResponse<FlickrApiResponse | undefined>

const Home: NextPage = () => {
  const [tags, setTags] = useState([])

  const { isLoading, data } = useQuery(
    ['public_photos', tags],
    () =>
      axios
        .get<unknown, AxiosFlickrApiResponse>(
          `/api/flickr${tags.length ? '?tags=' + tags.join(',') : ''}`
        )
        .then((res) => res.data),
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  return (
    <div>
      <Head>
        <title>Flick Photo Stream</title>
        <meta name="description" content="Flickr Photo Stream" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.bar}>
          <div className={styles.search}>
            <SearchBar
              onSearch={(value: string) => {
                setTags(
                  value
                    .split(' ')
                    .filter((tag) => tag !== '')
                    .map(encodeURIComponent)
                )
              }}
            />
          </div>
          <div className={styles.repo}>
            <a href="https://github.com/nrei0/fps" title="Go to Github repo">
              <Image src="/github.png" width="100px" height="41px" />
            </a>
          </div>
        </div>
        <Gallery className={styles.gallery} items={data} isLoading={isLoading} />
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
}

export default Home
