export const RemoveNotification = async (username, notificationType, notificationId) => {
    return await fetch('/api/deleteNotification', {
        method: 'POST',
        body: JSON.stringify({
            username,
            notificationType,
            notificationId
        }),
        header: {
            'Content-Type': 'application/json'
        }
    })
}