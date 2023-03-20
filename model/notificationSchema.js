import mongoose from "mongoose";

const inNotification = new mongoose.Schema({
    sender: {
        type: String
    },
    type: {
        type: String
    },
    timestamp: {
        type: Date,
        required: true,
        default: new Date(),
    }
})

const outNotification = new mongoose.Schema({
    receiver: {
        type: String
    },
    type: {
        type: String
    },
    timestamp: {
        type: Date,
        required: true,
        default: new Date(),
    }
})

const notificationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    incomingNotifications: {
        type: [inNotification],
        default: []
    },
    outgoingNotifications: {
        type: [outNotification],
        default: []
    }
})

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
