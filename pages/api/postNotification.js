import connect from "../../lib/mongodb";
import Notification from "../../model/notificationSchema";

export default async function handler(req, res) {
    // const requestBody = JSON.parse(req.body);
    const fromUser = req.body.fromUser;
    const toUser = req.body.toUser;
    const type = req.body.type;
    const timeStamp = req.body.timeStamp;
    const inNotification = {
        sender: fromUser,
        type: type,
        timeStamp: timeStamp
    }
    const outNotification = {
        receiver: toUser,
        type: type,
        timeStamp: timeStamp
    }
    try {
        connect();
        try {
            await Notification.updateOne(
                {username: toUser},
                {$push: {incomingNotifications: inNotification}}
            ).then(async (res) => {
                await Notification.updateOne(
                    {username: fromUser},
                    {$push: {outgoingNotifications: outNotification}}
                )
                .then((res) => {
                    return res.status(200).json({ message: `Notification log has been added to ${fromUser} and ${toUser}` });
                })
            })
        }
        catch(error) {
            return res.status(400).json({message: 'Error: While adding notification log'});
        }
    }
    catch(error) {
        return res.status(500).json({message: 'Cannot connect with database'});
    }
}
