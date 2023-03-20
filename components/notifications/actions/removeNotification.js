export const RemoveNotification = async (username, notificationType, notificationId) => {
    const res = await fetch('/api/deleteNotification', {
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
    return res;
}