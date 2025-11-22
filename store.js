import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@11.0.3/+esm';

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
        } else {
            this.state = {
                sessions: [],
                currentSessionId: null,
                timerState: VALID_STATES.IDLE,
                elapsedTime: 0,
                inspectionTime: 15
            }
            // Initialize with default session
            this.addSession("Default Session")
        }
        this.listeners = []
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
            currentSessionId: this.state.currentSessionId
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
            session.times.push(timeObject)
            this.save()
            this.notify()
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
}

export const store = new Store()
