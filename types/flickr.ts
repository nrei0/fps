export interface FlickrPhotoItem {
  author: string
  title: string
  authorLink: string
  imageUrl: string
  description: string
  link: string
  tags: string
}

export type FlickrApiResponse = FlickrPhotoItem[]
