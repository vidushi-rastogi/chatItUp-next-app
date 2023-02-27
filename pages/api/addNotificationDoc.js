import connect from "../../lib/mongodb";
import Notification from '../../model/notificationSchema';

export default async function handler(req, res) {
    try {
        connect();
        await Notification.create(req.body)
            .then((res) => {
                return res.status(200).json({ message: 'Doc added' });
            })
    }
    catch (error) {
        return res.status(500).json({ message: 'Cannot connect with database' });
    }
}
