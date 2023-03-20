import React, { useState, useEffect } from "react";
import { Row, Col, Dropdown, Badge, Button, Avatar, List } from 'antd';
import {
    BellFilled
} from '@ant-design/icons';
import styles from '../layout.module.css';

const getNotificationBody = list => {
    return list.length > 0 ?
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Row justify='center'>
            <div>
              <Avatar icon={getIcon(item.icon)}/>
            </div>
            <div>
              <span>{item.name}</span>
              <span>{item.desc}</span>
            </div>
            <small>{item.time}</small>
          </Row>
        </List.Item>
      )}
    />
    :
    <div className="empty-notification">
      <img src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg" alt="empty" />
      <p className="mt-3">You have viewed all notifications</p>
    </div>;
  }

const Notifications = ({ userNotifications, setUserNotifications }) => {
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setNotifications(userNotifications?.incomingNotifications)
    }, [userNotifications])

    const notificationsList = (
        <div>
            <Row justify='space-between'>
                <h4>Notification</h4>
                <Button type="text" onClick={() => setNotifications([])} size="small">Clear</Button>
            </Row>
            {/* <div>
                {getNotificationBody(notifications)}
            </div> */}
            {/* {
                notifications.length > 0 ?
                    <div>
                        <a>View all</a>
                    </div>
                    :
                    null
            } */}
        </div>
    );
    return (
        <Dropdown
            placement="bottomRight"
            overlay={notificationsList}
            onVisibleChange={(flag) => setVisible(flag)}
            visible={visible}
            trigger={['click']}
        >
            <Badge count={notifications ? notifications?.length : 0}>
                <BellFilled type="bell" className={styles.headerIcons} />
            </Badge>
        </Dropdown>
    )
}

export default Notifications;