import connect from "../../lib/mongodb";
import Chat from "../../model/chatSchema";

export default async function handler(req, res) {
  const chatParticipants = req.body.chatParticipants;
  const chatMessage = req.body.chatMessage;
  try {
    connect();
    try {
      await Chat.updateOne(
        { participants: { $all: chatParticipants } },
        { $push: { chats: chatMessage} }
      ).then(() => {
        return res.status(200).json({message: 'Message is successfully posted on database'})
      })
    }
    catch(error) {
      return res.status(400).json({ message: 'Message did not posted on database', error });
    }
  }
  catch(error) {
    return res.status(500).json({message: 'Cannot connect with database'});
  }
}
