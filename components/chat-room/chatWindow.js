import { Row, Col, Result } from 'antd';
import {
    SmileOutlined,
    WechatOutlined
} from '@ant-design/icons';
import styles from './chat.module.css';

const ChatDate = (date) => {
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

export default function ChatLog({ userChats, session, currentActiveChat }) {
    const activeChat = userChats && userChats.filter(chat => chat.participants.includes(currentActiveChat))[0];
    const initialChatWindow = (
        <>
            <p>Welcome to your chat room.</p>
            <p>Let&apos;s ChatItUp! <SmileOutlined /></p>
        </>
    )

    return <div style={{
        padding: '20px',
        overflowY: 'auto',
        height: '75vh'
    }}>
        {activeChat ? activeChat.chats.map(chatLog =>
            <Row key={chatLog.username} className={chatLog.username === session.user.username ? styles.chatUserSide : styles.chatOtherSide}>
                <Col className={chatLog.username === session.user.username ? styles.chatUserBubble : styles.chatOtherBubble}>
                    <p className="text-black m-0 p-0">{chatLog.content}</p>
                    <div style={{ textAlign: 'end', paddingTop: '3px' }}>
                        <ChatDate date={chatLog.timestamp}/>
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