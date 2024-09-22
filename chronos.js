import { getTime } from "./stats.js"
import { renderStatList, renderTimeList } from "./renderers.js";


export function chronos(timerElement) {
    let startTime;
    
    let milliseconds 
    let seconds
    let minutes
    let hours

    let timerInterval
    let inspectionTimeInterval
    
    let timeList = []

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
        if (inspectionTimeInterval) return

        try {
            let inspectionTime = INSPECTION_TIME_SECONDS;
            timerElement.innerText = inspectionTime;

            inspectionTimeInterval = setInterval(() => {
                inspectionTime = inspectionTime - 1;
                timerElement.innerText = inspectionTime

                if (inspectionTime < 0) {
                    stopInspectionTimer()
                }
            }, 1000);
        } 
        catch (e) {
            console.error(error)
        }

        return stopInspectionTimer
    }

    const stopInspectionTimer = () => {
        clearInterval(inspectionTimeInterval)
        inspectionTimeInterval = null;
    }

    return { 
        timer,
        startInspection,
        stopInspectionTimer 
    }
}

export default chronos