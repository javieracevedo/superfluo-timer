
import { mutateState } from "./laMaquina.js"

function handleKeyEvent(event) {
    mutateState(event);
}

document.addEventListener("keydown", handleKeyEvent);
document.addEventListener("keyup", handleKeyEvent);