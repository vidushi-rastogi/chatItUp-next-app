import React from 'react';
import { Button, Row, Col, Tooltip, notification } from 'antd';
import {
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { AddChatPartner } from './actions/addChatPartner';
import { RequestAcceptionNotification } from './actions/notifyRequestAcception';
import { RemoveChatRequest } from './actions/removeChatRequest';
import { RemoveNotification } from './actions/removeNotification';

const popNotification = (type, message) => {
    notification[type]({
        message
    })
}

const ActionButtons = ({ type, notification, session, setData }) => {

    const handleRequestAccept = async () => {
        console.log(`Add ${notification.sender} to ${session.user.username}`);

        //1. Create a chat instance for user and chat partner
        const addChatPartnerResponse = await AddChatPartner(session.user, notification);
        
        if (addChatPartnerResponse.status === 200) {
            //2. Send the sender a request acception notification
            const requestAcceptNotification = await RequestAcceptionNotification(session.user, notification);

            if (requestAcceptNotification.status === 200) {
                //3. Remove notification from Received section of current user
                //4. Remove notification from Sent section of sender
                const type = 'accept';
                const removedChatRequestResponse = await RemoveChatRequest(session.user.username, notification.sender, type, notification._id);
                const data = await removedChatRequestResponse.json();
                if (removedChatRequestResponse.status === 200) {
                    setData(data.updatedNotifications.slice(0, 5));
                    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
                    userDetails.chatPartners.push(notification.sender);
                    localStorage.setItem('userDetails', JSON.stringify(userDetails));
                    popNotification('success', `${notification.sender} is added as your chat partner :)`);
                }
                else {
                    console.log(`Error: Unable to remove chat request from ${session.user.username} and ${notification.sender}`);
                    popNotification('error', `Something went wrong while adding ${notification.sender} as your char partner :(`);
                }
            }
            else {
                console.log(`Error: Unable to sent request accept acknowledgement to ${notification.sender}`);
                popNotification('error', `Something went wrong while adding ${notification.sender} as your char partner :(`);
            }
        }
        else {
            console.log(`Error: Unable to create chat instance for ${session.user.username} and ${notification.sender}`);
            popNotification('error', `Something went wrong while adding ${notification.sender} as your char partner :(`);
        }
    }

    const handleRemoveRequest = async (removeType) => {
        if (removeType === 'remove') {
            const notificationType = 'incomingNotifications';
            const removedRequestResponse = await RemoveNotification(session.user.username, notificationType, notification._id);
            const data = await removedRequestResponse.json();
            if (removedRequestResponse.status === 200) {
                setData(data.updatedNotifications.slice(0, 5));
                popNotification('success', `Notitification is removed`);
            }
            else {
                console.log(`Error: Unable to remove notification for ${session.user.username}`);
                popNotification('error', `Unable to remove the notification :(`);
            }
        }
        else {
            const rejectedRequestResponse = await RemoveChatRequest(session.user.username, notification.sender, 'accept', notification._id);
            const data = await rejectedRequestResponse.json();
            if (rejectedRequestResponse.status === 200) {
                setData(data.updatedNotifications.slice(0, 5));
            }
            else {
                console.log(`Error: Unable to remove chat request from ${session.user.username} and ${notification.sender}`);
                popNotification('error', `Unable to reject chat request from ${notification.sender} :(`);
            }
        }
    }

    const handleCancelRequest = async () => {
        //1. Remove notification from Sent section of current user
        //2. Remove notification from Received section of recipent
        const type = 'cancel';
        const removedChatRequestResponse = await RemoveChatRequest(notification.receiver, session.user.username, type, notification._id);
        const data = await removedChatRequestResponse.json();
        if (removedChatRequestResponse.status === 200) {
            setData(data.updatedNotifications.slice(0, 5));
            popNotification('success', `Your chat to request to ${notification.receiver} has been cancelled.`);
        }
        else {
            console.log(`Error: Unable to remove chat request from ${session.user.username} and ${notification.receiver}`);
            popNotification('error', `Unable to cancel sent chat request to ${notification.receiver} :(`);
        }
    }

    return (
        <div>
            {type === 'incoming' ?
                <Row justify='space-between'>
                    {notification.type === 'chat_request' ?
                        <Col span={12}>
                            <Tooltip title='Accept'>
                                <Button
                                    style={{ borderColor: '#1677ff', color: '#1677ff', marginRight: '10px' }}
                                    shape='circle'
                                    icon={<CheckOutlined />}
                                    onClick={handleRequestAccept} />
                            </Tooltip>
                        </Col>
                        :
                        <></>
                    }
                    <Col span={12}>
                        <Tooltip title={notification.type === 'chat_request' ? 'Reject' : 'Remove'}>
                            <Button 
                                danger 
                                shape='circle'
                                onClick={() => handleRemoveRequest(notification.type === 'chat_request' ? 'reject' : 'remove')}
                                icon={<CloseOutlined />} />
                        </Tooltip>
                    </Col>
                </Row>
                :
                <Button danger onClick={handleCancelRequest}>Cancel</Button>
            }
        </div>
    )
}

export default ActionButtons;
