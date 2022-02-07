import axios from 'axios'

export const vtexClient = () => {
  return {
    getorders: () => {
      return axios.post('/_v/moovelogistica/getOrders', {
      })
    },
    getorder: (orderId : string) => {
      var request = {
        orderId: orderId
      };
      return axios.post('/_v/moovelogistica/getOrder', {
        request
      })
    }
  }
}
