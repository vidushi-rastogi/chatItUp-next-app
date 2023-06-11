import connect from '../../lib/mongodb';
import Chat from '../../model/chatSchema';
import User from '../../model/userSchema';

export default async function handler (req, res) {
    const requestBody = JSON.parse(req.body);
    const firstUsername = requestBody.firstUsername;
    const secondUsername = requestBody.secondUsername;

    try {
        connect();
        try {
            await User.updateOne(
                { username: firstUsername },
                { $pull: { chatPartners: secondUsername }}
            ).then(async () => {
                await User.updateOne(
                    { username: secondUsername },
                    { $pull: { chatPartners: firstUsername } }
                )
                .then(async () => {
                    await Chat.deleteOne({ participants: { $all: [firstUsername, secondUsername] } })
                    .then(() => {
                        return res.status(200).json({ message: 'Chat partner is deleted' });
                    })
                    .catch((error) => {
                        return res.status(400).json({ message: 'Unable to remove chat details', error });
                    })
                })
                .catch((error) => {
                    return res.status(400).json({ message: `Unable to remove ${firstUsername} from ${secondUsername}`, error });
                }) 
            })
            .catch((error) => {
                return res.status(400).json({ message: `Unable to remove ${secondUsername} from ${firstUsername}`, error });
            }) 
        }
        catch (error) {
            return res.status(400).json({ message: 'Not able to remove chat partner', error });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Cannot connect with database' });
    }
}
