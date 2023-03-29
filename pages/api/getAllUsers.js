import connect from '../../lib/mongodb';
import User from '../../model/userSchema';

export default async function handler(req, res) {
    const searchKey = req.query.key;
    const searchRegex = new RegExp(`^${searchKey}`, 'g');
    try {
        connect();
        try {
            const users = await User.find({ username: { $regex: searchRegex } })
            if (!users) {
                return res.status(404).json({message: 'No user found with this username'});
            }
            else {
                return res.status(200).json({message: 'Users received', users: users});
            }
        }
        catch (error) {
            return res.status(400).json({message: 'Unable to get users', error});
        }
    }
    catch (error) {
        return res.status(500).json({message: 'Cannot connect with database'});
    }
}