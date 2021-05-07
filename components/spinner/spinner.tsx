import Image from 'next/image'

interface Props {
  alt: string
}

export const Spinner: React.FC<Props> = ({ alt }) => (
  <Image src="/spinner.svg" width={64} height={64} alt={alt}></Image>
)
