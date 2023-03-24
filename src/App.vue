<script setup>
import AppHeader from './components/app-header.vue'
import AppTable from './components/app-table.vue'
</script>

<template>
  <div id="app">
    <AppHeader />
    <AppTable class="app__table" />
  </div>
</template>

<style scoped>
#app {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.app__table {
  border: 1px solid lightgrey;
}
</style>
