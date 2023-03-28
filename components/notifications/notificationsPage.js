import React, { useState } from 'react';
import { Avatar, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import {
    UserOutlined,
} from '@ant-design/icons';
import ActionButtons from './actionButtons';
import NotificationDescription from '../shared-components/notificationDescription';
import { NotificationDateFormat } from '../shared-components/formatDate';

const Description = ({ type, notificationType, timestamp }) => (
    <>
        <NotificationDescription type={type} notificationType={notificationType}/>
        <p className='p-0 m-0 text-xs'>{NotificationDateFormat(timestamp)}</p>
    </>
)

export default function NotificationsPage({ type, notifications, session }) {
    const totalNotifications = notifications.length;
    const [data, setData] = useState(notifications.slice(0, 5));

    const appendData = () => {
        if (data.length < totalNotifications) {
            if (totalNotifications - data.length > 5) {
                setData([...data, ...notifications.slice(data.length, data.length + 5)]);
            }
            else {
                setData([...data, ...notifications.slice(data.length, data.length + (totalNotifications - data.length))]);
            }
        }
    };

    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === 350) {
            appendData();
        }
    };

    return (
        <List>
            <VirtualList
                data={data}
                height={350}
                itemHeight={47}
                itemKey={"_id"}
                onScroll={onScroll}
            >
                {(item) => (
                    <List.Item key={item._id}>
                        <List.Item.Meta
                            avatar=
                            {<Avatar
                                //src={item.picture.large} 
                                icon={<UserOutlined />} />}
                            description={<Description type={type} notificationType={item.type} timestamp={item.timestamp}/>}
                            title={type === 'incoming' ? <p>{item.sender}</p> : <p>{item.receiver}</p>}
                        />
                        <ActionButtons 
                            type={type} 
                            notification={item} 
                            session={session}
                            setData={setData}
                            />
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
}
