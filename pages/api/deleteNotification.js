import connect from '../../lib/mongodb';
import Notification from '../../model/notificationSchema';

export default async function handler(req, res) {
    const username = req.body.username;
    const notificationType = req.body.notificationType;
    const notificationId = req.body.notificationId;

    try {
        connect();
        try {
            await Notification.updateOne(
                { username: username },
                { $pull: { [notificationType]: { _id: notificationId } } }
            ).then(async (response) => {
                const updatedNotificationDoc = await Notification.findOne({username: username});
                return res.status(200).json({ message: 'Notification has been removed', updatedNotifications: updatedNotificationDoc[notificationType] });
            })
            .catch((error) => {
                return res.status(400).json({ message: 'Error while removing notification', error });
            })
        }
        catch (error) {
            return res.status(400).json({ message: 'Error while getting details from Notifications collection', error });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Cannot connect with database' });
    }
}
