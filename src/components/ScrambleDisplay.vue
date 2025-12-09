<template>
  <div id="scramble-display">
    {{ store.currentScramble }}
  </div>
</template>

<script setup>
import { store } from '../store/store'
</script>

<style scoped>
#scramble-display {
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
    font-family: monospace;
    min-height: 1.5em;
}
</style>
