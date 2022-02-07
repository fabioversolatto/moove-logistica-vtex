import React, { FC } from 'react';
import { Layout, PageBlock, PageHeader, Input, Button } from 'vtex.styleguide';
import { useState, useEffect } from 'react';
import { useFullSession } from 'vtex.session-client';
import { settingsClient} from './clients/settingsClient'


const AdminMooveSettings: FC = () => {
    const [apikey, setApikey] = useState<String>("");

    const client = settingsClient()

    useEffect(() => {
      if(apikey == ""){
        initKey();
      }
    });

    const initKey = () => {
      client.getkey("").then((data : any) => {
          //console.log('data', data);
          //console.log('data.apiKey', data.data.apiKey);
          setApikey(data.data.apiKey);
      });
    };



    const getStoreName = () =>{
        const { data } = useFullSession(
            {
                variables: {
                    items: ['account.accountName']
                }
            }
        );
        let dataJson = JSON.stringify({ data });
        let store = dataJson.substring(
            dataJson.indexOf("value"),
            dataJson.indexOf("}}}")
        ).split(':')[1];
        return store;
    };

    const storeApiKey = () => {
        let apiKeyValue = (document.getElementById('txtApiKey') as HTMLInputElement)?.value;
        client.savekey("", apiKeyValue).then((data : any) => {
          alert("API Key updated successfully");
          console.log(data);
        });
    };

    const handelChange = (e: any) => {
        setApikey(e.target.value);
    }



    return (
        <Layout
            fullWidth
            pageHeader={
                <PageHeader>
                    <Button href="moove" variation="primary" size="small" >Back to Home</Button>
                </PageHeader>
            }>
            <h4>Moove® Partner Settings</h4>
            <PageBlock>
                <p>To use Moove® Shipping App, you have to be a Moove®'s Partner.</p>
                <br></br>
                <p>Your store name is: <b> {getStoreName()}  </b> </p>
                <br></br>
                <p>Insert bellow the informations we sent you</p>
                <br></br>
                <Input
                    id="txtApiKey"
                    label="API Key"
                    helpText={
                        <span>
                            Insert the API Key we sent you.
                        </span>
                    }
                    value={apikey}
                    onChange={handelChange}
                />
                <div className="pt2">
                    <Button size="small" onClick={storeApiKey} >
                        Save
                    </Button>
                </div>
            </PageBlock >
        </Layout >
    )
}

export default AdminMooveSettings
