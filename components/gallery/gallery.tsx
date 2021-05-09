import cn from 'classnames'
import { Spinner } from '../spinner'
import { FlickrPhotoItem } from '../../types/flickr'
import { PhotoCard } from '../photo-card'
import styles from './gallery.module.scss'

interface Props {
  className?: string
  items: FlickrPhotoItem[]
  isLoading: boolean
}

const renderPhotoCards = (items: FlickrPhotoItem[]): JSX.Element | null => {
  const numOfItems = items?.length
  const emptyCols = 3 - (numOfItems % 3)
  return items ? (
    <ul className={styles.list}>
      {items.map(({ title, description, author, authorLink, link, tags, imageUrl }) => (
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
      {/** @nrei workaround aligns cols at the end of gallery. */}
      {new Array(emptyCols).fill(null).map((_, idx) => (
        <li key={idx} className={styles.item}></li>
      ))}
    </ul>
  ) : null
}

const renderErrorMessage = (): string => 'Content is not available. Please try later.'

const renderNoContentMessage = (): string => 'There are no content found'

const renderLoader = (): JSX.Element => <Spinner alt="Gallery is loading" />

const renderContent = (items: FlickrPhotoItem[], isLoading: boolean): JSX.Element | string => {
  if (isLoading) {
    return renderLoader()
  } else if (items) {
    return items.length ? renderPhotoCards(items) : renderNoContentMessage()
  } else {
    // Error OR if content is invalid (null | undefined)
    return renderErrorMessage()
  }
}

export const Gallery: React.FC<Props> = ({ className, items, isLoading }) => {
  return <div className={cn(className, styles.gallery)}>{renderContent(items, isLoading)}</div>
}
