import React, { FC } from 'react';
import { Layout, PageBlock, Card, Link, Divider, Button } from 'vtex.styleguide';

const AdminMoove: FC = () => {
    return (
        <Layout>
            <PageBlock variation="aside">
                <div>
                    <Card>
                        <h4>Main Menu</h4>
                        <p>Moove®'s options for your shipping management</p>
                        <Button variation="primary" block href="mooveorders">
                            Create shipments from orders
                        </Button>
                        <Divider orientation="horizontal" />
                        <Button variation="primary" block href="moovemanageshipping">
                            Manage Moove's shipments
                        </Button>
                        <Divider orientation="horizontal" />
                        <Button variation="primary" block href="moovecreateshipping">
                            Create manual shipment
                        </Button>
                        <Divider orientation="horizontal" />
                        <Button variation="primary" block href="moovesettings">
                            Edit settings
                        </Button>
                    </Card>
                </div>
                <div>
                    <Card>
                        <h4>Moove®'s Partner</h4>
                        <p>To use Moove® Shipping App, you have to be a Moove®'s Partner.</p>
                        <p>Click <Link href="moovesettings">here</Link> to setup your environment</p>
                    </Card>
                    <Divider orientation="horizontal" />
                    <Card>
                        <h4>Moove®'s Support</h4>
                        <p>If you need a help click <Link href="moovehelp">here</Link></p>
                    </Card>
                </div>
            </PageBlock>
        </Layout>
    )
}

export default AdminMoove
