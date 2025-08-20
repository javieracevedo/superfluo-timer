export function createSession(name) {
    return { id: Math.floor(Math.random() * 100), name, time: [] };
}

export function removeSessionTime(session, timeId) {
    return session.times.filter(id => id != timeId)
}

export function addSessionTime(session, time) {
    session.times.push(time)
}
