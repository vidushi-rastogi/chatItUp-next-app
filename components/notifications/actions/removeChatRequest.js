export const RemoveChatRequest = async (receiver, sender, type, notificationId) => {
    return await fetch('/api/deleteChatRequest', {
        method: 'POST',
        body: JSON.stringify({
            receiver,
            sender,
            type,
            notificationId
        }),
        header: {
            'Content-Type': 'application/json'
        }
    })
}