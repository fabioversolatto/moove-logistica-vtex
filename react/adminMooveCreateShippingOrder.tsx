import React, { FC, useState, useEffect } from 'react';
import { Layout, PageBlock, PageHeader, Input, Button, Textarea } from 'vtex.styleguide';
import { settingsClient} from './clients/settingsClient';
import { shipmentsClient} from './clients/shipmentsClient';
import { vtexClient} from './clients/vtexClient';

const AdminMooveCreateShippingOrder: FC = () => {

    //States
    const [orderId, setOrderId] = useState<String>("");
    const [apikey, setApikey] = useState<String>("");
    const [clientNumber, setClientNumber] = useState<String>("");
    const [dispatchDate, setDispatchDate] = useState<String>("");
    const [weightInGrams, setWeightInGrams] = useState<String>("");
    const [widthInCentimeters, setWidthInCentimeters] = useState<String>("");
    const [lengthInCentimeters, setLengthInCentimeters] = useState<String>("");
    const [heightInCentimeters, setHeightInCentimeters] = useState<String>("");
    const [invoiceNumber, setInvoiceNumber] = useState<String>("");
    const [noteOne, setNoteOne] = useState<String>("");
    const [noteTwo, setNoteTwo] = useState<String>("");
    const [recipientCharge, setRecipientCharge] = useState<String>("");
    const [volumesNumber, setVolumesNumber] = useState<String>("");
    const [country, setCountry] = useState<String>("");
    const [zipCode, setZipCode] = useState<String>("");
    const [address, setAddress] = useState<String>("");
    const [city, setCity] = useState<String>("");
    const [state, setState] = useState<String>("");
    const [contactName, setContactName] = useState<String>("");
    const [phone, setPhone] = useState<String>("");
    const [email, setEmail] = useState<String>("");
    const [additionalServices, setAdditionalServices] = useState<String>("");
    const [order, setOrder] = useState<object>();

    //Clients
    const clientSettings = settingsClient()
    const clientShipments = shipmentsClient()
    const clientVtex = vtexClient()

    //Handle Change
    const handleClientNumberChange = (e: any) => {
      setClientNumber(e.target.value);
    }
    const handleDispatchDateChange = (e: any) => {
      setDispatchDate(e.target.value);
    }
    const handleWeightInGramsChange = (e: any) => {
      setWeightInGrams(e.target.value);
    }
    const handleWidthInCentimetersChange = (e: any) => {
      setWidthInCentimeters(e.target.value);
    }
    const handleLengthInCentimetersChange = (e: any) => {
      setLengthInCentimeters(e.target.value);
    }
    const handleHeightInCentimetersChange = (e: any) => {
      setHeightInCentimeters(e.target.value);
    }
    const handleInvoiceNumberChange = (e: any) => {
      setInvoiceNumber(e.target.value);
    }
    const handleNoteOneChange = (e: any) => {
      setNoteOne(e.target.value);
    }
    const handleNoteTwoChange = (e: any) => {
      setNoteTwo(e.target.value);
    }
    const handleRecipientChargeChange = (e: any) => {
      setRecipientCharge(e.target.value);
    }
    const handleVolumesNumberChange = (e: any) => {
      setVolumesNumber(e.target.value);
    }
    const handleCountryChange = (e: any) => {
      setCountry(e.target.value);
    }
    const handleZipCodeChange = (e: any) => {
      setZipCode(e.target.value);
    }
    const handleAddressChange = (e: any) => {
      setAddress(e.target.value);
    }
    const handleCityChange = (e: any) => {
      setCity(e.target.value);
    }
    const handleStateChange = (e: any) => {
      setState(e.target.value);
    }
    const handleContactNameChange = (e: any) => {
      setContactName(e.target.value);
    }
    const handlePhoneChange = (e: any) => {
      setPhone(e.target.value);
    }
    const handleEmailChange = (e: any) => {
      setEmail(e.target.value);
    }
    const handleAdditionalServicesChange = (e: any) => {
      setAdditionalServices(e.target.value);
    }

    //Load components
    useEffect(() => {
      if(apikey == ""){
        initKey();
      }
      if(orderId == ""){
        const params = new URLSearchParams(window.location.search);
        var id = params.get('orderId') as string;
        setOrderId(id);
      }
      if(order == null){
        clientVtex.getorder(orderId as string).then((data:any) => {
          //console.log(data.data);
          setOrder(data.data);
          setClientNumber(data.data.orderId);
          var totalWeight = 0.0;
          for(var i = 0; i < data.data.items.length; i++){
            totalWeight += data.data.items[i].additionalInfo.dimension.weight;
          }
          setWeightInGrams(totalWeight.toString());
          var totalWidth = 0.0;
          for(var i = 0; i < data.data.items.length; i++){
            totalWidth += data.data.items[i].additionalInfo.dimension.width;
          }
          setWidthInCentimeters(totalWidth.toString());
          var totalLength = 0.0;
          for(var i = 0; i < data.data.items.length; i++){
            totalLength += data.data.items[i].additionalInfo.dimension.length;
          }
          setLengthInCentimeters(totalLength.toString());
          var totaHeight  = 0.0;
          for(var i = 0; i < data.data.items.length; i++){
            totaHeight += data.data.items[i].additionalInfo.dimension.height;
          }
          setHeightInCentimeters(totaHeight.toString());
          setInvoiceNumber(data.data.sequence);
          setCountry(data.data.shippingData.address.country);
          setZipCode(data.data.shippingData.address.postalCode);
          setAddress(data.data.shippingData.address.street + "COMPL: " + data.data.shippingData.address.complement);
          setCity(data.data.shippingData.address.city);
          setState(data.data.shippingData.address.state);
          setContactName(data.data.shippingData.address.receiverName);
          setPhone(data.data.clientProfileData.phone);
          setEmail(data.data.clientProfileData.email);
        });
      }
    });

    const initKey = () => {
      clientSettings.getkey("").then((data : any) => {
          //console.log('data', data);
          //console.log('data.apiKey', data.data.apiKey);
          setApikey(data.data.apiKey);
      });
    };

    const sendShippment = () => {
      const shipment = {
          post: {
            client_number: (document.getElementById('txtClientNumber') as HTMLInputElement)?.value,
            dispatch_date: (document.getElementById('txtDispatchDate') as HTMLInputElement)?.value,
            weight_in_grams: (document.getElementById('txtWeightInGrams') as HTMLInputElement)?.value,
            width_in_centimeters: (document.getElementById('txtWidthInCentimeters') as HTMLInputElement)?.value,
            length_in_centimeters: (document.getElementById('txtLengthInCentimeters') as HTMLInputElement)?.value,
            height_in_centimeters: (document.getElementById('txtHeightInCentimeters') as HTMLInputElement)?.value,
            invoice_number: (document.getElementById('txtInvoiceNumber') as HTMLInputElement)?.value,
            note_1: (document.getElementById('txtNoteOne') as HTMLInputElement)?.value,
            note_2: (document.getElementById('txtNoteTwo') as HTMLInputElement)?.value,
            recipient_charge: (document.getElementById('txtRecipientCharge') as HTMLInputElement)?.value,
            volumes: (document.getElementById('txtRecipientCharge') as HTMLInputElement)?.value
          },
          recipient_address: {
            country: (document.getElementById('txtCountry') as HTMLInputElement)?.value,
            zipcode: (document.getElementById('txtZipCode') as HTMLInputElement)?.value,
            street_name: (document.getElementById('txtAddress') as HTMLInputElement)?.value,
            city: (document.getElementById('txtCity') as HTMLInputElement)?.value,
            state: (document.getElementById('txtState') as HTMLInputElement)?.value,
          },
          recipient_data: {
            name: (document.getElementById('txtContactName') as HTMLInputElement)?.value,
            phone_1: (document.getElementById('txtPhone') as HTMLInputElement)?.value,
            email: (document.getElementById('txtEmail') as HTMLInputElement)?.value,
          },
          additional_services: [
            (document.getElementById('txtAdditionalServices') as HTMLInputElement)?.value
          ]
      };


      clientShipments.createshipment(apikey, shipment);

      alert("Shipment sent to Moove successfully");

    };

    return (
        <Layout
            fullWidth
            pageHeader={
                <PageHeader>
                    <Button href="moove" variation="primary" size="small" >Back to Home</Button>
                </PageHeader>
            }>
            <h4>Create shipment from Order ID: {orderId}</h4>
            <PageBlock>
                <Input
                    id="txtClientNumber"
                    value={clientNumber}
                    onChange={handleClientNumberChange}
                    label="Client number"
                    type="text"
                    placeholder="Insert the request identification."
                    disabled="true"
                />
                <Input
                    id="txtDispatchDate"
                    value={dispatchDate}
                    onChange={handleDispatchDateChange}
                    type="date"
                    error={dispatchDate ? "" : "Dispatch date is required"}
                    label="Dispatch date"
                    placeholder="Insert the object shipping date."
                />
                <Input
                    id="txtWeightInGrams"
                    value={weightInGrams}
                    onChange={handleWeightInGramsChange}
                    disabled="true"
                    type="decimal"
                    label="Weight"
                    placeholder="Insert the object weight in grams."
                />
                <Input
                    id="txtWidthInCentimeters"
                    value={widthInCentimeters}
                    onChange={handleWidthInCentimetersChange}
                    type="decimal"
                    label="Width (optional)"
                    placeholder="Insert the object width in centimeters."
                />
                <Input
                    id="txtLengthInCentimeters"
                    value={lengthInCentimeters}
                    onChange={handleLengthInCentimetersChange}
                    type="decimal"
                    label="Length (optional)"
                    placeholder="Insert the object length in centimeters."
                />
                <Input
                    id="txtHeightInCentimeters"
                    value={heightInCentimeters}
                    onChange={handleHeightInCentimetersChange}
                    type="decimal"
                    label="Height (optional)"
                    placeholder="Insert the object height in centimeters."
                />
                <Input
                    id="txtInvoiceNumber"
                    value={invoiceNumber}
                    onChange={handleInvoiceNumberChange}
                    type="text"
                    label="Invoice number (optional)"
                    placeholder="Insert the document number."
                />
                <Input
                    id="txtNoteOne"
                    value={noteOne}
                    onChange={handleNoteOneChange}
                    type="text"
                    label="Notes (optional)"
                    placeholder="Insert the post notes."
                />
                <Input
                    id="txtNoteTwo"
                    value={noteTwo}
                    onChange={handleNoteTwoChange}
                    type="text"
                    label="Additional notes (optional)"
                    placeholder="Insert the additional internal notes about posting."
                />
                <Input
                    id="txtRecipientCharge"
                    value={recipientCharge}
                    onChange={handleRecipientChargeChange}
                    type="text"
                    label="Recipient charge (optional)"
                    placeholder="Insert the Amount to be charged at destination, if applicable. Can only be completed if 'bill at destination' has been selected as an additional service."
                />
                <Input
                    id="txtVolumesNumber"
                    value={volumesNumber}
                    onChange={handleVolumesNumberChange}
                    type="number"
                    label="Number of post volumes (optional)"
                    placeholder="Insert the number of post volumes."
                />
                <Input
                    id="txtCountry"
                    value={country}
                    onChange={handleCountryChange}
                    type="text"
                    disabled="true"
                    label="Recipient's country"
                    placeholder="Insert the recipient's country."
                />
                <Input
                    id="txtZipCode"
                    value={zipCode}
                    onChange={handleZipCodeChange}
                    type="text"
                    disabled="true"
                    label="Recipient's ZIP code"
                    placeholder="Insert the recipient's ZIP code."
                />
                <Input
                    id="txtAddress"
                    value={address}
                    onChange={handleAddressChange}
                    type="text"
                    label="Recipient's address"
                    disabled="true"
                    placeholder="Insert the recipient's address."
                />
                <Input
                    id="txtCity"
                    value={city}
                    onChange={handleCityChange}
                    type="text"
                    disabled="true"
                    label="Recipient's city"
                    placeholder="Insert the recipient's city."
                />
                <Input
                    id="txtState"
                    value={state}
                    onChange={handleStateChange}
                    type="text"
                    disabled="true"
                    label="Recipient's state"
                    placeholder="Insert the recipient's state."
                />
                <Input
                    id="txtContactName"
                    value={contactName}
                    onChange={handleContactNameChange}
                    type="text"
                    disabled="true"
                    label="Recipient's contact name"
                    placeholder="Insert the recipient's contact name."
                />
                <Input
                    id="txtPhone"
                    value={phone}
                    onChange={handlePhoneChange}
                    type="phone"
                    label="Recipient's phone number (optional)"
                    placeholder="Insert the recipient's phone number."
                />
                <Input
                    id="txtEmail"
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    label="Recipient's email address  (optional)"
                    placeholder="Insert the recipient's email address."
                />
                <Textarea
                    id="txtAdditionalServices"
                    value={additionalServices}
                    onChange={handleAdditionalServicesChange}
                    maxLength="100"
                    label="Additional services (optional)"
                    placeholder="Insert additional services requested by the customer for posting."
                />
                <br></br>
                <div className="pt2">
                    <Button size="small"  onClick={sendShippment}>
                        Create
                    </Button>
                </div>
            </PageBlock >
        </Layout >
    )
}

export default AdminMooveCreateShippingOrder
