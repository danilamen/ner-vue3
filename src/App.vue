<script setup>
import AppHeader from './components/app-header.vue'
import AppTable from './components/app-table.vue'
</script>

<template>
  <div id="app">
    <AppHeader />
    <AppTable class="app__table" />
    <div class="app__footer">
      <a-button type="primary">Сохранить сопоставление</a-button>
      <a-button>Протегировать и отправить для анализа</a-button>
    </div>
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

.app__footer {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
