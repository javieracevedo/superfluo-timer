<template>
  <div id="scramble-visualization">
    <twisty-player
      ref="twistyPlayerRef"
      visualization="2D"
      control-panel="none"
      background="none"
      :alg="store.currentScramble"
      :puzzle="puzzleMapping[store.currentEvent] || '3x3x3'"
      style="width: 300px; height: 300px;"
    ></twisty-player>
  </div>
</template>

<script setup>
import { store } from '@/store/store'
import { computed } from 'vue'
import 'cubing/twisty'

const puzzleMapping = {
    "333": "3x3x3",
    "222": "2x2x2",
    "444": "4x4x4",
    "555": "5x5x5",
    "666": "6x6x6",
    "777": "7x7x7",
    "pyram": "pyraminx",
    "minx": "megaminx",
    "skewb": "skewb",
    "sq1": "square1",
    "clock": "clock"
}
</script>

<style scoped>
#scramble-visualization {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>
