export interface FlickrPhotoItem {
  author: string
  title: string
  author_id: string
  description: string
  link: string
  tags: string
}

export type FlickrApiResponse = FlickrPhotoItem[]
