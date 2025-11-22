import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@11.0.3/+esm';
import { randomScrambleForEvent } from "https://cdn.cubing.net/js/cubing/scramble";

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

export class Store {
    constructor() {
        const savedState = localStorage.getItem("superfluo-state")
        if (savedState) {
            this.state = JSON.parse(savedState)
            // Ensure timer state is reset on reload
            this.state.timerState = VALID_STATES.IDLE
            this.state.elapsedTime = 0
            this.state.inspectionTime = 15
            // Ensure scramble fields exist if loading from old state
            if (!this.state.currentScramble) this.state.currentScramble = "Loading..."
            if (!this.state.currentEvent) this.state.currentEvent = EVENTS.THREE
        } else {
            this.state = {
                sessions: [],
                currentSessionId: null,
                timerState: VALID_STATES.IDLE,
                elapsedTime: 0,
                inspectionTime: 15,
                currentScramble: "Loading...",
                currentEvent: EVENTS.THREE
            }
            // Initialize with default session
            this.addSession("Default Session")
        }
        this.listeners = []
        // Generate initial scramble
        this.generateScramble()
    }

    subscribe(listener) {
        this.listeners.push(listener)
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener)
        }
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state))
    }

    save() {
        // Only save persistent data
        const persistentState = {
            sessions: this.state.sessions,
            currentSessionId: this.state.currentSessionId,
            currentEvent: this.state.currentEvent
        }
        localStorage.setItem("superfluo-state", JSON.stringify(persistentState))
    }

    getState() {
        return this.state
    }

    getCurrentSession() {
        return this.state.sessions.find(s => s.id === this.state.currentSessionId)
    }

    addSession(name) {
        const newSession = {
            id: uuidv4(),
            name,
            times: []
        }
        this.state.sessions.push(newSession)
        this.state.currentSessionId = newSession.id
        this.save()
        this.notify()
        return newSession
    }

    switchSession(sessionId) {
        // Find by name if passed as name (for dropdown compatibility) or ID
        const session = this.state.sessions.find(s => s.id === sessionId || s.name === sessionId)
        if (session) {
            this.state.currentSessionId = session.id
            this.save()
            this.notify()
        }
    }

    addTime(timeObject) {
        const session = this.getCurrentSession()
        if (session) {
            timeObject.id = uuidv4()
            timeObject.scramble = this.state.currentScramble // Save scramble with time
            session.times.push(timeObject)
            this.save()
            this.notify()
            // Generate new scramble for next solve
            this.generateScramble()
        }
    }

    removeTime(timeId) {
        const session = this.getCurrentSession()
        if (session) {
            session.times = session.times.filter(t => t.id !== timeId)
            this.save()
            this.notify()
        }
    }

    setTimerState(newState) {
        this.state.timerState = newState
        this.notify()
    }

    updateTime(time) {
        this.state.elapsedTime = time
        this.notify()
    }

    updateInspectionTime(time) {
        this.state.inspectionTime = time
        this.notify()
    }

    async generateScramble() {
        try {
            const scramble = await randomScrambleForEvent(this.state.currentEvent);
            this.state.currentScramble = scramble.toString();
            this.notify();
        } catch (error) {
            console.error("Failed to generate scramble:", error);
            this.state.currentScramble = "Error generating scramble";
            this.notify();
        }
    }

    setEvent(eventId) {
        this.state.currentEvent = eventId;
        this.save();
        this.generateScramble();
    }
}

export const store = new Store()
