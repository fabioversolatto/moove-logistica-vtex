import type { InstanceOptions, IOContext} from '@vtex/api';
import { ExternalClient} from '@vtex/api'

export default class MooveSettings extends ExternalClient {
  private TOKEN = "d41d8cd98f00b204e9800998ecf8427e";
  private API_MOOVE_SHOPIFY = "https://mooveshopifapi.herokuapp.com/moove_shopify";

   constructor(context: IOContext, options?: InstanceOptions) {
     super('https://mooveshopifapi.herokuapp.com/moove_shopify', context, options)
    }

  public async getKey(shopOrigin: string): Promise<string> {
    let getApiKeyEndpoint = `${this.API_MOOVE_SHOPIFY}/${shopOrigin}/`;

    // console.log(getApiKeyEndpoint);
    // console.log(this.TOKEN);

    return this.http.get(getApiKeyEndpoint,
      {
        headers: {
            Accept: 'application/json',
            'X-Vtex-Use-Https': 'true',
            Authorization: `Bearer ${this.TOKEN}`
        },
      }
    )
  }

  public async saveKey(shopOrigin: string, apiKey: string): Promise<string> {
    let saveApiKeyEndpoint = `${this.API_MOOVE_SHOPIFY}/${shopOrigin}/${apiKey}/`;

    // console.log(saveApiKeyEndpoint);
    // console.log(this.TOKEN);

    return this.http.post(saveApiKeyEndpoint,
      {},
      {
        headers: {
            Accept: 'application/json',
            'X-Vtex-Use-Https': 'true',
            Authorization: `Bearer ${this.TOKEN}`
        }
      }
    )
  }
}
