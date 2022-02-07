import React, { FC, useState, useEffect } from 'react';
import { Layout, PageBlock, PageHeader, Input, Button, Dropdown, IconSearch, Table } from 'vtex.styleguide';
import { shipmentsClient} from './clients/shipmentsClient';
import { settingsClient} from './clients/settingsClient';

const AdminMooveManageShipping: FC = () => {

    //States
    const [apikey, setApikey] = useState<String>("");
    const [startDate, setStartDate] = useState<String>("");
    const [endDate, setEndDate] = useState<String>("");
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [rows, setRows] = useState([]);

    const options = [
        { value: 'all', label: 'All' },
        { value: 'association_pending', label: 'Association Pending' },
        { value: 'await_post', label: 'Await Post' },
        { value: 'canceled', label: 'Canceled' },
        { value: 'failure_1', label: 'Failure 1st' },
        { value: 'failure_2', label: 'Failure 2nd' },
        { value: 'failure_3', label: 'Failure 3rd' },
        { value: 'in_distribution', label: 'In Distribution' },
        { value: 'not_picked', label: 'Not Picked' },
        { value: 'picked', label: 'Picked' },
        { value: 'success', label: 'Success' }
    ]

    //Clients
    const clientSettings = settingsClient()
    const clientShipments = shipmentsClient()

    //Handle Change
    const handleStartDateChange = (e: any) => {
      setStartDate(e.target.value);
    }
    const handleEndDateChange = (e: any) => {
      setEndDate(e.target.value);
    }
    const handleSelectChange = (e: any) => {
      setSelectedStatus(e.target.value);
    }

    //Load components
    useEffect(() => {
      if(apikey == ""){
        initKey();
      }
    });

    const initKey = () => {
      clientSettings.getkey("").then((data : any) => {
          //console.log('data', data);
          //console.log('data.apiKey', data.data.apiKey);
          setApikey(data.data.apiKey);
      });
    };

    const defaultSchema = {
      properties: {
        client_number: {
          title: 'Client #',
          width: 200,
        },
        tracking_code: {
          title: 'Tracking Code',
          width: 200,
        },
        dispatch_date: {
          title: 'Dispatch Date',
          width: 150,
        },
        weight_in_grams: {
          title: 'Weight (gms)',
          width: 150,
        },
        status: {
          title: 'Status',
          width: 150,
        },
        created_at: {
          title: 'Created At',
          width: 200,
        }
      },
    }

    const lineActions = [
      {
        label: ({ rowData } : { rowData : any }) => `Print tag for ${rowData.tracking_code}`,
        onClick: ({ rowData }: { rowData : any }) => {
          for(var i = 0; i < rows.length; i++){
            var obj : any = rows[i];
            if(obj.tracking_code == rowData.tracking_code){
              if(obj.carrier_file_binary == null){
                alert("No tag data available to print! Please contact Moove");
              } else {
                var pdfAsDataUri = "data:application/pdf;base64,"+obj.carrier_file_binary;
                window.open(pdfAsDataUri, '_blank');
              }
            }
          }

        },
      },
      {
        label: ({ rowData } : { rowData : any }) => `Print receipt deliver for ${rowData.tracking_code}`,
        onClick: ({ rowData } : { rowData : any }) =>
        {
          for(var i = 0; i < rows.length; i++){
            var obj : any = rows[i];
            if(obj.tracking_code == rowData.tracking_code){
              if(obj.deliver_receipt_link == null){
                alert("No receipt deliver available to print! Please contact Moove");
              } else {
                window.open(obj.deliver_receipt_link, '_blank');
              }
            }
          }
        }
      },
    ]

    const searchShippment = () => {
      var startDate = (document.getElementById('txtStartDate') as HTMLInputElement)?.value;
      var endDate = (document.getElementById('txtEndDate') as HTMLInputElement)?.value;
      filterShipment(startDate, endDate, selectedStatus);

    };

    async function filterShipment(startDate: any, endDate: any, status: any){

      clientShipments.getshipments(apikey, startDate, endDate, status).then((data : any) => {
        //console.log('data', data.data);
        if(data.data.posts){
          let dataSet : any = [];

          for(var i in data.data.posts){

            var status : any = "";
            if(data.data.posts[i].carrier_status == 'picked'){
                status = 'Picked';
            }else if(data.data.posts[i].carrier_status == 'not_picked'){
                status = 'Not Picked';
            }else if(data.data.posts[i].carrier_status == 'canceled'){
                status = 'Canceled';
            }else if(data.data.posts[i].carrier_status == 'in_distribution'){
                status = 'In Distribution';
            }else if(data.data.posts[i].carrier_status == 'failure_1'){
                status = 'Failure 1st';
            }else if(data.data.posts[i].carrier_status == 'failure_2'){
                status = 'Failure 2nd';
            }else if(data.data.posts[i].carrier_status == 'failure_3'){
                status = 'Failure 3rd';
            }else if(data.data.posts[i].carrier_status == 'success'){
                status = 'Success';
            }else if(data.data.posts[i].carrier_status == 'await_post'){
                status = 'Await Post';
            }else if(data.data.posts[i].carrier_status == 'association_pending'){
                status = 'Association Pending';
            }else if(data.data.posts[i].carrier_status == 'awaiting_post'){
              status = 'Awaiting Post';
            }else if(data.data.posts[i].carrier_status == 'posted'){
              status = 'Posted';
            }else{
                status = 'Unknown';
            }
            var obj = {
              'client_number': data.data.posts[i].client_number,
              'tracking_code': data.data.posts[i].tracking_code,
              'dispatch_date': data.data.posts[i].dispatch_date.replace(" 00:00:00",""),
              'weight_in_grams': data.data.posts[i].weight_in_grams,
              'status': status,
              'created_at': data.data.posts[i].created_at,
              'carrier_file_binary': data.data.posts[i].carrier_file_binary,
              'deliver_receipt_link': data.data.posts[i].deliver_receipt_link,
            }
            dataSet.push(obj);
          }
          //console.log('dataset', dataSet);
          setRows(dataSet);
        }
      });
    }

    return (
        <Layout
            fullWidth
            pageHeader={
                <PageHeader>
                    <Button href="moove" variation="primary" size="small" >Back to Home</Button>
                </PageHeader>
            }>
            <h4>Manage shipments</h4>
            <PageBlock>
                <p>Filter</p>
                <br></br>
                <Input
                    id="txtStartDate"
                    label="Start date"
                    value={startDate}
                    type="date"
                    helpText={
                        <span>
                            Insert start date filter.
                        </span>
                    }
                    onChange={handleStartDateChange}
                    error={startDate ? "" : "Start date is required"}
                    prefix={<IconSearch />}
                />
                <br></br>
                <Input
                    id="txtEndDate"
                    label="End date"
                    value={endDate}
                    type="date"
                    helpText={
                        <span>
                            Insert end date filter.
                        </span>
                    }
                    onChange={handleEndDateChange}
                    error={endDate ? "" : "End date is required"}
                    prefix={<IconSearch />}
                />
                <br></br>
                <Dropdown
                    label="Status"
                    options={options}
                    value={selectedStatus}
                    onChange={handleSelectChange}
                />
                <br></br>
                <div className="pt2">
                    <Button size="small" onClick={searchShippment}>
                        Search
                    </Button>
                </div>
                <br/>
                <br/>
                <Table
                   fullWidth
                   schema={defaultSchema}
                   items={rows}
                   density="high"
                   lineActions={lineActions}
                  />
            </PageBlock >
        </Layout >
    )
}

export default AdminMooveManageShipping
