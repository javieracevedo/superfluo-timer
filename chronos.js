import { getTime } from "./stats.js"
import { renderStatList, renderTimeList } from "./renderers.js";


export function chronos(timerElement) {
    /* Separate stop timer, start timer, and record time blocks into separate functions*/
    let startTime;
    let milliseconds 
    let seconds
    let minutes
    let hours
    let timerInterval;
    let timeList = []

    let inspectionActive = false

    const INSPECTION_TIME_SECONDS = 15


    const timer = (action) => {
        if (action == "stop") {
            const recordedTime = {
                hours,
                minutes,
                seconds,
                milliseconds,
                str: `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().slice(0, 3)}`
            }
            timeList.push(recordedTime)

            renderTimeList(timeList)
            renderStatList(timeList)
            
            clearInterval(timerInterval);
        } else if (action == "start") {
            startTime = Date.now();
            timerInterval = setInterval(() => {
                let elapsedTime = Date.now() - startTime;

                const time = getTime(elapsedTime)
                milliseconds = time.milliseconds
                seconds = time.seconds
                minutes = time.minutes
                hours = time.hours

                timerElement.innerText = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().slice(0, 3)} `
            }, 1);
            return timerInterval;
        }
    }

    const startInspection = () => {
        if (inspectionActive) return

        try {
            let inspectionTime = INSPECTION_TIME_SECONDS;
            timerInterval = setInterval(() => {
                timerElement.innerText = inspectionTime
                inspectionTime = inspectionTime - 1;
                if (inspectionTime <= 0) {
                    clearInterval(timerInterval)
                    inspectionActive = false
                }
            }, 1000);
            inspectionActive = true;
        } 
        catch (e) {
            inspectionActive = false
            console.error(error)
        }

        return stopInspectionTimer
    }

    const stopInspectionTimer = () => {
        clearInterval(timerInterval)
        inspectionActive = false
    }

    return { 
        timer,
        startInspection,
        stopInspectionTimer 
    }
}

export default chronos