import axios from 'axios'

export const settingsClient = () => {
  return {
    getkey: (storeName: string) => {
      var request = {
        storeName: storeName
      };
      return axios.post('/_v/moovelogistica/key', {
        request
      })
    },
    savekey: (storeName: string, apiKey: string) => {
      var request = {
        storeName: storeName,
        apiKey: apiKey
      };
      return axios.post('/_v/moovelogistica/createkey', {
        request
      })
    },
  }
}
