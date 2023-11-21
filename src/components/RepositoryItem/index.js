// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {id, name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails
  return (
    <li className="repo-container" key={id}>
      <img src={avatarUrl} alt={name} className="avatar-url" />
      <h1 className="repo-heading">{name}</h1>

      <div className="short-flex">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="short-icon"
        />
        <p>{starsCount}</p>
        <p>stars</p>
      </div>
      <div className="short-flex">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="short-icon"
        />
        <p>{forksCount}</p>
        <p>forks</p>
      </div>
      <div className="short-flex">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="short-icon"
        />
        <p>{issuesCount}</p>
        <p>issues open</p>
      </div>
    </li>
  )
}

export default RepositoryItem
