import axios from 'axios'

const URL_SPACE = 'space'

export const state = () => ({
  loggedInFlag: false
})

export const getters = {
  getLoggedInFlag(state) {
    return state.loggedInFlag
  }
}

export const mutations = {
  setLoggedInFlag(state, loggedInFlag) {
    state.loggedInFlag = loggedInFlag
  }
}

export const actions = {
  async doAuthentication(context, params) {
    commit('setLoggedInFlag', false)
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

    // OKだったらspaceKeyとapiKeyをsessionStorageに保持する
    sessionStorage.setItem('spaceKey', params.spaceKey)
    sessionStorage.setItem('apiKey', params.apiKey)
    
    commit('setLoggedInFlag', true)

    return true
  }
}
