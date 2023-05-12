import React, { useState } from 'react';
import { Card, Row, Col, Button, Input } from 'antd';
import {
    EditOutlined,
    CheckOutlined
} from '@ant-design/icons';
import ProfileImage from './profile-components/profileImg';
import ChatPartnerList from './profile-components/chatPartnersList';

const ProfileInfo = ({ session, profileUser, profileData }) => {
    const currentUser = session.user.username;
    const chatPartners = session.user.chatPartners;
    const [statusEditMode, setStatusEditMode] = useState(false);
    const [profileStatus, setProfileStatus] = useState('Hey there I am on ChatItUp!');

    return <>
        <Card>
            <Row justify='space-between'>
                <Col sm={15} md={14}>
                    <div className='d-md-flex'>
                        <div className='rounded p-2 bg-white shadow-md mx-auto w-40 max-h-40'>
                            <ProfileImage currentUser={currentUser} profileUser={profileUser} />
                        </div>
                        <div className='ml-md-4 w-100'>
                            <div className='mb-3 text-md-left text-center'>
                                <h2 className='mb-0'>{profileUser}</h2>
                                {currentUser !== profileUser &&
                                    <div className='ml-md-3 mt-3 mt-md-0'>
                                        {
                                            !chatPartners.includes(profileUser) &&
                                            <Button size='small' type='primary'>Send Chat Request</Button>
                                        }
                                        <Button size='small' className='ml-2'>Message</Button>
                                    </div>
                                }
                            </div>
                            {currentUser === profileUser ?
                                <div className='grid grid-cols-6 pr-5 pl-5'>
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
                                            <CheckOutlined
                                                onClick={() => setStatusEditMode(false)}
                                                className='col-span-1 text-xl cursor-pointer hover:text-green-500' />
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
