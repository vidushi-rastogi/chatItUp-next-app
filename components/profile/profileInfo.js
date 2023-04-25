import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import ProfileImage from './profile-components/profileImg';

const ProfileInfo = ({ session, profileUser }) => {
    const currentUser = session.user.username;
    return <>
        <Card>
            <Row justify='center'>
                <Col sm={24} md={23}>
                    <div className='d-md-flex'>
                        <div className='rounded p-2 bg-white shadow-sm mx-auto' style={{ 'marginTop': '-3.5rem', 'maxWidth': '180px' }}>
                            <ProfileImage />
                        </div>
                        <div className='ml-md-4 w-100'>
                            <div className='mb-3 text-md-left text-center'>
                                <h2 className='mb-0'>{profileUser}</h2>
                                {currentUser !== profileUser && 
                                    <div className='ml-md-3 mt-3 mt-md-0'>
                                        <Button size='small' type='primary'>Send Chat Request</Button>
                                        <Button size='small' className='ml-2'>Message</Button>
                                    </div>
                                }
                            </div>
                            <div className='text-center'>
                                I don't like people. If I talk with you, I still don't like you.
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    </>
}

export default ProfileInfo;
