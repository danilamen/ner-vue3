import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useProjectStore = defineStore('project', () => {
  const project = ref({
    name: 'sez'
  })
  const db = ref({
    host: 'Arhimed.local',
    user: 'root',
    password: '1',
    database: 'ner',
    import: 'import',
    export: 'output',
    batch_size: '10',
    current_row: '10'
  })

  return { db, project }
})
