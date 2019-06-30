import axios from 'axios'

const URL_SPACE = 'space'

export const actions = {
  async doAuthentication(context, params) {
    const response = await axios
      .get(`https://${params.spaceUrl}/api/v2/${URL_SPACE}`, {
        params: {
          apiKey: params.apiKey
        }
      })
      .catch(() => {
        return false
      })

    // ステータスコードが200以外ならNG
    if (response.status !== 200) {
      return false
    }

    // OKだったらspaceUrlとapiKeyをsessionStorageに保持する
    sessionStorage.setItem('spaceUrl', params.spaceUrl)
    sessionStorage.setItem('apiKey', params.apiKey)

    return true
  }
}
