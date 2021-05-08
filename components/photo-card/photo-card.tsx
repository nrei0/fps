import Image from 'next/image'
import styles from './photo-card.module.scss'

interface Props {
  title: string
  link: string
  imageUrl: string
  tags: string
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
}) => {
  return (
    <div key={link}>
      <div style={{ width: '200px', height: '200px', position: 'relative' }}>
        <Image
          className={styles.image}
          src={imageUrl}
          alt={title}
          layout="fill"
          quality="100"
          objectFit="contain"
        />
      </div>
      <div>
        {title && (
          <a href={link} title="">
            {title}
          </a>
        )}
      </div>
      <div>
        by{' '}
        <a href={authorLink} title={`Visit "${author}" profile`}>
          {author}
        </a>
      </div>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <div>Tags: {tags}</div>
      <hr style={{ margin: '32px 0' }} />
    </div>
  )
}
