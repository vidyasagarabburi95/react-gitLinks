// GithubPopularRepos.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const githubReposApiUrl = 'https://apis.ccbp.in/popular-repos'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

/* const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
} */

class GithubPopularRepos extends Component {
  state = {
    apiStatus: 'INITIAL',
    activeLanguageTab: 'ALL',
    reposData: [],
  }

  componentDidMount() {
    this.getApiResponses()
  }

  getApiResponses = async () => {
    const {activeLanguageTab} = this.state
    this.setState({apiStatus: 'IN_PROGRESS'})

    try {
      const url = `${githubReposApiUrl}?language=${activeLanguageTab}`
      const response = await fetch(url)

      if (response.ok) {
        const data = await response.json()
        const updatedData = data.popular_repos.map(each => ({
          id: each.id,
          name: each.name,
          issuesCount: each.issues_count,
          forksCount: each.forks_count,
          starsCount: each.stars_count,
          avatarUrl: each.avatar_url,
        }))

        this.setState({
          apiStatus: 'SUCCESS',
          reposData: updatedData,
        })
      } else {
        throw new Error('API request failed')
      }
    } catch (error) {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  languageChange = id => {
    this.setState({activeLanguageTab: id}, this.getApiResponses)
  }

  renderRepoList = () => {
    const {reposData} = this.state
    return (
      <div>
        <ul className="render-repo">
          {reposData.map(eachrepo => (
            <RepositoryItem key={eachrepo.id} repoDetails={eachrepo} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <p>Something Went Wrong</p>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderRepoList()
      case 'FAILURE':
        return this.renderFailure()
      case 'IN_PROGRESS':
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageTab} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        <ul className="language-buttons">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              languageDetails={eachLanguage}
              languageChange={this.languageChange}
              isActive={eachLanguage.id === activeLanguageTab}
            />
          ))}
        </ul>
        {this.renderRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
