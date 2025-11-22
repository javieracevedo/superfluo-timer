
import { mutateState } from "./laMaquina.js"
import { switchSession } from "./chronos.js"

const sessionSelect = document.querySelector("#session-select");
sessionSelect.addEventListener("change", (event) => {
    switchSession(event.target.value)
})

function handleKeyEvent(event) {
    mutateState(event);
}

document.addEventListener("keydown", handleKeyEvent);
document.addEventListener("keyup", handleKeyEvent);




