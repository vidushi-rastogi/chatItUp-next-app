import React, { useEffect, useState } from 'react';
import { Avatar, List, Row } from 'antd';
import VirtualList from 'rc-virtual-list';
import {
    UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const ChatPartnerList = ({ chatPartners, currentUser }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (chatPartners) {
            setData(chatPartners.slice(0, 5))
        }
    }, [chatPartners])

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

    return <List>
        <VirtualList
            data={data}
            height={350}
            itemHeight={47}
            onScroll={onScroll}
        >
            {(item) => (
                <List.Item key={item}>
                    <List.Item.Meta
                        avatar=
                        {<Avatar
                            //src={item.picture.large} 
                            icon={<UserOutlined />} />}
                        title={
                            <Row justify='start'>
                                <Link href={`/profile?user=${item}`}>
                                    {item === currentUser ? 'you' : `@${item}`}
                                </Link>
                            </Row>
                        }
                    />
                </List.Item>
            )}
        </VirtualList>
    </List>
}

export default ChatPartnerList;