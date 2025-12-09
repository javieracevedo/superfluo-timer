<template>
  <div id="timer" :style="{ color: timerColor }">
    {{ formattedTime }}
  </div>
</template>

<script setup>
import { store, VALID_STATES } from '../store/store'
import { getTime, formatTime } from '../utils/stats'
import { computed } from 'vue'

const timerColor = computed(() => {
    if (store.timerState === VALID_STATES.INSPECTING) return 'green'
    return 'black'
})

const formattedTime = computed(() => {
    if (store.timerState === VALID_STATES.INSPECTING) {
        return store.inspectionTime
    }

    // IDLE or SOLVING
    if (store.elapsedTime === 0) return "00:00:00:000"

    const time = getTime(store.elapsedTime)
    return formatTime(time)
})
</script>

<style scoped>
#timer {
    text-align: center;
    font-size: 56px;
    margin-bottom: 112px;
}
</style>
