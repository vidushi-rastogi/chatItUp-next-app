import React, { useState } from 'react';
import { Select, Row, Col, notification, Button } from 'antd';
import {
  UserAddOutlined,
  CheckOutlined,
} from '@ant-design/icons';

const { Option } = Select;

export default function SearchChatPartner({ session }) {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');

  const popNotification = (type, message) => {
    notification[type]({
      message
    })
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
          <Button shape='circle' icon={<CheckOutlined />} onClick={() => addChatPartner(username)} />
        </>,
    });
  }

  const searchUser = async (value) => {
    setSearchedValue(value)
    if (value) {
      await fetch(`/api/getAllUsers?key=${value}`)
        .then((res) => res.json())
        .then((response) => {
          setSearchedUsers(response.users);
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
      style={{ width: "100%" }}
      value={searchedValue}
    >
      {searchedUsers.map(user =>
        <Option value={user.username}>
          <Row justify='space-between'>
            <Col>{user.username}</Col>
            <Col style={{}}>
              <Button
                shape='circle'
                icon={<UserAddOutlined/>}
                onClick={() => handleAddChatParter(user.username)}
              />
            </Col>
          </Row>
        </Option>
      )}
    </Select>
  );
}
