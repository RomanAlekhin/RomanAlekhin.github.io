const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthNamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayOfWeekNamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getShortDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
};

export const getShortDateWithDayOfWeek = (timestamp) => {
    const date = new Date(timestamp);
    return `${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
};

export const getFullDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()} ${monthNamesFull[date.getMonth()]} ${date.getFullYear()}`;
};

export const getFullDateWithDayOfWeek = (timestamp) => {
    const date = new Date(timestamp);
    return `${dayOfWeekNamesFull[date.getDay()]}, ${date.getDate()} ${monthNamesFull[date.getMonth()]} ${date.getFullYear()}`;
};

export const getDateForPopup = (timestamp) => {
    const date = new Date(timestamp);
    return `${dayOfWeekNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

export const getHour = (timestamp) => {
    const hours = new Date(timestamp).getHours();
    return `${hours < 10 ? '0' : ''}${hours}:00`;
};
