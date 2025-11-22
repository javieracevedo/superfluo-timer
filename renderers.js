import { getBestTime, getMean, getTime } from "./stats.js"
import { VALID_STATES, store } from "./store.js"

export function renderApp(state) {
    renderTimer(state)
    renderSessionInfo(state)
    renderTimeList(state)
    renderStats(state)
    renderSessionDropdown(state)
}

function renderTimer(state) {
    const timerElement = document.querySelector("#timer")

    if (state.timerState === VALID_STATES.INSPECTING) {
        timerElement.innerText = state.inspectionTime
        timerElement.style.color = "green"
    } else if (state.timerState === VALID_STATES.SOLVING) {
        const time = getTime(state.elapsedTime)
        timerElement.innerText = formatTime(time)
        timerElement.style.color = "black"
    } else {
        // IDLE
        // If we just finished a solve, we might want to show the last time.
        // But for now, let's show 00... or the last time if we tracked it.
        // The store resets elapsedTime to 0 on stop? No, I didn't reset it in my previous step.
        // Let's check chronos.js... I didn't reset it. So it holds the last time.
        if (state.elapsedTime > 0) {
            const time = getTime(state.elapsedTime)
            timerElement.innerText = formatTime(time)
        } else {
            timerElement.innerText = "00:00:00:00"
        }
        timerElement.style.color = "black"
    }
}

function formatTime(time) {
    return `${time.hours.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}:${time.milliseconds.toString().slice(0, 3)}`
}

function renderSessionInfo(state) {
    const currentSession = state.sessions.find(s => s.id === state.currentSessionId)
    if (!currentSession) return

    const currentSessionLabels = document.querySelectorAll('.current-session-name')
    currentSessionLabels.forEach((element) => element.innerHTML = currentSession.name)
}

function renderTimeList(state) {
    const currentSession = state.sessions.find(s => s.id === state.currentSessionId)
    if (!currentSession) return

    const listContainer = document.querySelector("#time-list")
    listContainer.innerHTML = ""

    // Show latest first? Or last? The original appended, so latest at bottom.
    currentSession.times.forEach((time) => {
        const li = document.createElement("li")
        li.innerText = time.str + " "

        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "X"
        deleteBtn.style.marginLeft = "10px"
        deleteBtn.style.cursor = "pointer"
        deleteBtn.style.color = "red"
        deleteBtn.onclick = () => {
            store.removeTime(time.id)
        }

        li.appendChild(deleteBtn)
        listContainer.appendChild(li)
    })
}

function renderStats(state) {
    const currentSession = state.sessions.find(s => s.id === state.currentSessionId)
    if (!currentSession) return

    const bestTimeElement = document.querySelector("#stat-list .best-time-val")
    const meanElement = document.querySelector("#stat-list .mean-val")

    if (currentSession.times.length > 0) {
        const { str: best } = getBestTime(currentSession.times)
        const mean = getMean(currentSession.times)
        bestTimeElement.innerText = best || "-"
        meanElement.innerText = mean || "-"
    } else {
        bestTimeElement.innerText = "-"
        meanElement.innerText = "-"
    }
}

function renderSessionDropdown(state) {
    const sessionSelect = document.querySelector("#session-select")

    // Only update options if length changed to avoid losing focus or selection state issues
    // But actually we should sync it.
    // Simplest way: clear and rebuild if different.

    if (sessionSelect.options.length !== state.sessions.length) {
        sessionSelect.innerHTML = ""
        state.sessions.forEach(session => {
            const option = document.createElement("option")
            option.value = session.name // The original used name as value for switching
            option.innerText = session.name
            sessionSelect.appendChild(option)
        })
    }

    // Sync selected value
    const currentSession = state.sessions.find(s => s.id === state.currentSessionId)
    if (currentSession && sessionSelect.value !== currentSession.name) {
        sessionSelect.value = currentSession.name
    }
}