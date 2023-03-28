import { notification } from 'antd';
import { RemoveNotification } from '../../notifications/actions/removeNotification';
import { RemoveChatRequest } from '../../notifications/actions/removeChatRequest';
import { RequestAcceptionNotification } from '../../notifications/actions/notifyRequestAcception';
import { AddChatPartner } from '../../notifications/actions/addChatPartner';

const popNotification = (type, message) => {
    notification[type]({
        message
    })
}

const handleAcceptRequest = async (
    notification,
    session,
    setNotifications,
    setUserNotifications,
    userNotifications,
    chatPartners,
    setChatPartners
) => {
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
                setNotifications(data.updatedNotifications.slice(0, 5));
                let updatedNotifications = userNotifications;
                updatedNotifications.incomingNotifications = userNotifications?.incomingNotifications?.filter(n => n._id !== notification._id);
                setUserNotifications(updatedNotifications);
                setChatPartners([...chatPartners, notification.sender]);
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

const handleRemoveRequest = async (
    notification,
    session,
    setNotifications,
    setUserNotifications,
    userNotifications,
    removeType
) => {
    if (removeType === 'remove') {
        const notificationType = 'incomingNotifications';
        const removedRequestResponse = await RemoveNotification(session.user.username, notificationType, notification._id);
        const data = await removedRequestResponse.json();
        if (removedRequestResponse.status === 200) {
            setNotifications(data.updatedNotifications.slice(0, 5));
            let updatedNotifications = userNotifications;
            updatedNotifications.incomingNotifications = userNotifications?.incomingNotifications?.filter(n => n._id !== notification._id);
            setUserNotifications(updatedNotifications);
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
            setNotifications(data.updatedNotifications.slice(0, 5));
            let updatedNotifications = userNotifications;
            updatedNotifications.incomingNotifications = userNotifications?.incomingNotifications?.filter(n => n._id !== notification._id);
            setUserNotifications(updatedNotifications);
        }
        else {
            console.log(`Error: Unable to remove chat request from ${session.user.username} and ${notification.sender}`);
            popNotification('error', `Unable to reject chat request from ${notification.sender} :(`);
        }
    }
}

export {
    handleAcceptRequest,
    handleRemoveRequest
}