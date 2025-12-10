import { reactive, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { randomScrambleForEvent } from 'cubing/scramble'

export const EVENTS = {
    THREE: "333",
    TWO: "222",
    FOUR: "444",
    FIVE: "555",
    SIX: "666",
    SEVEN: "777",
    PYRAMINX: "pyram",
    MEGAMINX: "minx",
    SKEWB: "skewb",
    SQUARE1: "sq1",
    CLOCK: "clock"
}

export const VALID_STATES = {
    IDLE: "IDLE",
    INSPECTING: "INSPECTING",
    SOLVING: "SOLVING"
}

// Initial state
const initialState = {
    sessions: [],
    currentSessionId: null,
    timerState: VALID_STATES.IDLE,
    elapsedTime: 0,
    inspectionTime: 15,
    currentScramble: "Loading...",
    currentEvent: EVENTS.THREE
}

// Load from local storage
const savedState = localStorage.getItem("superfluo-state")
let loadedState = initialState
if (savedState) {
    try {
        const parsed = JSON.parse(savedState)
        loadedState = { ...initialState, ...parsed }
        // Reset transient state
        loadedState.timerState = VALID_STATES.IDLE
        loadedState.elapsedTime = 0
        loadedState.inspectionTime = 15
        if (!loadedState.currentScramble) loadedState.currentScramble = "Loading..."
        if (!loadedState.currentEvent) loadedState.currentEvent = EVENTS.THREE
    } catch (e) {
        console.error("Failed to load state", e)
    }
} else {
    // Initialize default session if no state
    loadedState.sessions = [{
        id: uuidv4(),
        name: "Default Session",
        times: []
    }]
    loadedState.currentSessionId = loadedState.sessions[0].id
}

export const store = reactive(loadedState)

// Actions
export const actions = {
    save() {
        const persistentState = {
            sessions: store.sessions,
            currentSessionId: store.currentSessionId,
            currentEvent: store.currentEvent
        }
        localStorage.setItem("superfluo-state", JSON.stringify(persistentState))
    },

    getCurrentSession() {
        return store.sessions.find(s => s.id === store.currentSessionId)
    },

    addSession(name) {
        const newSession = {
            id: uuidv4(),
            name,
            times: []
        }
        store.sessions.push(newSession)
        store.currentSessionId = newSession.id
        this.save()
        return newSession
    },

    switchSession(sessionId) {
        const session = store.sessions.find(s => s.id === sessionId || s.name === sessionId)
        if (session) {
            store.currentSessionId = session.id
            this.save()
        }
    },

    addTime(timeObject) {
        const session = this.getCurrentSession()
        if (session) {
            timeObject.id = uuidv4()
            timeObject.scramble = store.currentScramble
            session.times.push(timeObject)
            this.save()
            this.generateScramble()
        }
    },

    removeTime(timeId) {
        const session = this.getCurrentSession()
        if (session) {
            session.times = session.times.filter(t => t.id !== timeId)
            this.save()
        }
    },

    setTimerState(newState) {
        store.timerState = newState
    },

    updateTime(time) {
        store.elapsedTime = time
    },

    updateInspectionTime(time) {
        store.inspectionTime = time
    },

    async generateScramble() {
        try {
            const scramble = await randomScrambleForEvent(store.currentEvent);
            store.currentScramble = scramble.toString();
        } catch (error) {
            console.error("Failed to generate scramble:", error);
            store.currentScramble = "Error generating scramble";
        }
    },

    setEvent(eventId) {
        store.currentEvent = eventId;
        this.save();
        this.generateScramble();
    }
}

// Generate initial scramble if needed
if (store.currentScramble === "Loading...") {
    actions.generateScramble()
}
