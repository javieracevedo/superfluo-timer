import { store, actions, VALID_STATES } from '../store/store'
import { getTime, formatTime } from '../utils/stats'

let timerInterval = null
let inspectionInterval = null
let startTime = null

export function useTimer() {

    function startInspection() {
        if (inspectionInterval) return

        let inspectionTime = 15
        actions.updateInspectionTime(inspectionTime)
        actions.setTimerState(VALID_STATES.INSPECTING)

        inspectionInterval = setInterval(() => {
            inspectionTime--
            actions.updateInspectionTime(inspectionTime)

            if (inspectionTime <= 0) {
                stopInspection()
            }
        }, 1000)
    }

    function stopInspection() {
        if (inspectionInterval) {
            clearInterval(inspectionInterval)
            inspectionInterval = null
        }
    }

    function startSolve() {
        stopInspection()
        startTime = Date.now()
        actions.setTimerState(VALID_STATES.SOLVING)

        timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime
            actions.updateTime(elapsed)
        }, 10)
    }

    function stopSolve() {
        if (timerInterval) {
            clearInterval(timerInterval)
            timerInterval = null

            const elapsed = Date.now() - startTime
            actions.updateTime(elapsed) // Update store with final time

            const timeObj = getTime(elapsed)

            timeObj.str = formatTime(timeObj)

            actions.addTime(timeObj)
            actions.setTimerState(VALID_STATES.IDLE)
        }
    }

    function handleKeyDown(event) {
        if (event.target.tagName === "INPUT") return

        if (event.code === "Space") {
            const state = store.timerState

            if (state === VALID_STATES.IDLE) {
                startInspection()
            } else if (state === VALID_STATES.SOLVING) {
                stopSolve()
            }
        }
    }

    function handleKeyUp(event) {
        if (event.target.tagName === "INPUT") return

        if (event.code === "Space") {
            const state = store.timerState
            if (state === VALID_STATES.INSPECTING) {
                startSolve()
            }
        }
    }

    return {
        handleKeyDown,
        handleKeyUp
    }
}
