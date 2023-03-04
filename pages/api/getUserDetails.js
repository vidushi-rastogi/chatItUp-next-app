import connect from '../../lib/mongodb';
import User from '../../model/userSchema';

export default async function handler(req, res) {
    const username = req.query.username;
    try {
        connect();
        try {
            const user = await User.findOne({username: username});
            if (user) {
                return res.status(200).json({message: `Got details for ${username}`, user: user})
            }
            else {
                return res.status(400).json({message: `Unable to get details for ${username}`})
            }
        }
        catch (error) {
            return res.status(400).json({message: 'Error while getting details from User collection', error});
        }
    }
    catch(error) {
        return res.status(500).json({message: 'Cannot connect with database'});
    }
}
