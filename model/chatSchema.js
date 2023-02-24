import mongoose from "mongoose";

const Chats = new mongoose.Schema({
    username: {
        type: String,
    },
    content: {
        type: String,
    },
    contentType: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: new Date()
    }
})

const chatSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true,
        unique: true
    },
    participants: {
        type: [String],
        required: true
    },
    chats: {
        type: [Chats],
        default: []
    }
})

export default mongoose.models.Chat || mongoose.model('Chat', chatSchema);
