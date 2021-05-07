import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import cors from 'cors'
import axios from 'axios'
import { FlickrApiResponse, FlickrPhotoItem } from '../../types/flickr'

const authorSubstrRegex = /^.*?\s|[()"]/g
const descriptionSubstrRegex = /^(\s?<p>.*?<\/p>\s?)/g

interface FlickrServiceResponse {
  items: FlickrPhotoItem[]
}

const dataMapper = (flickrData: FlickrServiceResponse): FlickrApiResponse => {
  return flickrData.items.map((item) => {
    return {
      author: item.author.replace(authorSubstrRegex, ''),
      title: item.title,
      author_id: item.author_id,
      description: item.description.replace(descriptionSubstrRegex, ''),
      link: item.link,
      tags: item.tags,
    }
  })
}

const middlewareHandler = nc<NextApiRequest, NextApiResponse>()
  .use(cors(/* could prevent specific origins from accessing */))
  .get(async (_, res) => {
    const { data } = await axios.get(
      'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=safe'
    )
    res.json(dataMapper(data))
  })

export default middlewareHandler
