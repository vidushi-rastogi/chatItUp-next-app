import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, message, Row, Col, Tooltip } from 'antd';
import VirtualList from 'rc-virtual-list';
import {
    UserOutlined,
} from '@ant-design/icons';
import ActionButtons from './actionButtons';

const NotificationDate = (date) => {
    let d = new Date(date.date);
    const month = d.getMonth() + 1 > 9 ? `${d.getMonth() + 1}` : `0${d.getMonth() + 1}`
    const dateTime = `${d.getDate()}-${month}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    return <p style={{
        margin: '0',
        padding: '0',
        color: 'rgb(157, 157, 157)'
    }}>
        {dateTime}
    </p>
}

const NotificationDescription = ({ type, notificationType, timestamp }) => (
    <>
        {notificationType === 'chat_request' ?
            type === 'incoming' ?
                <p>Sent you a chat request</p>
                :
                <p>Received a chat request from you</p>
            :
            notificationType === 'request_accepted' ?
                <p>Accepted your chat request</p>
                :
                <></>}
        <NotificationDate date={timestamp}/>
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
    // useEffect(() => {
    //     appendData();
    // }, []);
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
                            description={<NotificationDescription type={type} notificationType={item.type} timestamp={item.timestamp}/>}
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
