import connect from '../../../lib/mongodb';
import User from '../../../model/userSchema';
import bcrypt from 'bcrypt';

const hashPasword = async (password) => {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
}

export default async function handler(req, res) {
    const hashedPassword = await hashPasword(req.body.password);
    let requestBody = {
        ...req.body,
        password: hashedPassword
    }

    try {
        connect();
        try {
            const user = await User.create(requestBody);
            if(!user) {
                return res.status(400).json({message: 'Couldn\'t add user details to database'})
            }
            else {
                return res.status(200).json({message: 'New user has been added to the database'})
            }
        }
        catch (error) {
            return res.status(400).json({message: 'Not able to create new user', error})
        }
    }
    catch (error){
        return res.status(500).json({message: 'Cannot connect with database'})
    }
}
