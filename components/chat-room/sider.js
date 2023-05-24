import { Row, Col, Card, Avatar } from 'antd';
import styles from './chat.module.css';
import Link from 'next/link';

export default function PageSider({ setCurrentActiveChat, currentActiveChat,chatPartners}) {

    const handleCurrentActiveChatChange = (currentActiveChatUsername) => {
        setCurrentActiveChat(currentActiveChatUsername)
    }

    return <div className={styles.sider}>
        <Card>
            <Row>
                <Col span={24}>
                    <h3 className='mt-0'>Your Chats</h3>
                </Col>
            </Row>
            {chatPartners.map(partner => (
            <Row 
                className={currentActiveChat === partner ? styles.currentChatRow : styles.chatRow}
                key={partner}
                onClick={() => handleCurrentActiveChatChange(partner)}
            >
                <Col span={4}>
                    <Avatar size="large" src={'/default-profile-image.png'} />
                </Col>
                <Col span={20}>
                    <h4 className={styles.chatUserName}>
                        <Link href={`/profile?user=${partner}`}>@{partner}</Link>
                    </h4>
                </Col>
            </Row>
            ))}
        </Card>
    </div>
}