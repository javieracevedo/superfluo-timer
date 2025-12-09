<template>
  <div id="session-manager">
    <input
        id="session-name-input"
        type="text"
        v-model="newSessionName"
        placeholder="New Session Name"
    />
    <button id="create-session-button" @click="createSession">Create</button>
    <select id="session-select" :value="store.currentSessionId" @change="switchSession">
        <option v-for="session in store.sessions" :key="session.id" :value="session.id">
            {{ session.name }}
        </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store, actions } from '../store/store'

const newSessionName = ref('')

const createSession = () => {
    if (newSessionName.value) {
        actions.addSession(newSessionName.value)
        newSessionName.value = ''
    }
}

const switchSession = (event) => {
    actions.switchSession(event.target.value)
}
</script>

<style scoped>
#session-manager {
    width: 100%;
}

#session-name-input {
    display: block;
    width: 100%;
    margin-bottom: 5px;
}

#create-session-button {
    width: 100%;
    margin-bottom: 20px;
}

#session-select {
    width: 100%;
}
</style>
