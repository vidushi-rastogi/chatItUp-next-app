import { Row, Col, Popover, Card, Modal, Input, notification, Button } from 'antd';
import {
    BellFilled,
    SettingFilled,
    UserAddOutlined,
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';
import styles from './layout.module.css';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const settings = ['Profile Settings', 'Privacy Settings', 'Log Out'];
const usernames = [
    'ufuckedup',
    'toobored',
    'naruto',
    'poorhooman',
    'tomuchstress',
    'poopyhead',
    'uunknown',
    'nanamin',
    'mikasa',
    'mimiluv',
    'memeer',
    'viitoo',
    'veeebhav'
]
const { Search } = Input;

const notifications = (chatNotifications) => (
    <div className={styles.notificationsDiv}>
        {chatNotifications.map(notification => (
            <Row className={styles.headerOptionRow}>
                <Col span={16}>{notification.notification}</Col>
                <Col span={8} style={{ textAlign: 'end' }}>{notification.time}</Col>
            </Row>
        ))}
    </div>
)


export default function PageHeader({ home, chatNotifications, session }) {
    const [selectedSettingOption, setSelectedSettingOption] = useState('');
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const [searchedUsername, setSearchedUsername] = useState('');
    const [matchedUsernames, setMatchedUsernames] = useState([]);

    const popNotification = (type, message) => {
        notification[type]({
          message
        })
    }

    const handleSettingOptionClick = (option) => {
        setSelectedSettingOption(option)
        if (option === 'Log Out') {
            setShowLogOutModal(true);
        }
        else {
            window.location.href = '/';
        }
    }

    const handleLogOut = () => {
        setShowLogOutModal(false);
        signOut({ callbackUrl: 'http://localhost:3000' });
        // window.location.href = '/';
    };
    const handleCancelLogOut = () => {
        setShowLogOutModal(false);
    };

    const showMatchedUsernames = (value) => {
        if (value === '') {
            setMatchedUsernames([])
        }
        else {
            const matches = usernames.filter(username => username.startsWith(value));
            setMatchedUsernames(matches);
        }
    }

    const addChatPartner = async (partnerUsername) => {
        console.log(`Add ${partnerUsername} to ${session.user.username}`);
        const res = await fetch('/api/addChatPartner', {
            method: 'POST',
            body: JSON.stringify({
                chatId: `${session.user.username}_${partnerUsername}`,
                chats: []
            }),
            header: {
                'Content-Type': 'application/json'
            }
        });
        const status = res.status;
        const response = await res.json()
        if (status === 200) {
            popNotification('success', 'This user has been added as your chat partner :)');
        }
        else {
            popNotification('error', 'Something went wrong while adding this user as your chat partner :(')
        }
    }

    const handleAddChatParter = (username) => {
        notification.open({
            message: `Do you want to send chat request to @${username}?`,
            description: 
            <>
                <Button shape='circle' icon={<CheckOutlined />} onClick={() => addChatPartner(username)}/>
            </>,
          });
    }

    const settingOptions = (
        <>
            <div>
                {settings.map(setting =>
                    <Row
                        key={setting}
                        className={styles.headerOptionRow}
                        onClick={() => handleSettingOptionClick(setting)}>
                        <Col span={24}>{setting}</Col>
                    </Row>
                )}
            </div>
            <Modal title="Confirm Log Out"
                open={showLogOutModal}
                onOk={handleLogOut}
                onCancel={handleCancelLogOut}
                okText='Yes'
                cancelText='No'>
                <p>You sure you wan to leave your chat room?</p>
            </Modal>
        </>
    )


    return <div>
        <Row justify='space-between'>
            <Col span={3} className={styles.header}>
                <h1>ChatItUp!</h1>
            </Col>
            {!home ? <Col span={6} style={{paddingTop: '10px'}}>
                        <Search
                            placeholder="Search your chat partner"
                            onSearch={value => showMatchedUsernames(value)}
                        />
                {matchedUsernames.length > 0 ?
                    <div className={styles.searchedCard}>
                        {matchedUsernames.map(username =>
                            <Row className={styles.searchedUsername} justify='space-between'>
                                <p style={{ margin: '0px' }}>@{username}</p>
                                <Button 
                                    shape='circle'
                                    icon={<UserAddOutlined />}
                                    onClick={() => handleAddChatParter(username)}/>
                            </Row>
                        )}
                    </div> : <></>}
                    </Col> : <></>}
            {!home ?
                <>
                    <Col span={2}>
                        <Row>
                            <Col span={12}>
                                <Popover
                                    content={notifications(chatNotifications)}
                                    title="Chat Requests"
                                    trigger="click"
                                >
                                    <BellFilled className={styles.headerIcons} />
                                </Popover>
                            </Col>
                            <Col span={12}>
                                <Popover
                                    content={settingOptions}
                                    title="Settings"
                                    trigger="click"
                                >
                                    <SettingFilled className={styles.headerIcons} />
                                </Popover>
                            </Col>
                        </Row>
                    </Col>
                </>
                :
                <Col span={2}></Col>}
        </Row>
    </div>
}