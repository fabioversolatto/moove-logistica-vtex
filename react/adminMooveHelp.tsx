import React, { FC } from 'react';
import { Layout, PageBlock, PageHeader, Collapsible, Link, Button } from 'vtex.styleguide';
import { useState, useCallback } from 'react';

const AdminMooveHelp: FC = () => {

    const [openSettings, setOpenSettings] = useState(false);
    const [openCreateShipment, setOpenCreateShipment] = useState(false);
    const [openManageShipment, setOpenManageShipment] = useState(false);
    const [openContacts, setOpenContacts] = useState(false);

    const handleToggleSettings = useCallback(() => setOpenSettings((openSettings) => !openSettings), []);
    const handleToggleCreateShipment = useCallback(() => setOpenCreateShipment((openCreateShipment) => !openCreateShipment), []);
    const handleToggleManageShipment = useCallback(() => setOpenManageShipment((openManageShipment) => !openManageShipment), []);
    const handleToggleOpenContacts = useCallback(() => setOpenContacts((openContacts) => !openContacts), []);

    return (
        <Layout
            fullWidth
            pageHeader={
                <PageHeader>
                    <Button href="moove" variation="primary" size="small" >Back to Home</Button>
                </PageHeader>
            }>
            <p>
                <h4>Moove® Partner Help Session</h4>
            </p>
            <PageBlock>
                <Collapsible
                    header={
                        <div className="pv6 hover-c-on-action-secondary">
                            How to setup your Moove® App?
                        </div>
                    }
                    onClick={handleToggleSettings}
                    isOpen={openSettings}>
                    <div className="bg-muted-5 pa6">
                        <p className="ma0">
                            <p>
                                First of all, to use Moove Shipping App you have to be a Moove's Partner.
                            </p>
                            <p>
                                The first step you have to do is setup the API Key we sent you at the time of onboarding.
                                Click in the button bellow to store the API Key.
                            </p>
                            <p>
                                PS: You have to do this one single time, the key is stored at VTEX database and you'll have to update the key only if a Moove's is required.
                            </p>
                            <p>
                                Click <Link>here</Link> to setup your API Key
                            </p>
                        </p>
                    </div>
                </Collapsible>

                <hr className="ma0 bb bb-0 b--black-10" />

                <Collapsible
                    header={
                        <div className="pv6 hover-c-on-action-secondary">
                            How to create your Shipment?
                        </div>
                    }
                    onClick={handleToggleCreateShipment}
                    isOpen={openCreateShipment}>
                    <div className="bg-muted-5 pa6">
                        <p className="ma0">
                            <p>
                                Once you setup the API Key at Settings session, you are able to create a shipment
                            </p>
                            <p>
                                <p>You have two ways to send your shipments to Moove®: </p>
                                <ul>
                                    <li><b>Create from VTEX Orders:</b></li>
                                    <p>If you access the menu "Create shipments from orders" (or clicking the link bellow); </p>
                                    <p>You'll find out all your VTEX's orders filtered by "Paid" and "Unfulfilled"; </p>
                                    <p>Select the order you want to create a Moove®'s shipment and click at "Create" button; </p>
                                    <p>You'll be redirect to a check-out informations page.</p>
                                    <p>Please check if all informations are correct, select de dispatch date (this is an obligatory information) and send us your shipment.</p>
                                    <p><b>IMPORANT!</b></p>
                                    <p>Update your order status and other informations provided by Moove® at your Store !!! </p>
                                    <p><Link>Go to Manage Orders</Link></p>
                                    <br></br>
                                    <br></br>
                                    <li><b>Create blank Moove®'s Shipment:</b></li>
                                    <p>You can create a shipment at Moove® fulfilling all the informations you have</p>
                                    <p><b>IMPORANT!</b></p>
                                    <p>We strongly recommend you to use this option as a contingency</p>
                                    <p>Click at the link bellow, fulfill all the obligatories fields and click in the "Send" button to send us your request</p>
                                    <p><Link>Go to Create Shipment</Link></p>
                                </ul>
                            </p>
                        </p>
                    </div>
                </Collapsible>

                <hr className="ma0 bb bb-0 b--black-10" />

                <Collapsible
                    header={
                        <div className="pv6 hover-c-on-action-secondary">
                            How to check and manage your Shipment?
                        </div>
                    }
                    onClick={handleToggleManageShipment}
                    isOpen={openManageShipment}>
                    <div className="bg-muted-5 pa6">
                        <p className="ma0">
                            <p>
                                Once you create a shipment, you are able to check and manage this shipments acording to Moove systems.
                            </p>
                            <p>Click at the link bellow, fulfill the period you want to search (these are obligatories fields).</p>
                            <p><Link>Go to Manage Shipments</Link></p>
                        </p>
                    </div>
                </Collapsible>

                <hr className="ma0 bb bb-0 b--black-10" />

                <Collapsible
                    header={
                        <div className="pv6 hover-c-on-action-secondary">
                            How to contact Moove® Team?
                        </div>
                    }
                    onClick={handleToggleOpenContacts}
                    isOpen={openContacts}>
                    <div className="bg-muted-5 pa6">
                        <p className="ma0">
                            <p>
                                If you have additional doubts or problems, we'll be glad to keep in touch !
                            </p>
                            <p>Click at link bellow and go to our contact session.</p>
                            <p><Link href="https://moovelogistica.pt/">Moove Logistica e Transporte</Link></p>
                        </p>
                    </div>
                </Collapsible>
            </PageBlock >
        </Layout >
    )
}

export default AdminMooveHelp