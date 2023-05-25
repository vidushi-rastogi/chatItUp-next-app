import { Row, Col, Card, List, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
import styles from './chat.module.css';
import Link from 'next/link';

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
                                avatar={<Avatar size="large" src={'/default-profile-image.png'} />}
                                title={<Link href={`/profile?user=${partner}`}><h4 className={styles.chatUserName}>@{partner}</h4></Link>}
                            />
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </Card>
    </div>
}