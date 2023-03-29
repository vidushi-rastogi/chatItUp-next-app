import React, { useState, useEffect } from 'react';
import { Dropdown, Badge, Button, Avatar, List, Tooltip } from 'antd';
import {
  BellFilled,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { NotificationDateFormat } from '../../shared-components/formatDate';
import NotificationDescription from '../../shared-components/notificationDescription';
import { handleAcceptRequest, handleRemoveRequest } from './actionHandlers';
import styles from '../layout.module.css';

const NotificationBody = ({
  notifications,
  setNotifications,
  userNotifications,
  setUserNotifications,
  session,
  chatPartners,
  setChatPartners
}) => {
  return notifications.length > 0 ?
    <List
      size='small'
      itemLayout='horizontal'
      dataSource={notifications}
      renderItem={item => (
        <List.Item className='cursor-pointer hover:bg-gray-50'>
          <div className='flex content-evenly'>
            <div className='mr-2'>
              <Avatar icon={<BellFilled />} />
            </div>
            <div className='mr-3 flex flex-col'>
              <span className='font-bold'>@{item.sender} </span>
              <span className='text-xs'><NotificationDescription type='incoming' notificationType={item.type} /></span>
            </div>
            <div>
              <div className='flex'>
                {item.type === 'chat_request' &&
                  <Tooltip title='Accept'>
                    <Button
                      size='small'
                      shape='circle'
                      icon={<CheckOutlined />}
                      onClick={() => handleAcceptRequest(
                        item,
                        session,
                        setNotifications,
                        setUserNotifications,
                        userNotifications,
                        chatPartners,
                        setChatPartners
                      )}
                    />
                  </Tooltip>}
                <Tooltip title={item.type === 'chat_request' ? 'Reject' : 'Remove'}>
                  <Button
                    className='ml-2'
                    size='small'
                    danger
                    shape='circle'
                    icon={<CloseOutlined />}
                    onClick={() =>
                      handleRemoveRequest(
                        item,
                        session,
                        setNotifications,
                        setUserNotifications,
                        userNotifications,
                        item.type === 'chat_request' ? 'reject' : 'remove')} />
                </Tooltip>
              </div>
              <small>{NotificationDateFormat(item.timestamp)}</small>
            </div>
          </div>
        </List.Item>
      )}
    />
    :
    <div>
      <div className='text-center'>
        <ExclamationCircleOutlined className='text-5xl text-blue-500' />
      </div>
      <p>You have viewed all notifications</p>
    </div>;
}

const Notifications = ({
  session,
  userNotifications,
  setUserNotifications,
  chatPartners,
  setChatPartners
}) => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (userNotifications?.incomingNotifications) {
      let n = userNotifications?.incomingNotifications?.slice(0, 5);
      setNotifications(userNotifications?.incomingNotifications?.slice(0, 5));
    }
  }, [userNotifications])

  const notificationList = (
    <div className='bg-white p-2 rounded'>
      <div className='text-center'>
        <h4>Notification</h4>
      </div>
      <div className='m-0 p-0'>
        <NotificationBody
          notifications={notifications}
          setNotifications={setNotifications}
          userNotifications={userNotifications}
          setUserNotifications={setUserNotifications}
          session={session}
          chatPartners={chatPartners}
          setChatPartners={setChatPartners}
        />
      </div>
      {
        notifications.length > 0 ?
          <div className='text-center'>
            <a className='mt-2' onClick={() => window.location.href = '/notifications'}>View all</a>
          </div>
          :
          null
      }
    </div>
  );

  return (
    <Dropdown
      placement='bottomRight'
      overlay={notificationList}
      onVisibleChange={(flag) => setVisible(flag)}
      visible={visible}
      trigger={['click']}
    >
      <Badge count={notifications ? notifications?.length : 0}>
        <BellFilled type='bell' className={styles.headerIcons} />
      </Badge>
    </Dropdown>
  )
}

export default Notifications;
