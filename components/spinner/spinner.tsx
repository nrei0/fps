import Image from 'next/image'

interface Props {
  className?: string
  alt: string
}

export const Spinner: React.FC<Props> = ({ alt, className }) => (
  <Image src="/spinner.svg" className={className} width={64} height={64} alt={alt}></Image>
)
