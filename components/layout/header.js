import { Row, Col, Popover, Modal } from 'antd';
import {
    SettingFilled,
} from '@ant-design/icons';
import styles from './layout.module.css';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import SearchChatPartner from './header-components/searchChatPartner';
import NavNotification from './header-components/notifications';

const settings = ['Profile Settings', 'Log Out'];

export default function PageHeader({
    home,
    notification,
    profile,
    session,
    chatPartners,
    setChatPartners,
    userNotifications,
    setUserNotifications
}) {
    const [showLogOutModal, setShowLogOutModal] = useState(false);

    const handleSettingOptionClick = (option) => {
        if (option === 'Log Out') {
            setShowLogOutModal(true);
        }
        else if (option === 'Profile Settings') {
            window.location.href = `/profile?user=${session.user.username}`;
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
            <Modal title='Confirm Log Out'
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
            {!home && !notification && !profile ? <Col span={6}>
                <SearchChatPartner
                    session={session}
                    chatPartners={chatPartners}
                    userNotifications={userNotifications}
                    setUserNotifications={setUserNotifications}/>
            </Col> : <></>}
            {!home ?
                <>
                    <Col span={2}>
                        <Row>
                            {!notification && !profile ?
                                <Col span={12}>
                                    <NavNotification
                                        session={session}
                                        userNotifications={userNotifications}
                                        setUserNotifications={setUserNotifications}
                                        chatPartners={chatPartners}
                                        setChatPartners={setChatPartners}/>
                                </Col>
                                :
                                <Col span={12}></Col>}
                            <Col span={12}>
                                <Popover
                                    content={settingOptions}
                                    title='Settings'
                                    trigger='click'
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