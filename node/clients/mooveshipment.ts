import type { InstanceOptions, IOContext} from '@vtex/api';
import { ExternalClient} from '@vtex/api'

export default class MooveShipment extends ExternalClient {

  private API_MOOVE = "https://api.moovelogistica.pt/moove_api/v1";
  //private API_ORDERS = "/admin/api/2021-07/orders";

  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://api.moovelogistica.pt/moove_api/v1', context, options)
  }

  public async createshipment(apiKey: string, obj: any): Promise<string> {
      let token = apiKey;
      let createEndpoint = `${this.API_MOOVE}/criar_postagem`;

      // console.log('token', token);
      // console.log('createEndpoint', createEndpoint);
      // console.log('obj', obj);

      let bodyObj: any =   {
        posts: [{
            post: {
                client_number: obj.post.client_number,
                dispatch_date: obj.post.dispatch_date,
                weight_in_grams:  parseFloat(obj.post.weight_in_grams),
            },
            recipient_address: {
                country: obj.recipient_address.country,
                zipcode:  obj.recipient_address.zipcode,
                street_name:  obj.recipient_address.street_name,
                city:  obj.recipient_address.city,
                state:  obj.recipient_address.state,
            },
            recipient_data: {
                name: obj.recipient_data.name,
            },
        }]
      };

      if(obj.post.width_in_centimeters != ''){
        bodyObj.posts[0].post['width_in_centimeters'] = parseFloat(obj.post.width_in_centimeters);
      }

      if(obj.post.length_in_centimeters != ''){
        bodyObj.posts[0].post['length_in_centimeters'] = parseFloat(obj.post.length_in_centimeters);
      }

      if(obj.post.height_in_centimeters != ''){
        bodyObj.posts[0].post['height_in_centimeters'] = parseFloat(obj.post.height_in_centimeters);
      }

      if(obj.post.invoice_number != ''){
        bodyObj.posts[0].post['invoice_number'] = obj.post.invoice_number;
      }

      if(obj.post.note_1 != ''){
        bodyObj.posts[0].post['note_1'] = obj.post.note_1;
      }

      if(obj.post.note_2 != ''){
        bodyObj.posts[0].post['note_2'] = obj.post.note_2;
      }

      if(obj.post.recipient_charge != ''){
        bodyObj.posts[0].post['recipient_charge'] = obj.post.recipient_charge;
      }

      if(obj.post.volumes != ''){
        bodyObj.posts[0].post['volumes'] = parseInt(obj.post.volumes);
      }

      if(obj.recipient_data.phone_1 != ''){
        bodyObj.posts[0].recipient_data['phone_1'] = obj.recipient_data.phone_1;
      }

      if(obj.recipient_data.email != ''){
        bodyObj.posts[0].recipient_data['email'] = obj.recipient_data.email;
      }

      if(obj.additional_services[0] != ''){
        bodyObj.posts[0].additional_services = obj.additional_services;
      }

      //console.log('body', bodyObj);

      return this.http.post(createEndpoint,
        bodyObj,
        {
          headers: {
              Accept: 'application/json',
              'X-Vtex-Use-Https': 'true',
              Authorization: `${token}`
          }
        }
      )
  }


  public async getshipments(apiKey: string, startDate: string, endDate : string, status : string): Promise<string> {
    let token = apiKey;
    let getEndpoint = `${this.API_MOOVE}/customer_posts?start_date=${startDate}&end_date=${endDate}&limit=50`;
    if(status != 'all' && status.length != 0){
        getEndpoint = getEndpoint + `&status=${status}`;
    }

    // console.log('token', token);
    // console.log('getEndpoint', getEndpoint);

    return this.http.get(getEndpoint,
        {
          headers: {
              Accept: 'application/json',
              'X-Vtex-Use-Https': 'true',
              Authorization: `${token}`
          }
        }
      )

  }
}
