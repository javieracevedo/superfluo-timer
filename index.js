
import { mutateState } from "./laMaquina.js"
import { switchSession, createNewSession } from "./chronos.js"

const sessionSelect = document.querySelector("#session-select");
sessionSelect.addEventListener("change", (event) => {
    switchSession(event.target.value)
})

const createSessionButton = document.querySelector("#create-session-button");
createSessionButton.addEventListener("click", () => {
    const sessionNameInput = document.querySelector("#session-name-input");
    createNewSession(sessionNameInput.value)
    sessionNameInput.value = ""
})

function handleKeyEvent(event) {
    mutateState(event);
}

document.addEventListener("keydown", handleKeyEvent);
document.addEventListener("keyup", handleKeyEvent);




