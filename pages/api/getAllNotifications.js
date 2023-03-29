import connect from '../../lib/mongodb';
import Notification from '../../model/notificationSchema';

export default async function handler(req, res) {
    const username = req.query.username;
    try {
        connect();
        try {
            const notifications = await Notification.findOne({username: username});
            if (!notifications) {
                return res.status(400).json({ message: `No notification document found for user ${username}` });
            }
            else {
                return res.status(200).json({ message: 'Received notifications', notifications: notifications });
            }
        }
        catch (err) {
            return res.status(400).json({ message: `Error while retrieving notifications for user ${username}`});
        }
    }
    catch(error) {
        return res.status(500).json({ message: 'Cannot connect with database' });
    }
}
