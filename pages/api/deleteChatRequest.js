import connect from "../../lib/mongodb";
import Notification from "../../model/notificationSchema";

export default async function handler(req, res) {
    const requestData = JSON.parse(req.body);
    const receiver = requestData.receiver;
    const sender = requestData.sender;
    const type = requestData.type;
    const notificationId = requestData.notificationId;

    try {
        connect();
        try {
            // Check if the notification is Accept or Cancel type
            if (type === 'accept') {
                // received from a receiver

                // 1. Remove notification from Receiver's Doc
                await Notification.updateOne(
                    { username: receiver },
                    { $pull: { incomingNotifications: { _id: notificationId } } }
                ).then(async (response) => {
                    // 2. Remove notification from Sender's Doc
                    await Notification.updateOne(
                        { username: sender },
                        { $pull: { outgoingNotifications: { receiver: receiver, type: 'chat_request' } } }
                    )
                    .then(async () => {
                        // Get all updated notifications
                        const updatedNotificationDoc = await Notification.findOne({username: receiver});
                        return res.status(200).json({ message: 'Accepted Chat Notification has been removed', updatedNotifications: updatedNotificationDoc.incomingNotifications });
                    })
                })
                .catch((error) => {
                    return res.status(400).json({ message: 'Error while removing received notification', error });
                })
            }
            else {
                // received from a sender (Cancel chat request)

                // 1. Remove notification from Senders's Doc
                await Notification.updateOne(
                    { username: sender },
                    { $pull: { outgoingNotifications: { _id: notificationId } } }
                ).then(async (response) => {
                    // 2. Remove notification from Receiver's Doc
                    await Notification.updateOne(
                        { username: receiver },
                        { $pull: { incomingNotifications: { sender: sender, type: 'chat_request' } } }
                    )
                    .then(async () => {
                        // Get all updated notifications
                        const updatedNotificationDoc = await Notification.findOne({username: sender});
                        return res.status(200).json({ message: 'Cancelled Sent Notification has been removed', updatedNotifications: updatedNotificationDoc.outgoingNotifications });
                    })
                })
                .catch((error) => {
                    return res.status(400).json({ message: 'Error while removing sent notification', error });
                })
            }
        }
        catch (error) {
            return res.status(400).json({ message: 'Error: While deleting chat requests' }); 
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Cannot connect with database' }); 
    } 
}

