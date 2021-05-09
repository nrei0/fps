import cn from 'classnames'
import { useDebouncedCallback } from 'use-debounce'
import styles from './search-bar.module.scss'

interface Props {
  className?: string
  onSearch?: (val: string) => void
  debounceTime?: number
}

export const SearchBar: React.FC<Props> = ({ className, onSearch, debounceTime = 1000 }) => {
  const debounce = useDebouncedCallback((value) => {
    onSearch(value)
  }, debounceTime)

  return (
    <div className={cn(className, styles.search)}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search by tags (for ex.: covid impfung gesundheit)"
        onChange={(e) => debounce(e.target.value)}
      />
    </div>
  )
}
