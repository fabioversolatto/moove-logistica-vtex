import { InstanceOptions, IOContext } from '@vtex/api'
import { OMS as VtexOms } from '@vtex/clients'

const routes = {
  baseUrl: () => `/api/oms/pvt`,
  order: (id: string) => `${routes.baseUrl()}/orders/${id}`,
  orders: () => `${routes.baseUrl()}/orders?f_status=ready-for-handling`,
}

const withAuthToken = (options: InstanceOptions | undefined) => ({
  adminUserAuthToken,
  authToken,
}: IOContext) => {
  return {
    ...options?.headers,
    ...{
      VtexIdclientAutCookie: adminUserAuthToken || authToken,
    },
    'X-Vtex-Use-Https': 'true',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
  }
}

export default class Oms extends VtexOms {
  constructor(ioContext: IOContext, opts?: InstanceOptions) {
    super(ioContext, {
      ...opts,
      headers: withAuthToken(opts)(ioContext),
    })
  }

  public async getOrders(): Promise<any> {
    return this.http.get(routes.orders())
  }

  public async getOrderId(orderId: string): Promise<any> {
    return this.http.get(routes.order(orderId))
  }
}

