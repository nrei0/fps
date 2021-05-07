import axios, { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { Spinner } from '../spinner'
import { FlickrApiResponse } from '../../types/flickr'

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
      {data.map((item) => (
        <div key={item.link}>
          <div>
            {item.title && (
              <a href={item.link} title="">
                {item.title}
              </a>
            )}
          </div>
          <div>
            by <a href={`https://www.flickr.com/people/${item.author_id}/`}>{item.author}</a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: item.description }} />
          <div>Tags: {item.tags}</div>
          <hr style={{ margin: '32px 0' }} />
        </div>
      ))}
    </div>
  )
}
