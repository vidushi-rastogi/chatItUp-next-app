import { Row, Col, Popover, Modal } from 'antd';
import {
    BellFilled,
    SettingFilled,
} from '@ant-design/icons';
import styles from './layout.module.css';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import SearchChatPartner from './searchChatPartner';

const settings = ['Profile Settings', 'Privacy Settings', 'Log Out'];

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


export default function PageHeader({ home, chatNotifications, session, chatPartners, setChatPartners }) {
    const [selectedSettingOption, setSelectedSettingOption] = useState('');
    const [showLogOutModal, setShowLogOutModal] = useState(false);

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
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userDetails');
        }
        signOut({ callbackUrl: 'http://localhost:3000' });
        // window.location.href = '/';
    };
    const handleCancelLogOut = () => {
        setShowLogOutModal(false);
    };

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
            {!home ? <Col span={6}>
                        <SearchChatPartner 
                            session={session} 
                            chatPartners={chatPartners}
                            setChatPartners={setChatPartners}/>
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