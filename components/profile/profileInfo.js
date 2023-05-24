import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Input, notification, Popover } from 'antd';
import {
    EditOutlined,
    CheckOutlined,
    SmileOutlined
} from '@ant-design/icons';
import ProfileImage from './profile-components/profileImg';
import ChatPartnerList from './profile-components/chatPartnersList';
import Link from 'next/link';
import EmojiPicker from 'emoji-picker-react';

const popNotification = (type, message) => {
    notification[type]({
        message
    })
}

const addChatPartner = async (currentUser, partnerUsername) => {
    const res = await fetch('/api/postNotification', {
        method: 'POST',
        body: JSON.stringify({
            fromUser: currentUser,
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
    if (status === 200) {
        popNotification('success', `Chat request has been sent to @${partnerUsername} :)`);
    }
    else {
        popNotification('error', `Something went wrong while sending chat request to ${partnerUsername} :(`)
    }
}

const handleAddChatParter = (currentUser, username) => {
    notification.open({
        message: `Do you want to send chat request to @${username}?`,
        description:
            <>
                <Button shape='circle' icon={<CheckOutlined />} onClick={async () => await addChatPartner(currentUser, username)} />
            </>,
        duration: 2
    });
}

const ProfileInfo =
    ({ session,
        profileUser,
        profileData,
        sentToUsers,
        receivedFromUsers,
    }) => {
        const currentUser = session.user.username;
        const chatPartners = session.user.chatPartners;
        const [statusEditMode, setStatusEditMode] = useState(false);
        const [profileStatus, setProfileStatus] = useState('');

        useEffect(() => {
            if (profileData) {
                setProfileStatus(profileData.profileStatus);
            }
        }, [profileData])

        const handleUpdateStatus = async () => {
            const res = await fetch('/api/updateUserData', {
                method: 'POST',
                body: JSON.stringify({
                    username: profileUser,
                    field: 'profileStatus',
                    value: profileStatus
                })
            })
            if (res.status === 200) {
                popNotification('success', 'Profile status got updated successfully');
                setStatusEditMode(false);
            }
            else {
                popNotification('error', 'Failed to update profile status');
            }
        }

        const handleEmojiClick = (e) => {
            setProfileStatus(profileStatus + e.emoji);
        }

        return <>
            <Card>
                <Row justify='space-between'>
                    <Col sm={15} md={14}>
                        <div className='d-md-flex'>
                            <div className='rounded p-2 bg-white shadow-md mx-auto w-40 max-h-40'>
                                <ProfileImage currentUser={currentUser} profileUser={profileUser} profileData={profileData} />
                            </div>
                            <div className='ml-md-4 w-100'>
                                <div className='mb-3 text-md-left text-center'>
                                    <h2 className='mb-0'>{profileUser}</h2>
                                    {currentUser !== profileUser &&
                                        <div className='ml-md-3 mt-3 mt-md-0'>
                                            {
                                                !chatPartners.includes(profileUser) &&
                                                <>
                                                    {!sentToUsers.includes(profileUser) && !receivedFromUsers.includes(profileUser) &&
                                                        <Button
                                                            size='small'
                                                            type='primary'
                                                            onClick={() => handleAddChatParter(currentUser, profileUser)}>Send Chat Request</Button>
                                                    }
                                                    {sentToUsers.includes(profileUser) &&
                                                        <Button
                                                            size='small'
                                                            type='primary'
                                                            disabled>Request Sent</Button>
                                                    }
                                                    {receivedFromUsers.includes(profileUser) &&
                                                        <div>
                                                            <p className='m-0 italic'>This user has sent you chat request</p>
                                                            <Link href={'/notifications'} className='font-semibold text-blue-700'>View Notifications</Link>
                                                        </div>
                                                    }
                                                </>
                                            }
                                            {
                                                chatPartners.includes(profileUser) &&
                                                <Button size='small' className='ml-2'>
                                                    <Link href={`/chat?chat=${profileUser}`}>Message</Link>
                                                </Button>
                                            }
                                        </div>
                                    }
                                </div>
                                {currentUser === profileUser ?
                                    <div className='grid grid-cols-7 pr-5 pl-5'>
                                        <Input
                                            placeholder="Borderless"
                                            bordered={false}
                                            disabled={!statusEditMode}
                                            value={profileStatus}
                                            className='col-span-5'
                                            style={{ borderBottom: '1px solid' }}
                                            onChange={(e) => setProfileStatus(e.target.value)}
                                        />
                                        {
                                            statusEditMode ?
                                                <>
                                                    <Popover trigger='click' content={<EmojiPicker width="100%" onEmojiClick={handleEmojiClick} />} placement='right'>
                                                        <SmileOutlined className='col-span-1 text-xl hover:text-blue-600' />
                                                    </Popover>
                                                    <CheckOutlined
                                                        onClick={async () => await handleUpdateStatus()}
                                                        className='col-span-1 text-xl cursor-pointer hover:text-green-500' />
                                                </>
                                                :
                                                <EditOutlined
                                                    onClick={() => setStatusEditMode(true)}
                                                    className='col-span-1 text-xl cursor-pointer hover:text-blue-600' />
                                        }
                                    </div>
                                    :
                                    <div>
                                        <p>{profileStatus}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </Col>
                    <Col sm={9} md={8}>
                        <h3>Chat Partners</h3>
                        <ChatPartnerList chatPartners={profileData.chatPartners} currentUser={currentUser} />
                    </Col>
                </Row>
            </Card>
        </>
    }

export default ProfileInfo;
