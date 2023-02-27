import connect from '../../lib/mongodb';
import Chat from '../../model/chatSchema';

export default async function handler(req, res) {
    const username = req.query.username;
    try {
        connect();
        try {
            const userChats = await Chat.find({
                participants: {'$in': [`${username}`]}
            })
            return res.status(200).json({message: `Chats received for user ${username}`, chats: userChats});
        }
        catch(error) {
            return res.status(400).json({message: `Unable to get chats for user ${username}`, error});
        }
    }
    catch(error) {
        return res.status(500).json({message: 'Cannot connect with database'});
    }
}
