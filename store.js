export const VALID_STATES = {
    IDLE: "IDLE",
    INSPECTING: "INSPECTING",
    SOLVING: "SOLVING"
}

export class Store {
    constructor() {
        this.state = {
            sessions: [],
            currentSessionId: null,
            timerState: VALID_STATES.IDLE,
            elapsedTime: 0,
            inspectionTime: 15
        }
        this.listeners = []

        // Initialize with default session
        this.addSession("Default Session")
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

    getState() {
        return this.state
    }

    getCurrentSession() {
        return this.state.sessions.find(s => s.id === this.state.currentSessionId)
    }

    addSession(name) {
        const newSession = {
            id: Date.now().toString(),
            name,
            times: []
        }
        this.state.sessions.push(newSession)
        this.state.currentSessionId = newSession.id
        this.notify()
        return newSession
    }

    switchSession(sessionId) {
        // Find by name if passed as name (for dropdown compatibility) or ID
        const session = this.state.sessions.find(s => s.id === sessionId || s.name === sessionId)
        if (session) {
            this.state.currentSessionId = session.id
            this.notify()
        }
    }

    addTime(timeObject) {
        const session = this.getCurrentSession()
        if (session) {
            session.times.push(timeObject)
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
