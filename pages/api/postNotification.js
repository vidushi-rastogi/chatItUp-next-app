import connect from "../../lib/mongodb";
import Notification from "../../model/notificationSchema";

export default async function handler(req, res) {
    const fromUser = req.body.fromUser;
    const toUser = req.body.toUser;
    const type = req.body.type;
    const acknowledgement = req.body.acknowledgement;
    const timeStamp = req.body.timeStamp;

    const inNotification = {
        sender: fromUser,
        type: type,
        timeStamp: new Date(timeStamp)
    }

    const outNotification = {
        receiver: toUser,
        type: type,
        timeStamp: new Date(timeStamp)
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
                        return res.status(200).json({ message: `Notification log has been added to ${fromUser} and ${toUser}` });
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
