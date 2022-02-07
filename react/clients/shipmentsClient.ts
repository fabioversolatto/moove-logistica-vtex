import axios from 'axios'

export const shipmentsClient = () => {
  return {
    createshipment: (apiKey: String, shipment: any) => {
      var request = {
        apiKey: apiKey,
        shipment: shipment
      };
      return axios.post('/_v/moovelogistica/createShipment', {
        request
      })
    },
    getshipments: (apiKey: String,  startDate: String, endDate: String, status: String) => {
      var request = {
        apiKey: apiKey,
        startDate: startDate,
        endDate: endDate,
        status: status
      };
      return axios.post('/_v/moovelogistica/getShipments', {
        request
      })
    },
  }
}
