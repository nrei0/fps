import cn from 'classnames'
import { useDebouncedCallback } from 'use-debounce'
import styles from './search-bar.module.scss'

interface Props {
  className?: string
  value: string
  onChange?: (val: string) => void
  onSearch?: (val: string) => void
  debounceTime?: number
}

export const SearchBar: React.FC<Props> = ({
  className,
  value,
  onSearch = () => void 0,
  onChange = () => void 0,
  debounceTime = 1000,
}) => {
  const debounce = useDebouncedCallback((value) => {
    onSearch(value)
  }, debounceTime)

  return (
    <div className={cn(className, styles.search)}>
      <input
        className={styles.input}
        type="text"
        value={value}
        placeholder="Search by tags (for ex.: covid impfung gesundheit)"
        onChange={({ target: { value } }) => {
          onChange(value)
          debounce(value)
        }}
      />
    </div>
  )
}
