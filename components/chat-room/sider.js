import { Row, Col, Card, List, Avatar } from 'antd';
import {
    MehTwoTone
} from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import styles from './chat.module.css';

export default function PageSider({ setCurrentActiveChat, chatPartners, currentActiveChat }) {

    const handleCurrentActiveChatChange = (currentActiveChatUsername) => {
        setCurrentActiveChat(currentActiveChatUsername)
    }

    return <div className={styles.sider}>
        <Card>
            <Row className='mb-3'>
                <Col span={24}>
                    <span className='font-bold text-lg'>Your Chats</span>
                </Col>
            </Row>
            <List>
                <VirtualList
                    data={chatPartners}
                    height={400}
                    itemHeight={50}
                >
                    {(partner) => (
                        <List.Item
                            key={partner}
                            className={styles.chatRow}
                            style={{ backgroundColor: partner === currentActiveChat && "#bde0ff" }}
                            onClick={() => handleCurrentActiveChatChange(partner)}
                        >
                            <List.Item.Meta
                                avatar={<MehTwoTone className={styles.chatUserPhoto} />}
                                title={<h4 className={styles.chatUserName}>@{partner}</h4>}
                            />
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </Card>
    </div>
}