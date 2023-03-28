import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, Tabs, Layout, Result, Row } from 'antd';
import PageHeader from '../components/layout/header';
import NotificationsPage from '../components/notifications/notificationsPage';
import BackToHome from '../components/shared-components/backToHome';
import Refresh from '../components/shared-components/refresh';

const { Header } = Layout;

export default function Notifications() {
    const [inNotifications, setInNotifications] = useState([]);
    const [outNotifications, setOutNotifications] = useState([]);
    const [type, setType] = useState('Incoming');
    const [flag, setFlag] = useState(false);
    const { data: session, status } = useSession();

    const onTabChange = (key) => {
        setType(key)
    }

    const appendData = async () => {
        if (session) {
            await fetch(`/api/getAllNotifications?username=${session.user.username}`)
                .then(async (res) => await res.json())
                .then((body) => {
                    setInNotifications(body.notifications.incomingNotifications);
                    setOutNotifications(body.notifications.outgoingNotifications);
                });
        }
    };
    useEffect(() => {
        appendData();
    }, [status, flag]);

    return (status === 'authenticated' ?
        <Layout>
            <Header>
                <PageHeader
                    notification
                    session={session} />
            </Header>
            <div style={{ padding: '0px 10px 0px 10px' }}>

                <div style={{ textAlign: 'center' }}><h1>Notifications</h1></div>
                <Card>
                    <Row justify='space-between' style={{marginBottom: '20px'}}>
                        <BackToHome />
                        <Refresh flag={flag} setFlag={setFlag} />
                    </Row>
                    <Tabs
                        defaultActiveKey='Incoming'
                        onChange={onTabChange}
                        items={[
                            {
                                label: 'Received',
                                key: 'Incoming',
                                children: type === 'Incoming' && <NotificationsPage type='incoming' notifications={inNotifications} session={session}/>
                            },
                            {
                                label: 'Sent',
                                key: 'Outgoing',
                                children: type === 'Outgoing' && <NotificationsPage type='outgoing' notifications={outNotifications} session={session} />
                            }
                        ]}
                    />
                </Card>
            </div>
        </Layout>
        :
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
        />
    );
}
