<template>
  <div id="app-container">
    <h1>SuperFluo Timer</h1>
    <div id="session-container">
      <SessionManager />
    </div>

    <div id="scramble-container">
        <ScrambleDisplay />
    </div>

    <div id="visualization-container">
        <ScrambleVisualization />
    </div>

    <div id="controls-container">
        <Controls />
    </div>

    <div id="timer-container">
        <div id="list-container">
            <StatsDisplay />
        </div>

        <TimerDisplay />

        <div id="start-stop-message">
            HIT SPACE TO START/STOP
        </div>
    </div>
  </div>
</template>

<script setup>
import SessionManager from '@/components/SessionManager.vue'
import ScrambleDisplay from '@/components/ScrambleDisplay.vue'
import ScrambleVisualization from '@/components/ScrambleVisualization.vue'
import Controls from '@/components/Controls.vue'
import StatsDisplay from '@/components/StatsDisplay.vue'
import TimerDisplay from '@/components/TimerDisplay.vue'
import { onMounted, onUnmounted } from 'vue'
import { useTimer } from '@/composables/useTimer'

const { handleKeyDown, handleKeyUp } = useTimer()

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>

<style>
* {
    box-sizing: border-box;
}

body {
    font-family: sans-serif;
}

#app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    text-align: center;
    font-size: 56px;
    margin: 40px auto;
}

h5 {
    margin: 0;
    margin-bottom: 8px;
}

#list-container {
    width: 200px;
    min-height: 200px;
    position: absolute;
    left: 20px; /* Position it like in the original layout */
}

#timer-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

#start-stop-message {
    text-align: center;
    border: 1px solid black;
    padding: 20px;
    max-width: fit-content;
    margin: auto;
}

#session-container {
    width: 300px;
    margin-bottom: 20px;
}

#scramble-container {
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
    font-family: monospace;
    min-height: 1.5em;
    max-width: 80%;
}

#visualization-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

#controls-container {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
}
</style>
