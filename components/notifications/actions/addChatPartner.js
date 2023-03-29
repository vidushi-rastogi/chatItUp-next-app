export const AddChatPartner = async (currentUser, notification) => {
    return await fetch('/api/addChatPartner', {
        method: 'POST',
        body: JSON.stringify({
            chatId: `${currentUser.username}_${notification.sender}`,
            participants: [currentUser.username, notification.sender],
            chats: []
        }),
        header: {
            'Content-Type': 'application/json'
        }
    });
}
