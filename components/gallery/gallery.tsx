import axios, { AxiosResponse } from 'axios'
import cn from 'classnames'
import { useQuery } from 'react-query'
import { Spinner } from '../spinner'
import { FlickrApiResponse } from '../../types/flickr'
import { PhotoCard } from '../photo-card'
import styles from './gallery.module.scss'

interface Props {
  className?: string
}

export const Gallery: React.FC<Props> = ({ className }) => {
  const { isLoading, data } = useQuery(
    'public_photos',
    () =>
      axios.get<unknown, AxiosResponse<FlickrApiResponse>>('/api/flickr').then((res) => res.data),
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )
  const numOfItems = data?.length
  const emptyCols = 3 - (numOfItems % 3)

  return isLoading ? (
    <Spinner alt="Gallery is loading" />
  ) : (
    <div className={cn(className, styles.gallery)}>
      <ul className={styles.list}>
        {data.map(({ title, description, author, authorLink, link, tags, imageUrl }) => (
          <li className={styles.item} key={link}>
            <PhotoCard
              className={styles.card}
              title={title}
              description={description}
              imageUrl={imageUrl}
              author={author}
              authorLink={authorLink}
              link={link}
              tags={tags}
            />
          </li>
        ))}
        {new Array(emptyCols).fill(null).map((_, idx) => (
          <li key={idx} className={styles.item}></li>
        ))}
      </ul>
    </div>
  )
}
