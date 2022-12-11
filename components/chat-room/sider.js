import { Row, Col, Card } from 'antd';
import {
    MehTwoTone
} from '@ant-design/icons';
import styles from './chat.module.css';

export default function PageSider({chatUsers, setCurrentActiveChat}) {

    const handleCurrentActiveChatChange = (currentActiveChatUsername) => {
        setCurrentActiveChat(currentActiveChatUsername)
    }

    return <div className={styles.sider}>
        <Card>
            <Row>
                <Col span={24}>
                    <h3 style={{marginTop:'0'}}>Your Chats</h3>
                </Col>
            </Row>
            {chatUsers.map(user => (
            <Row 
                className={styles.chatRow}
                key={user.username}
                onClick={() => handleCurrentActiveChatChange(user.username)}
            >
                <Col span={4}>
                    <MehTwoTone className={styles.chatUserPhoto}/>
                </Col>
                <Col span={20}>
                    <h4 className={styles.chatUserName}>@{user.username}</h4>
                </Col>
            </Row>
            ))}
        </Card>
    </div>
}