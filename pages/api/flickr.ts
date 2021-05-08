/**
 * Flick API & Service.
 */

import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import cors from 'cors'
import axios from 'axios'
import { FlickrApiResponse } from '../../types/flickr'

interface FlickServicePhotoItem {
  author: string
  author_id: string
  title: string
  media: {
    m: string
  }
  description: string
  link: string
  tags: string
}

interface FlickrServiceResponse {
  items: FlickServicePhotoItem[]
}

// Matches author name.
const authorSubstrRegex = /^.*?\s|[()"]/g

// Matches first <p>...</p> content
const descriptionSubstrRegex = /^(\s?<p>.*?<\/p>\s?)/g

// Map data from 3rd party flickr data response to response of API suitable for client-side.
const dataMapper = (flickrData: FlickrServiceResponse): FlickrApiResponse => {
  return flickrData.items.map((item) => {
    return {
      author: item.author.replace(authorSubstrRegex, ''), // leaves only author's name.
      title: item.title,
      authorLink: `https://www.flickr.com/people/${item.author_id}/`,
      description: item.description
        .replace(descriptionSubstrRegex, '')
        .replace(descriptionSubstrRegex, ''), // removes x2 <p>...</p>.,
      link: item.link,
      tags: item.tags,
      imageUrl: item.media.m,
    }
  })
}

// Middleware handler for `/api/flickr` endpoint.
const middlewareHandler = nc<NextApiRequest, NextApiResponse>()
  .use(cors(/* could prevent specific origins from accessing route. */))
  .get(async (_, res) => {
    const { data } = await axios.get(
      'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=safe'
    )
    res.json(dataMapper(data))
  })

export default middlewareHandler
