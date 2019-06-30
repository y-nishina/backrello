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
      `https://${sessionStorage.getItem('spaceUrl')}/api/v2/${URL_STATUSES}`,
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
  async fetchIssues({ rootState }, params) {
    const queryParams = {
      apiKey: sessionStorage.getItem('apiKey'),
      statusId: params.statusId,
      count: 20,
      sort: 'updated',
      order: 'desc'
    }
    // プロジェクトが選択されていない場合はprojectIdを指定しない（全プロジェクトから取得）
    if (rootState.projects.selectedProjectId !== null) {
      queryParams.projectId = [rootState.projects.selectedProjectId]
    }

    // その他の条件に関しても、未選択の場合は指定しない
    if (rootState.projects.selectedCategoryIdList.length > 0) {
      queryParams.categoryId = rootState.projects.selectedCategoryIdList
    }
    if (rootState.projects.selectedMilestoneIdList.length > 0) {
      queryParams.milestoneId = rootState.projects.selectedMilestoneIdList
    }
    if (rootState.projects.selectedAssigneeIdList.length > 0) {
      queryParams.assigneeId = rootState.projects.selectedAssigneeIdList
    }
    if (rootState.projects.selectedPriorityIdList.length > 0) {
      queryParams.priorityId = rootState.projects.selectedPriorityIdList
    }
    if (rootState.projects.inputKeyword !== '') {
      queryParams.keyword = rootState.projects.inputKeyword
    }

    const response = await axios.get(
      `https://${sessionStorage.getItem('spaceUrl')}/api/v2/${URL_ISSUES}`,
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
      `https://${sessionStorage.getItem('spaceUrl')}/api/v2/${URL_ISSUES}/${
        params.id
      }`,
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
