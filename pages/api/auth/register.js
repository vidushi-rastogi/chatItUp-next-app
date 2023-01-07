import connect from "../../../lib/mongodb";
import User from '../../../model/userSchema';

try {
    connect()
}
catch (error){
    console.log('ERROR: Something went wrong while connecting to database', error);
}
export default async function handler(req, res) {
    try {
        const user = await User.create(req.body);
        if(!user) {
            return res.status(400).json({message: 'Couldn\'t add user details to database'})
        }
        else {
            return res.status(200).json({message: 'New user has been added to the database'})
        }
    }
    catch (error) {
        return res.status(400).json({message: 'Not able to create new user'})
    }
}
