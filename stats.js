
export function getBestTime(list) {
    const times =  list.map((l) => (l.hours * 60 * 60 * 1000) + (l.minutes * 60 * 1000) + (l.seconds * 1000) + l.milliseconds)
    const minTime = Math.min(...times)
    const indexOfMinTime = times.indexOf(minTime)
    const bestTime = list[indexOfMinTime]
    return bestTime;
}

export function getMean(list) {
    const average = list => list.reduce((a, l) => (a + (l.hours * 60 * 60 * 1000) + (l.minutes * 60 * 1000) + (l.seconds * 1000) + l.milliseconds), 0) / list.length;
    const timesAverage = average(list)

    const { milliseconds, seconds, minutes, hours } = getTime(timesAverage)

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().slice(0, 3)}`
}

export function getTime(timeMilliseconds) {
    const milliseconds = timeMilliseconds % 1000;
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

export default {
    getBestTime,
    getMean,
    getTime
}