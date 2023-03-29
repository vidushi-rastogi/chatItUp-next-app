import mongoose from 'mongoose';

const connection = {};

const connect = async () => {
 if (connection.isConnected) {
    console.log('Mongo DB is already connected!')
    return;
 }
 const db = await mongoose.connect(process.env.MONGODB_URI);
 connection.isConnected = db.connections[0].readyState;
}

export default connect;
