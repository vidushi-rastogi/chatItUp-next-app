import { Row, Col, Card, Affix, Input } from 'antd';
import {
    SmileOutlined,
    PaperClipOutlined,
    SendOutlined
} from '@ant-design/icons';
import { useState } from 'react';

export default function ChatInput({ currentActiveChat }) {
    const [message, setMessage] = useState('');
    
    const handleSendMessage = async () => {
        const res = await fetch('/api/postMessage', {
            method: 'POST',
            body: JSON.stringify({
                message: message,
                chatPartner: currentActiveChat
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await res.json();
        alert(JSON.stringify(response.message));
    }

    const emoticonsSelect = (
        <SmileOutlined />
    )

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
        maxHeight: '10vh'
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
                            placeholder="Enter your message here..." />
                    </Card>
                </Col>
            </Row>
        </Affix>
    </div>
}
