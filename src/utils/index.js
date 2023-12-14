export const formatted = (timestamp) => {
    const currentDate = new Date();
    const previousDate = new Date(timestamp);
    const timeDifference = currentDate - previousDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
}
