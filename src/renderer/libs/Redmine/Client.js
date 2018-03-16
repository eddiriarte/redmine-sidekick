import { makeAxiosInstance, makeBasicAuth } from './helpers'
import { RedmineUsernamePassword, RedmineApiKey } from './Credentials'

export default class RedmineClient {
  constructor (url) {
    this.url = url
    this.api = makeAxiosInstance(url)
  }

  login (auth) {
    const scope = this
    const url = `${this.url}/users/current.json`
    let config = { method: 'get' }

    if (auth instanceof RedmineUsernamePassword) {
      config = Object.assign({}, config, {
        auth: makeBasicAuth(auth.username, auth.password)
      })
    }

    if (auth instanceof RedmineApiKey) {
      this.api = makeAxiosInstance(this.url, auth.apiKey)
    }

    return this.api(url, config)
      .then(({ data }) => {
        scope.user = data.user
        scope.apiKey = scope.user.api_key
        scope.api = makeAxiosInstance(scope.url, scope.apiKey)

        return Promise.resolve(scope.user)
      })
  }

  user () {
    return this.user
  }

  projects () {
    return this.api
      .get(`${this.url}/projects.json`)
      .then(({ data }) => Promise.resolve(data.projects))
  }

  projectById (id) {
    return this.api
      .get(`${this.url}/projects/${id}.json?include=trackers,issue_categories`)
      .then(({ data }) => Promise.resolve(data.project))
  }

  states () {
    return this.api.get(`${this.url}//issue_statuses.json`)
  }

  priorities () {
    return this.api.get(`${this.url}/enumerations/issue_priorities.json`)
  }

  createIssue (issue) {
    return this.api.post(`${this.url}/issues.json`, { data: issue })
  }
}
