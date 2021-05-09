import Image from 'next/image'
import cn from 'classnames'
import styles from './photo-card.module.scss'

interface Tag {
  active: boolean
  name: string
}

interface Props {
  className?: string
  title?: string
  link: string
  imageUrl: string
  tags: Tag[]
  description: string
  author: string
  authorLink: string
}

export const PhotoCard: React.FC<Props> = ({
  title,
  link,
  tags,
  imageUrl,
  description,
  author,
  authorLink,
  className,
}) => {
  return (
    <div className={cn(className, styles.card)} key={link}>
      <div className={styles['image-wrapper']}>
        <a href={link} title={title}>
          <Image
            className={styles.image}
            src={imageUrl}
            alt={title}
            layout="fill"
            quality="100"
            objectFit="cover"
          />
        </a>
      </div>
      <h3 className={styles.title}>
        {title && (
          <a href={link} title={title}>
            {title}
          </a>
        )}
      </h3>
      <p className={styles.author}>
        by{' '}
        <a className={styles['author-link']} href={authorLink} title={`Visit "${author}" profile`}>
          {author}
        </a>
      </p>
      <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
      <div>
        <h5 className={styles['tags-title']}>Tags</h5>
        <ul className={styles.tags}>
          {tags.map(({ name, active }) => (
            <li className={cn(styles.tag, { [styles['active-tag']]: active })} key={name}>
              <a href={`https://www.flickr.com/photos/tags/${name}`}>{name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
