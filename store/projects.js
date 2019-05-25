import axios from 'axios'

const URL_PROJECTS = 'projects'
const URL_CATEGORIES = 'categories'
const URL_VERSIONS = 'versions'
const URL_USERS = 'users'
const URL_PRIORITIES = 'priorities'

export const state = () => ({
  projectList: [],
  categoryList: [],
  milestoneList: [],
  assigneeList: [],
  priorityList: [],
  selectedProjectId: null,
  selectedCategoryIdList: [],
  selectedMilestoneIdList: [],
  selectedAssigneeIdList: [],
  selectedPriorityIdList: [],
  inputKeyword: ''
})

export const getters = {
  getProjectList(state) {
    return state.projectList.map(project => {
      return {
        id: project.id,
        name: project.name
      }
    })
  },
  getCategoryList(state) {
    return state.categoryList.map(category => {
      return {
        id: category.id,
        name: category.name
      }
    })
  },
  getMilestoneList(state) {
    return state.milestoneList.map(milestone => {
      return {
        id: milestone.id,
        name: milestone.name
      }
    })
  },
  getAssigneeList(state) {
    return state.assigneeList.map(assignee => {
      return {
        id: assignee.id,
        name: assignee.name
      }
    })
  },
  getPriorityList(state) {
    return state.priorityList.map(priority => {
      return {
        id: priority.id,
        name: priority.name
      }
    })
  },
  getSelectedProjectId(state) {
    return state.selectedProjectId
  },
  getSelectedCategoryIdList(state) {
    return state.selectedCategoryIdList
  },
  getSelectedMilestoneIdList(state) {
    return state.selectedMilestoneIdList
  },
  getSelectedAssigneeIdList(state) {
    return state.selectedAssigneeIdList
  },
  getSelectedPriorityIdList(state) {
    return state.selectedPriorityIdList
  },
  getInputKeyword(state) {
    return state.inputKeyword
  }
}

export const mutations = {
  setProjectList(state, projectList) {
    state.projectList = projectList
  },
  setCategoryList(state, categoryList) {
    state.categoryList = categoryList
  },
  setMilestoneList(state, milestoneList) {
    state.milestoneList = milestoneList
  },
  setAssigneeList(state, assigneeList) {
    state.assigneeList = assigneeList
  },
  setPriorityList(state, priorityList) {
    state.priorityList = priorityList
  },
  setSelectedProjectId(state, selectedProjectId) {
    state.selectedProjectId = selectedProjectId
  },
  setSelectedCategoryIdList(state, selectedCategoryIdList) {
    state.selectedCategoryIdList = selectedCategoryIdList
  },
  setSelectedMilestoneIdList(state, selectedMilestoneIdList) {
    state.selectedMilestoneIdList = selectedMilestoneIdList
  },
  setSelectedAssigneeIdList(state, selectedAssigneeIdList) {
    state.selectedAssigneeIdList = selectedAssigneeIdList
  },
  setSelectedPriorityIdList(state, selectedPriorityIdList) {
    state.selectedPriorityIdList = selectedPriorityIdList
  },
  setInputKeyword(state, inputKeyword) {
    state.inputKeyword = inputKeyword
  }
}

export const actions = {
  async fetchProjects({ commit }) {
    commit('setProjectList', [])
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

    if (response.status === 200) {
      commit('setProjectList', response.data)
    }
  },
  async fetchCategories({ commit }, params) {
    commit('setCategoryList', [])
    const response = await axios.get(
      `https://${sessionStorage.getItem(
        'spaceKey'
      )}.backlog.jp/api/v2/${URL_PROJECTS}/${
        params.projectId
      }/${URL_CATEGORIES}`,
      {
        params: {
          apiKey: sessionStorage.getItem('apiKey')
        }
      }
    )

    if (response.status === 200) {
      commit('setCategoryList', response.data)
    }
  },
  async fetchMilestones({ commit }, params) {
    commit('setMilestoneList', [])
    const response = await axios.get(
      `https://${sessionStorage.getItem(
        'spaceKey'
      )}.backlog.jp/api/v2/${URL_PROJECTS}/${params.projectId}/${URL_VERSIONS}`,
      {
        params: {
          apiKey: sessionStorage.getItem('apiKey')
        }
      }
    )

    if (response.status === 200) {
      commit('setMilestoneList', response.data)
    }
  },
  async fetchAssignees({ commit }, params) {
    commit('setAssigneeList', [])
    const response = await axios.get(
      `https://${sessionStorage.getItem(
        'spaceKey'
      )}.backlog.jp/api/v2/${URL_PROJECTS}/${params.projectId}/${URL_USERS}`,
      {
        params: {
          apiKey: sessionStorage.getItem('apiKey')
        }
      }
    )

    if (response.status === 200) {
      commit('setAssigneeList', response.data)
    }
  },
  async fetchPriorities({ commit }) {
    commit('setPriorityList', [])
    const response = await axios.get(
      `https://${sessionStorage.getItem(
        'spaceKey'
      )}.backlog.jp/api/v2/${URL_PRIORITIES}`,
      {
        params: {
          apiKey: sessionStorage.getItem('apiKey')
        }
      }
    )

    if (response.status === 200) {
      commit('setPriorityList', response.data)
    }
  }
}
