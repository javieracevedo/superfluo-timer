import chronos from "./chronos.js";

// TODO: create timer inside index.js instead
const timerElement = document.querySelector("#timer");
const { timer, startInspection, stopInspectionTimer } = chronos(timerElement)


export const VALID_STATES = {
    IDLE: 1,
    INSPECTING: 2,
    SOLVING: 3
}

export const VALID_STATES_LABELS = {
    1: "IDLE",
    2: "INSPECTING",
    3: "SOLVING"
}

const handler = {
    set(target, property, value) {
        target[property] = value;

        // TODO: I would like to not have all of this inside the setter of the object
        if (stateMachine.state == VALID_STATES.IDLE) {
            timer("stop")
        } else if (stateMachine.state == VALID_STATES.INSPECTING) {
            startInspection()
        } else if (stateMachine.state == VALID_STATES.SOLVING) {
            stopInspectionTimer()
            timer("start")
        }
        return true;
    }
};

export const stateMachine = new Proxy({ state: VALID_STATES.IDLE }, handler);


export function mutateState(event) {
    if (stateMachine.state == VALID_STATES.IDLE && event.code == "Space" && event.type == "keydown") {
        stateMachine.state = VALID_STATES.INSPECTING
    } else if (stateMachine.state == VALID_STATES.INSPECTING && event.code == "Space" && event.type == "keyup") {
        stateMachine.state = VALID_STATES.SOLVING
    } else if (stateMachine.state == VALID_STATES.SOLVING && event.code == "Space" && event.type == "keydown") {
        stateMachine.state = VALID_STATES.IDLE
    }
    return stateMachine
}

export default {
    mutateState,
    stateMachine,
    VALID_STATES,
    VALID_STATES_LABELS
}