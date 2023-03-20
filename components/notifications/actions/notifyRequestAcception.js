export const RequestAcceptionNotification = async (currentUser, notification) => {
    const res = await fetch('/api/postNotification', {
        method: 'POST',
        body: JSON.stringify({
          fromUser: currentUser.username,
          toUser: notification.sender,
          type: 'request_accepted',
          acknowledgement: false,
          timestamp: new Date()
        }),
        header: {
          'Content-Type': 'application/json'
        }
      })
    return res;
}