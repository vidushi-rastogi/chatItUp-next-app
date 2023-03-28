const NotificationDescription = ({ type, notificationType }) => (
    <>
        {notificationType === 'chat_request' ?
            type === 'incoming' ?
                <>Sent you a chat request</>
                :
                <>Received a chat request from you</>
            :
            notificationType === 'request_accepted' ?
                <>Accepted your chat request</>
                :
                <></>}
    </>
)

export default NotificationDescription;