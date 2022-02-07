import { json } from 'co-body'

export async function getorders(ctx: Context, next: () => Promise<any>) {

  const {
    clients: { oms: omsClient },
  } = ctx

  // const body = await json(ctx.req)

  // console.log(body);

  const response = await omsClient.getOrders();

  //console.log(response);

  ctx.status = 200
  ctx.body = response

  await next()

}


export async function getorder(ctx: Context, next: () => Promise<any>) {

  const {
    clients: { oms: omsClient },
  } = ctx

  const body = await json(ctx.req)

  //console.log(body);

  var orderId = body.request.orderId;

  const response = await omsClient.getOrderId(orderId);

  //console.log(response);

  ctx.status = 200
  ctx.body = response

  await next()

}
