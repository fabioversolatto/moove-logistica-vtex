import React, { FC, useState, useEffect } from 'react';
import { Layout, PageBlock, PageHeader, Button,  Table, Tag } from 'vtex.styleguide';
import { vtexClient} from './clients/vtexClient';
import { useRuntime } from 'vtex.render-runtime'

const AdminMooveOrders: FC = () => {

    //States
    const [rows, setRows] = useState([]);

    //Clients
    const clientVtex = vtexClient()

    const { navigate } = useRuntime()

    //Load components
    useEffect(() => {
        if(rows.length == 0){
          loadOrders();
        }
    });

    const loadOrders = () => {
      clientVtex.getorders().then((data : any) => {
          //console.log('data', data.data.list);
          //console.log('data.apiKey', data.data.apiKey);
          setRows(data.data.list);
      });
    };

    const defaultSchema = {
      properties: {
        orderId: {
          title: 'Order Id',
          width: 150,
        },
        clientName: {
          title: 'Client Name',
          width: 150,
        },
        totalItems: {
          title: 'Total Items',
          width: 100,
        },
        creationDate: {
          title: 'Created At',
          width: 200,
        },
        authorizedDate: {
          title: 'Authorized At',
          width: 200,
        },
        action:{
          title: 'Action',
          cellRenderer: () => {
            return (
              <Tag bgColor="#134cd8">
                <span className="nowrap">Create shipment</span>
              </Tag>
            )
          },
        }
      },
    }

    return (
        <Layout
            fullWidth
            pageHeader={
                <PageHeader>
                    <Button href="moove" variation="primary" size="small" >Back to Home</Button>
                </PageHeader>
            }>
            <h4>Orders list</h4>
            <PageBlock>
                <Table
                   fullWidth
                   schema={defaultSchema}
                   items={rows}
                   density="high"
                   onRowClick={({ rowData  } : { rowData : any }) => {
                    //alert(`you just clicked the row with ${rowData.orderId}`)
                    navigate({to: `/admin/app/moovecreateshippingorder?orderId=${rowData.orderId}`})
                  }}
                  />
            </PageBlock >
        </Layout >
    )
}

export default AdminMooveOrders
