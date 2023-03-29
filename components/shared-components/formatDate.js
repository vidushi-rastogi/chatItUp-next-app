import moment from 'moment/moment';

const NotificationDateFormat = (dateString) => moment(new Date(dateString)).fromNow() ?? '';

export {
    NotificationDateFormat
}
