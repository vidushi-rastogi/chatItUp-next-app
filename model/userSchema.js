import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chatPartners: {
        type: Array,
        default: [],
        required: true,
    }
})

export default mongoose.models.User || mongoose.model('User', userSchema);
 