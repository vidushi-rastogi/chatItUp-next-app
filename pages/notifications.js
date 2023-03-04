import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, List, message, Card, Tabs, Layout } from 'antd';
import PageHeader from '../components/layout/header';
import NotificationsPage from '../components/notifications/notificationsPage';

const { Header } = Layout;

export default function Notifications() {
    const [inNotifications, setInNotifications] = useState([]);
    const [outNotifications, setOutNotifications] = useState([]);
    const [type, setType] = useState('Incoming');
    const { data: session, status } = useSession();

    const onTabChange = (key) => {
        setType(key)
    }

    const appendData = async () => {
        if(session) {
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
    }, [status]);

    return (
        <Layout>
        <Header>
            <PageHeader
                notification
                session={session}/>
        </Header>
        <div style={{padding: '0px 10px 0px 10px'}}>
            <div style={{textAlign: 'center'}}><h1>Notifications</h1></div>
            <Card>   
                <Tabs
                    defaultActiveKey='Incoming'
                    onChange={onTabChange}
                    items={[
                        {
                            label: 'Received',
                            key: 'Incoming',
                            children: type === 'Incoming' && <NotificationsPage type='incoming' notifications={inNotifications}/> 
                        },
                        {
                            label: 'Sent',
                            key: 'Outgoing',
                            children: type === 'Outgoing' && <NotificationsPage type='outgoing' notifications={outNotifications}/> 
                        }
                    ]}          
                />
            </Card>
        </div>
        </Layout>
    );
}