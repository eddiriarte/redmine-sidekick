// import { axios } from 'axios'
const request = require('axios')

const HEADER = {
  content_type: 'Content-Type',
  api_key: 'X-Redmine-API-Key'
}

const makeAxiosInstance = (baseUrl, apiKey = null) => {
  const headers = { [HEADER.content_type]: 'application/json' }
  const options = Object.assign({ timeout: 1000, headers }, { baseUrl })

  if (apiKey) {
    options.headers = Object.assign(headers, { [HEADER.api_key]: apiKey })
  }

  return request.create(options)
}

const makeBasicAuth = (username, password) => ({username, password})

export {
  HEADER,
  makeAxiosInstance,
  makeBasicAuth
}
