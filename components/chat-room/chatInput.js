import { Row, Col, Card, Affix, Input, notification } from 'antd';
import {
    SmileOutlined,
    PaperClipOutlined,
    SendOutlined
} from '@ant-design/icons';
import { useState } from 'react';

const popNotification = (type, message) => {
    notification[type]({
        message,
    });
};

export default function ChatInput({
    session,
    currentActiveChat,
    userChats,
    setUserChats,
}) {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (message) {
            const chatMessage = {
                username: session.user.username,
                content: message,
                contentType: 'text',
                timestamp: new Date(),
            };
            const res = await fetch('/api/postMessage', {
                method: 'POST',
                body: JSON.stringify({
                    chatMessage: chatMessage,
                    chatParticipants: [session.user.username, currentActiveChat],
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                const updateChats = await fetch(
                    `/api/getUserChats?username=${session.user.username}`,
                    {
                        method: 'GET',
                    }
                ).then(async (res) => {
                    return await res.json();
                });
                setUserChats(updateChats.chats);
                setMessage('');
            } else {
                popNotification(
                    'error',
                    'Something went wrong while sending your message :('
                );
            }
        }
    };

    const emoticonsSelect = <SmileOutlined />;

    const attachAndSendOptions = (
        <Row style={{ width: '90px' }}>
            <Col span={12}>
                <PaperClipOutlined />
            </Col>
            <Col span={12}>
                <SendOutlined onClick={handleSendMessage} />
            </Col>
        </Row>
    )

    return <div style={{
        // maxHeight: '10vh'
    }}>
        <Affix offsetBottom={0}>
            <Row>
                <Col span={24}>
                    <Card>
                        <Input
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            addonBefore={emoticonsSelect}
                            addonAfter={attachAndSendOptions}
                            placeholder='Enter your message here...' />
                    </Card>
                </Col>
            </Row>
        </Affix>
    </div>
}
