// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, languageChange, isActive} = props
  const {id, language} = languageDetails
  const changeLanguage = () => {
    languageChange(id)
  }
  const activeButton = isActive ? 'active' : 'non-active'
  return (
    <li key={id} className="p-lan-buttons">
      <button type="button" onClick={changeLanguage} className={activeButton}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
