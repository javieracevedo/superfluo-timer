import { getTime } from "./stats.js"

export class Timer {
    constructor(store) {
        this.store = store
        this.timerInterval = null
        this.inspectionInterval = null
        this.startTime = null
    }

    startInspection() {
        if (this.inspectionInterval) return

        let inspectionTime = 15
        this.store.updateInspectionTime(inspectionTime)
        this.store.setTimerState("INSPECTING")

        this.inspectionInterval = setInterval(() => {
            inspectionTime--
            this.store.updateInspectionTime(inspectionTime)

            if (inspectionTime <= 0) {
                this.stopInspection() // Or auto-start solve? For now just stop/fail
            }
        }, 1000)
    }

    stopInspection() {
        if (this.inspectionInterval) {
            clearInterval(this.inspectionInterval)
            this.inspectionInterval = null
        }
    }

    startSolve() {
        this.stopInspection()
        this.startTime = Date.now()
        this.store.setTimerState("SOLVING")

        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime
            this.store.updateTime(elapsed)
        }, 10) // Update every 10ms
    }

    stopSolve() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval)
            this.timerInterval = null

            const elapsed = Date.now() - this.startTime
            const timeObj = getTime(elapsed)

            // Format string for display/storage
            timeObj.str = `${timeObj.hours.toString().padStart(2, "0")}:${timeObj.minutes.toString().padStart(2, "0")}:${timeObj.seconds.toString().padStart(2, "0")}:${timeObj.milliseconds.toString().slice(0, 3)}`

            this.store.addTime(timeObj)
            this.store.setTimerState("IDLE")
            this.store.updateTime(0) // Reset display or keep final time? Usually keep final until next start.
            // Actually, let's keep the final time in display by NOT resetting elapsedTime to 0 immediately,
            // but the state is IDLE. The renderer should handle "IDLE" by showing 0 or the last time?
            // For now, let's reset to 0 on start, so here we leave it as is.
        }
    }

    toggle() {
        const state = this.store.getState().timerState
        if (state === "IDLE") {
            this.startInspection()
        } else if (state === "INSPECTING") {
            this.startSolve()
        } else if (state === "SOLVING") {
            this.stopSolve()
        }
    }
}