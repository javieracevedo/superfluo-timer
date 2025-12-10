
export function getBestTime(list) {
    if (!list || list.length === 0) return null
    const times =  list.map((l) => (l.hours * 60 * 60 * 1000) + (l.minutes * 60 * 1000) + (l.seconds * 1000) + l.milliseconds)
    const minTime = Math.min(...times)
    const indexOfMinTime = times.indexOf(minTime)
    const bestTime = list[indexOfMinTime]
    return bestTime;
}

export function getMean(list) {
    if (!list || list.length === 0) return null
    const average = list => list.reduce((a, l) => (a + (l.hours * 60 * 60 * 1000) + (l.minutes * 60 * 1000) + (l.seconds * 1000) + l.milliseconds), 0) / list.length;
    const timesAverage = average(list)

    return formatTime(getTime(timesAverage))
}

export function getTime(timeMilliseconds) {
    const milliseconds = Math.floor(timeMilliseconds % 1000);
    const totalSeconds = Math.floor(timeMilliseconds / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return {
        milliseconds,
        seconds,
        minutes,
        hours
    }
}

export function formatTime(time) {
    return `${time.hours.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}:${time.milliseconds.toString().padStart(3, "0")}`
}

export default {
    getBestTime,
    getMean,
    getTime,
    formatTime
}
