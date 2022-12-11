import { Row, Col, Result } from 'antd';
import {
    SmileOutlined,
    WechatOutlined
} from '@ant-design/icons';
import styles from './chat.module.css';

export default function ChatLog({ chatLogs, currentActiveChat }) {
    const userChatLog = chatLogs[currentActiveChat];

    const initialChatWindow = (
        <>
            <p>Welcome to your chat room.</p>
            <p>Let's ChatItUp! <SmileOutlined /></p>
        </>
    )

    return <div style={{
        padding: '20px',
        overflowY: 'auto',
        maxHeight: '90vh'
    }}>
        {userChatLog ? userChatLog.map(chatLog =>
            <Row className={chatLog.side === 'user' ? styles.chatUserSide : styles.chatOtherSide}>
                <Col className={chatLog.side === 'user' ? styles.chatUserBubble : styles.chatOtherBubble}>
                    <p style={{ margin: '0', padding: '0' }}>{chatLog.message}</p>
                    <div style={{ textAlign: 'end', paddingTop: '3px' }}>
                        <p style={{
                            margin: '0',
                            padding: '0',
                            color: 'rgb(157, 157, 157)'
                        }}>
                            {chatLog.time}
                        </p>
                    </div>
                </Col>
            </Row>
        )
            :
            <Result
                icon={<WechatOutlined />}
                title={initialChatWindow}
            />
        }
    </div>
}