import { json } from 'co-body'

export async function createshipment(ctx: Context, next: () => Promise<any>) {

  const {
    clients: { mooveShipment: mooveShipmentClient },
  } = ctx

  const body = await json(ctx.req)

  //console.log(body);

  var key = body.request.apiKey;
  var shipment = body.request.shipment;

  //console.log(key);

  const response = await mooveShipmentClient.createshipment(key, shipment);

  //console.log(response);

  ctx.status = 200
  ctx.body = response

  await next()

}

export async function getshipments(ctx: Context, next: () => Promise<any>) {

  const {
    clients: { mooveShipment: mooveShipmentClient },
  } = ctx

  const body = await json(ctx.req)

  //console.log(body);

  var key = body.request.apiKey;
  var startDate = body.request.startDate;
  var endDate = body.request.endDate;
  var status = body.request.status;

  //console.log(key);

  const response = await mooveShipmentClient.getshipments(key, startDate, endDate, status);

  //console.log(response);

  ctx.status = 200
  ctx.body = response

  await next()

}
