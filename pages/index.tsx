import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios, { AxiosResponse } from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { FlickrApiResponse } from '../types/flickr'
import { Gallery } from '../components/gallery'
import { SearchBar } from '../components/search-bar'
import styles from '../styles/home.module.scss'

type CancelablePromise<T> = Promise<T> & { cancel: () => void }

type AxiosFlickrApiResponse = AxiosResponse<FlickrApiResponse | undefined>

const Home: NextPage = () => {
  const [tags, setTags] = useState([])
  const [searchText, setSearchText] = useState('')
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery(
    ['public_photos', tags],
    () => {
      const source = axios.CancelToken.source()

      const promise = axios
        .get<unknown, AxiosFlickrApiResponse>(
          `/api/flickr${tags.length ? '?tags=' + tags.join(',') : ''}`,
          {
            cancelToken: source.token,
          }
        )
        .then((res) => res.data) as CancelablePromise<FlickrApiResponse>

      // `.cancel` is not original method.
      // Please take a look to docs of react-query.
      // https://react-query.tanstack.com/guides/query-cancellation
      promise.cancel = () => {
        source.cancel()
      }

      return promise
    },
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  const updateTags = (value: string): void => {
    // Cancel last outgoing request.
    queryClient.cancelQueries('public_photos')

    setTags(
      value
        .split(' ')
        .filter((tag) => tag !== '')
        .map(encodeURIComponent)
    )
  }

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
            <SearchBar value={searchText} onSearch={updateTags} onChange={setSearchText} />
          </div>
          <div className={styles.repo}>
            <a href="https://github.com/nrei0/fps" title="Go to Github repo">
              <Image src="/github.png" width="100px" height="41px" />
            </a>
          </div>
        </div>
        <Gallery
          className={styles.gallery}
          tags={tags}
          items={data}
          isLoading={isLoading}
          onTagClick={(tag: string, active: boolean) => {
            if (!active) {
              const value = !searchText ? tag : `${searchText} ${tag}`
              setSearchText(value)
              updateTags(value)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        />
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
