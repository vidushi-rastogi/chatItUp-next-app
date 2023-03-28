import moment from "moment/moment";

const NotificationDateFormat = (dateString) => {
    const date = new Date(dateString);
    return moment(date).fromNow();
}

export {
    NotificationDateFormat
}
