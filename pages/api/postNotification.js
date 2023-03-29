import connect from '../../lib/mongodb';
import Notification from '../../model/notificationSchema';

export default async function handler(req, res) {
    const requestBody = JSON.parse(req.body);
    const fromUser = requestBody.fromUser;
    const toUser = requestBody.toUser;
    const type = requestBody.type;
    const acknowledgement = requestBody.acknowledgement;
    const timestamp = requestBody.timestamp;

    const inNotification = {
        sender: fromUser,
        type: type,
        timestamp: timestamp
    }

    const outNotification = {
        receiver: toUser,
        type: type,
        timestamp: timestamp
    }

    try {
        connect();
        try {
            await Notification.updateOne(
                {username: toUser},
                {$push: {incomingNotifications: inNotification}}
            ).then(async (response) => {
                if (acknowledgement) {
                    await Notification.updateOne(
                        {username: fromUser},
                        {$push: {outgoingNotifications: outNotification}}
                    )
                    .then((response) => {
                        return res.status(200).json({ message: `Notification log has been added to ${fromUser} and ${toUser}`, inNotification, outNotification });
                    })
                }
                else {
                    return res.status(200).json({message: `Notification has been logged for ${toUser}`})
                }
            })
        }
        catch(error) {
            return res.status(400).json({message: 'Error: While adding notification log', error: error});
        }
    }
    catch(error) {
        return res.status(500).json({message: 'Cannot connect with database'});
    }
}
