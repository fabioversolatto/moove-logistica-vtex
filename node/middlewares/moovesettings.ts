import { json } from 'co-body'
//import type {ApiSettingsRequest} from './utils/interfaces'

export async function getkey(ctx: Context, next: () => Promise<any>) {

  const {
    clients: { mooveSettings: mooveSettingsClient },
  } = ctx


  var storeName = ctx.vtex.account;

  const response = await mooveSettingsClient.getKey(storeName)

  //console.log(response);

  ctx.status = 200
  ctx.body = response

  await next()

}

export async function savekey(ctx: Context, next: () => Promise<any>) {

  const {
    clients: { mooveSettings: mooveSettingsClient },
  } = ctx


  var storeName = ctx.vtex.account;

  const body = await json(ctx.req)

  //console.log(body);

  var key = body.request.apiKey;

  //console.log(key);

  const response = await mooveSettingsClient.saveKey(storeName, key)

  //console.log(response);

  ctx.status = 200
  ctx.body = response

  await next()

}
