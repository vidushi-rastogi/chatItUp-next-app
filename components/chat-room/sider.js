import { Row, Col, Card } from 'antd';
import {
    MehTwoTone
} from '@ant-design/icons';
import styles from './chat.module.css';

export default function PageSider({ setCurrentActiveChat, chatPartners, currentActiveChat}) {

    const handleCurrentActiveChatChange = (currentActiveChatUsername) => {
        setCurrentActiveChat(currentActiveChatUsername)
    }

    return <div className={styles.sider}>
        <Card>
            <Row>
                <Col span={24}>
                <span className='font-bold text-lg'>Your Chats</span>
                </Col>
            </Row>
            {chatPartners.map(partner => (
            <>
            <Row 
                className={styles.chatRow}
                key={partner}
                style={{ backgroundColor: partner === currentActiveChat && "#bde0ff" }}
                onClick={() => handleCurrentActiveChatChange(partner)}
            >
                <Col span={4}>
                    <MehTwoTone className={styles.chatUserPhoto}/>
                </Col>
                <Col span={20}>
                    <h4 className={styles.chatUserName}>@{partner}</h4>
                </Col>
            </Row>
            <Row 
            className={styles.chatRow}
            key={partner}
            style={{ backgroundColor: partner === currentActiveChat && "#bde0ff" }}
            onClick={() => handleCurrentActiveChatChange(partner)}
        >
            <Col span={4}>
                <MehTwoTone className={styles.chatUserPhoto}/>
            </Col>
            <Col span={20}>
                <h4 className={styles.chatUserName}>@{partner}</h4>
            </Col>
        </Row>
        <Row 
                className={styles.chatRow}
                key={partner}
                style={{ backgroundColor: partner === currentActiveChat && "#bde0ff" }}
                onClick={() => handleCurrentActiveChatChange(partner)}
            >
                <Col span={4}>
                    <MehTwoTone className={styles.chatUserPhoto}/>
                </Col>
                <Col span={20}>
                    <h4 className={styles.chatUserName}>@{partner}</h4>
                </Col>
            </Row>
           
        </>
            ))}
        </Card>
    </div>
}