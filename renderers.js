import { getBestTime, getMean } from "./stats.js"


export function renderTimeList(timeList) {
    const listContainer = document.querySelector("#time-list")
    listContainer.innerHTML = ""
    
    timeList.forEach(({ str }) => {
        const li = document.createElement("li")
        li.innerText = str
        listContainer.appendChild(li)
    })
}

export function renderStatList(list) {
    const bestTimeElement = document.querySelector("#stat-list .best-time-val")
    const meanElement = document.querySelector("#stat-list .mean-val")

    const { str: best } = getBestTime(list)
    const mean = getMean(list)

    bestTimeElement.innerText = best
    meanElement.innerText = mean
}


export default {
    renderTimeList,
    renderStatList
}