import axios from 'axios'

const URL_SPACE = 'space'
const URL_PROJECTS = 'projects'

export const actions = {
  async doAuthentication(context, params) {
    const response = await axios.get(
      `https://${params.spaceKey}.backlog.jp/api/v2/${URL_SPACE}`,
      {
        params: {
          apiKey: params.apiKey
        }
      }
    )

    // ステータスコードが200以外ならNG
    if (response.status !== 200) {
      return false
    }
    // レスポンスのspaceKeyと入力されたspaceKeyが一致しなかったらNG
    if (response.data.spaceKey !== params.spaceKey) {
      return false
    }

    // spaceKeyとapiKeyをsessionStorageに保持する
    sessionStorage.setItem('spaceKey', params.spaceKey)
    sessionStorage.setItem('apiKey', params.apiKey)

    return true
  },
  async fetchProjects(contex, params) {
    const response = await axios.get(
      `https://${sessionStorage.getItem(
        'spaceKey'
      )}.backlog.jp/api/v2/${URL_PROJECTS}`,
      {
        params: {
          apiKey: sessionStorage.getItem('apiKey')
        }
      }
    )

    // ステータスコードが200以外ならNG
    if (response.status !== 200) {
      return []
    }
    return response.data
  }
}
