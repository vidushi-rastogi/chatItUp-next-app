import React, { useState } from 'react';
import { Select, Row, Col, notification, Button, Tag } from 'antd';
import {
  UserAddOutlined,
  CheckOutlined,
} from '@ant-design/icons';

const { Option } = Select;

export default function SearchChatPartner({ session, chatPartners, userNotifications, setUserNotifications }) {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');

  const popNotification = (type, message) => {
    notification[type]({
      message
    })
  }

  const addChatPartner = async (partnerUsername) => {
    const res = await fetch('/api/postNotification', {
      method: 'POST',
      body: JSON.stringify({
        fromUser: session.user.username,
        toUser: partnerUsername,
        type: 'chat_request',
        acknowledgement: true,
        timestamp: new Date()
      }),
      header: {
        'Content-Type': 'application/json'
      }
    })
    const status = res.status;
    const data = await res.json();
    if (status === 200) {
      if (userNotifications) {
        const updatedUserNotifications = userNotifications;
        updatedUserNotifications?.outgoingNotifications.push(data.outNotification);
        setUserNotifications(updatedUserNotifications);
      }
      const updatedSearchedUsers = searchedUsers.map(user => {
        if (user.username === partnerUsername) {
          user.addon = 'Request Sent';
        }
        return user;
      })
      setSearchedUsers(updatedSearchedUsers);
      popNotification('success', `Chat request has been sent to @${partnerUsername} :)`);
    }
    else {
      popNotification('error', `Something went wrong while sending chat request to ${partnerUsername} :(`)
    }
  }

  const handleAddChatParter = (username) => {
    notification.open({
      message: `Do you want to send chat request to @${username}?`,
      description:
        <>
          <Button shape='circle' icon={<CheckOutlined />} onClick={() => addChatPartner(username)} />
        </>,
      duration: 2
    });
  }

  const searchUser = async (value) => {
    setSearchedValue(value)
    if (value) {
      await fetch(`/api/getAllUsers?key=${value}`)
        .then((res) => res.json())
        .then((response) => {
          let filteredUsers = [];
          response.users.forEach((user, index) => {
            if (user.username !== session.user.username && !chatPartners.includes(user.username)) {
              userNotifications?.incomingNotifications?.map(notification => {
                if (notification?.sender === user.username 
                    && notification?.type === 'chat_request') {
                  response.users[index].addon = 'Request received'
                }
              })
              userNotifications?.outgoingNotifications?.map(notification => {
                if (notification?.receiver === user.username 
                    && notification?.type === 'chat_request') {
                  response.users[index].addon = 'Request sent'
                }
              })
              filteredUsers.push(user);
            }           
          });
          setSearchedUsers(filteredUsers);
        })
    }
    else {
      setSearchedUsers([]);
    }
  }

  const handleSelectedUser = (value) => {
    setSearchedValue('');
  }

  return (
    <Select
      showSearch
      onSearch={searchUser}
      onSelect={handleSelectedUser}
      style={{ width: '100%' }}
      value={searchedValue}
    >
      {searchedUsers.map(user =>
        <Option value={user.username}>
          <Row justify='space-between'>
            <Col>{user.username}</Col>
            <Col>
              {user.addon ? 
                <Tag>{user.addon}</Tag> 
                :
                <Button
                shape='circle'
                icon={<UserAddOutlined/>}
                onClick={() => handleAddChatParter(user.username)}
              />
              }
            </Col>
          </Row>
        </Option>
      )}
    </Select>
  );
}
