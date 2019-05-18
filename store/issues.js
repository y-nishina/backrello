import axios from 'axios'

const URL_STATUSES = 'statuses'
const URL_ISSUES = 'issues'

export const actions = {
  async fetchStatuses(context) {
    const response = await axios.get(
      `https://${sessionStorage.getItem(
        'spaceKey'
      )}.backlog.jp/api/v2/${URL_STATUSES}`,
      {
        params: {
          apiKey: sessionStorage.getItem('apiKey')
        }
      }
    )
    if (response.status !== 200) {
      // TODO エラーの場合の処理を考える
      return []
    }
    return response.data
  },
  async fetchIssues(context, params) {
    const response = await axios.get(
      `https://${sessionStorage.getItem(
        'spaceKey'
      )}.backlog.jp/api/v2/${URL_ISSUES}`,
      {
        params: {
          apiKey: sessionStorage.getItem('apiKey'),
          statusId: params.statusId
        }
      }
    )
    if (response.status !== 200) {
      // TODO エラーの場合の処理を考える
      return []
    }
    return response.data
  }
}
