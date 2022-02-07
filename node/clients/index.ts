import { IOClients } from '@vtex/api'
import MooveSettings from './moovesettings'
import MooveShipment from './mooveshipment'
import Oms from './oms'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get mooveSettings() {
    return this.getOrSet('mooveSettings', MooveSettings)
  }

  public get mooveShipment() {
    return this.getOrSet('mooveShipment', MooveShipment)
  }

  public get oms() {
    return this.getOrSet('oms', Oms)
  }


}
