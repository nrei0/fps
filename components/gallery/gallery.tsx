import cn from 'classnames'
import { Spinner } from '../spinner'
import { FlickrPhotoItem } from '../../types/flickr'
import { PhotoCard } from '../photo-card'
import styles from './gallery.module.scss'

interface Props {
  className?: string
  tags?: string[]
  items: FlickrPhotoItem[]
  isLoading: boolean
  onTagClick?: (tag: string, active: boolean) => void
}

const renderPhotoCards = (
  items: FlickrPhotoItem[],
  activeTags: string[] = [],
  onTagClick: (tag: string, active: boolean) => void
): JSX.Element | null => {
  const numOfItems = items?.length
  const emptyCols = 3 - (numOfItems % 3)
  const highlightedTags = activeTags.reduce((acc, tag) => {
    acc[tag] = true
    return acc
  }, {})

  return items ? (
    <ul className={styles.list}>
      {items.map(({ title, description, author, authorLink, link, tags, imageUrl }) => {
        const tagList = tags
          .split(' ')
          .map((tag) => ({ name: tag, active: !!highlightedTags[tag] }))
        return (
          <li className={styles.item} key={link}>
            <PhotoCard
              className={styles.card}
              title={title}
              description={description}
              imageUrl={imageUrl}
              author={author}
              authorLink={authorLink}
              link={link}
              tags={tagList}
              onTagClick={onTagClick}
            />
          </li>
        )
      })}
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

const renderContent = (
  items: FlickrPhotoItem[],
  tags: string[],
  isLoading: boolean,
  onTagClick: (tag: string, active: boolean) => void
): JSX.Element | string => {
  if (isLoading) {
    return renderLoader()
  } else if (items) {
    return items.length ? renderPhotoCards(items, tags, onTagClick) : renderNoContentMessage()
  } else {
    // Error OR if content is invalid (null | undefined)
    return renderErrorMessage()
  }
}

export const Gallery: React.FC<Props> = ({
  className,
  items,
  tags,
  isLoading,
  onTagClick = () => void 0,
}) => {
  return (
    <div className={cn(className, styles.gallery)}>
      {renderContent(items, tags, isLoading, onTagClick)}
    </div>
  )
}
