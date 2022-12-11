import { Row, Col, Popover, Card, Modal } from 'antd';
import {
    BellFilled,
    SettingFilled
} from '@ant-design/icons';
import styles from './layout.module.css';
import { useState } from 'react';

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


export default function PageHeader({ home, chatNotifications }) {
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
        window.location.href = '/';
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
        <Row>
            <Col span={22} className={styles.header}>
                <h1>ChatItUp!</h1>
            </Col>
            {!home ? <Col span={2}>
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
                :
                <Col span={2}></Col>}
        </Row>
    </div>
}