import { store } from "./store.js"
import { Timer } from "./chronos.js"
import { renderApp } from "./renderers.js"

const timer = new Timer(store)

// Subscribe to store updates
store.subscribe(renderApp)

// Initial render
renderApp(store.getState())

// Event Listeners

// Key Events (Space to toggle timer)
document.addEventListener("keydown", (event) => {
    if (event.target.tagName === "INPUT") return

    if (event.code === "Space") {
        // We need to handle keydown/keyup logic for inspection/solve transition
        // The original logic was:
        // IDLE + KeyDown -> INSPECTING
        // INSPECTING + KeyUp -> SOLVING
        // SOLVING + KeyDown -> IDLE

        const state = store.getState().timerState

        if (state === "IDLE") {
            timer.startInspection()
        } else if (state === "SOLVING") {
            timer.stopSolve()
        }
    }
})

document.addEventListener("keyup", (event) => {
    if (event.target.tagName === "INPUT") return

    if (event.code === "Space") {
        const state = store.getState().timerState
        if (state === "INSPECTING") {
            timer.startSolve()
        }
    }
})

// Session Switching
const sessionSelect = document.querySelector("#session-select");
sessionSelect.addEventListener("change", (event) => {
    store.switchSession(event.target.value)
})

// Create Session
const createSessionButton = document.querySelector("#create-session-button");
createSessionButton.addEventListener("click", () => {
    const sessionNameInput = document.querySelector("#session-name-input");
    const name = sessionNameInput.value
    if (name) {
        store.addSession(name)
        sessionNameInput.value = ""
    }
})

// Event Selector
const eventSelect = document.querySelector("#event-select");
eventSelect.addEventListener("change", (event) => {
    store.setEvent(event.target.value)
})
