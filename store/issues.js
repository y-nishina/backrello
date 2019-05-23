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
    const queryParams = {
      apiKey: sessionStorage.getItem('apiKey'),
      statusId: params.statusId,
      count: 20,
      sort: 'updated',
      order: 'desc'
    }
    // プロジェクトが選択されていない場合はprojectIdを指定しない（全プロジェクトから取得）
    if (params.projectId[0] !== null) {
      queryParams.projectId = params.projectId
    }

    if (params.categoryIdList.length > 0) {
      queryParams.categoryId = params.categoryIdList
    }
    if (params.milestoneIdList.length > 0) {
      queryParams.milestoneId = params.milestoneIdList
    }
    if (params.assigneeIdList.length > 0) {
      queryParams.assigneeId = params.assigneeIdList
    }
    if (params.priorityIdList.length > 0) {
      queryParams.priorityId = params.priorityIdList
    }
    if (params.keyword !== '') {
      queryParams.keyword = params.keyword
    }

    const response = await axios.get(
      `https://${sessionStorage.getItem(
        'spaceKey'
      )}.backlog.jp/api/v2/${URL_ISSUES}`,
      {
        params: queryParams
      }
    )
    if (response.status !== 200) {
      // TODO エラーの場合の処理を考える
      return []
    }
    return response.data
  },
  async changeIssueStatus(context, params) {
    const response = await axios.patch(
      `https://${sessionStorage.getItem(
        'spaceKey'
      )}.backlog.jp/api/v2/${URL_ISSUES}/${params.id}`,
      {
        statusId: params.statusId
      },
      {
        params: {
          apiKey: sessionStorage.getItem('apiKey')
        }
      }
    )

    // ステータスコードが200以外ならNG
    if (response.status !== 200) {
      return false
    }
    return true
  }
}
