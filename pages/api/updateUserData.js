import connect from '../../lib/mongodb';
import User from '../../model/userSchema';

export default async function handler(req, res) {
    const requestData = JSON.parse(req.body);
    const username = requestData.username;
    const updateField = requestData.field;
    const updateValue = requestData.value;

    try {
        connect();
        try {
            await User.updateOne(
                { username },
                { [updateField]: updateValue }
            )
            .then(() => {
                return res.status(200).json({ message: 'Requested field has been updated for the user' })
            })
                
        }
        catch (error) {
            return res.status(400).json({ message: 'Not able to update the details of the user', error });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Cannot connect with database' });
    }
}
