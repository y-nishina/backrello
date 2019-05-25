import axios from 'axios'

const URL_STATUSES = 'statuses'
const URL_ISSUES = 'issues'

export const state = () => ({
  statusList: []
})

export const getters = {
  getStatusList(state) {
    return state.statusList.map(status => {
      return {
        id: status.id,
        name: status.name
      }
    })
  }
}

export const mutations = {
  setStatusList(state, statusList) {
    state.statusList = statusList
  }
}

export const actions = {
  async fetchStatuses({ commit }) {
    commit('setStatusList', [])
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
    if (response.status === 200) {
      commit('setStatusList', response.data)
    }
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

    // その他の条件に関しても、未選択の場合は指定しない
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

    if (response.status !== 200) {
      return false
    }
    return true
  }
}
