import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const Suggestion = ({ item, ...props }) => {
  return (
    <div className="suggestion" {...props}>
      <FontAwesomeIcon icon={faSearch} />
      <p>
        <b>{item}</b>
      </p>
    </div>
  )
}
