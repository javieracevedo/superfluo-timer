<template>
  <div id="stats-display">
    <h5>Time List (<span class="current-session-name">{{ currentSession?.name }}</span>)</h5>
    <ul id="time-list">
        <li v-for="time in currentSession?.times" :key="time.id">
            {{ time.str }}
            <button class="delete-btn" @click="deleteTime(time.id)">X</button>
        </li>
    </ul>
    <h5>Stats (<span class="current-session-name">{{ currentSession?.name }}</span>)</h5>
    <ul id="stat-list">
        <li>Best: <span class="best-time-val">{{ bestTime?.str || '-' }}</span></li>
        <li>Mean: <span class="mean-val">{{ meanTime || '-' }}</span></li>
    </ul>
  </div>
</template>

<script setup>
import { store, actions } from '@/store/store'
import { computed } from 'vue'
import { getBestTime, getMean } from '@/utils/stats'

const currentSession = computed(() => {
    return store.sessions.find(s => s.id === store.currentSessionId)
})

const bestTime = computed(() => {
    if (!currentSession.value) return null
    return getBestTime(currentSession.value.times)
})

const meanTime = computed(() => {
    if (!currentSession.value) return null
    return getMean(currentSession.value.times)
})

const deleteTime = (id) => {
    actions.removeTime(id)
}
</script>

<style scoped>
h5 {
    margin: 0;
    margin-bottom: 8px;
}

#stat-list,
#time-list {
    width: 100%;
    background-color: gray;
    list-style-type: decimal;
    height: 200px;
    overflow: scroll;
    margin: 0;
    color: white;
    margin-bottom: 8px;
    padding-left: 32px;
}

#stat-list {
    list-style-type: none;
    padding-left: 0;
    height: fit-content;
}

.delete-btn {
    margin-left: 10px;
    cursor: pointer;
    color: red;
}
</style>
