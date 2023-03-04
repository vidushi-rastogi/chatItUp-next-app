import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, message, Row, Col, Tooltip } from 'antd';
import VirtualList from 'rc-virtual-list';
import {
    UserOutlined,
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';

const NotificationDescription = ({ type, notificationType }) => (
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
    </>
)

const ActionButtons = ({type}) => (
    <div>
        {type === 'incoming' ? 
            <Row justify='space-between'>
                <Col span={12}>
                    <Tooltip title='Accept'>
                        <Button 
                            style={{borderColor: '#1677ff', color: '#1677ff', marginRight: '10px'}} 
                            shape='circle'
                            icon={<CheckOutlined />}/>
                    </Tooltip>
                </Col>
                <Col span={12}>
                    <Tooltip title='Reject'>
                        <Button danger shape='circle' icon={<CloseOutlined />}/>
                    </Tooltip>
                </Col>
            </Row>
            :
            <Button danger>Cancel</Button>
        }
    </div>
)

export default function NotificationsPage({ type, notifications }) {
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
                            description={<NotificationDescription type={type} notificationType={item.type} />}
                            title={type === 'incoming' ? <p>{item.sender}</p> : <p>{item.receiver}</p>}
                        />
                        <ActionButtons type={type}/>
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
}
