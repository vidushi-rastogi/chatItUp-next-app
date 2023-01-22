import connect from "../../lib/mongodb";
import Chat from "../../model/chatSchema";

export default async function handler(req, res) {
    const newChat = JSON.parse(req.body);
    try {
        connect();
        try {
            const chat = await Chat.create(newChat);
            if(!chat) {
                return res.status(400).json({message: 'Couldn\'t add chat details to the database'});
            }
            else {
                return res.status(200).json({message: 'New chat has been added to the database'});
            }
        }
        catch (error) {
            return res.status(400).json({message: 'Not able to create new chat in the database', error});
        }
    }
    catch (error) {
        return res.status(500).json({message: 'Cannot connect with database'});
    }
}
