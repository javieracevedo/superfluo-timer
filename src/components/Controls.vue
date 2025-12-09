<template>
  <div id="controls">
    <select :value="store.currentEvent" @change="handleChange" class="event-select">
        <option v-for="(label, value) in eventOptions" :key="value" :value="value">
            {{ label }}
        </option>
    </select>
  </div>
</template>

<script setup>
import { store, actions, EVENTS } from '@/store/store'

const eventOptions = {
    [EVENTS.THREE]: "3x3x3",
    [EVENTS.TWO]: "2x2x2",
    [EVENTS.FOUR]: "4x4x4",
    [EVENTS.FIVE]: "5x5x5",
    [EVENTS.SIX]: "6x6x6",
    [EVENTS.SEVEN]: "7x7x7",
    [EVENTS.PYRAMINX]: "Pyraminx",
    [EVENTS.MEGAMINX]: "Megaminx",
    [EVENTS.SKEWB]: "Skewb",
    [EVENTS.SQUARE1]: "Square-1",
    [EVENTS.CLOCK]: "Clock"
}

const handleChange = (event) => {
    actions.setEvent(event.target.value)
}
</script>

<style scoped>
.event-select {
    padding: 5px;
    font-size: 1rem;
}
</style>
