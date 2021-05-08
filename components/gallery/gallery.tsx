import axios, { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { Spinner } from '../spinner'
import { FlickrApiResponse } from '../../types/flickr'
import { PhotoCard } from '../photo-card'

export const Gallery: React.FC = () => {
  const { isLoading, data } = useQuery(
    'public_photos',
    () =>
      axios.get<unknown, AxiosResponse<FlickrApiResponse>>('/api/flickr').then((res) => res.data),
    { refetchOnReconnect: false, refetchOnWindowFocus: false }
  )

  return isLoading ? (
    <Spinner alt="Gallery is loading" />
  ) : (
    <div>
      {data.map(({ title, description, author, authorLink, link, tags, imageUrl }) => (
        <PhotoCard
          key={link}
          title={title}
          description={description}
          imageUrl={imageUrl}
          author={author}
          authorLink={authorLink}
          link={link}
          tags={tags}
        />
      ))}
    </div>
  )
}
