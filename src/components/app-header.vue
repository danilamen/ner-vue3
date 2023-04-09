<template>
  <div class="header">
    <AppModalSettings
      v-model:visible="isModalSettingsOpened"
      :settings="settings"
      @update:settings="updateSettings"
    />
    <a-dropdown>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">Новый проект</a-menu-item>
          <a-menu-item key="2">Сохранить проект</a-menu-item>
          <a-menu-item key="3">Настройки</a-menu-item>
          <a-menu-item key="3">Сохранить и выйти</a-menu-item>
        </a-menu>
      </template>
      <a-button><EllipsisOutlined /></a-button>
    </a-dropdown>
    <span class="header__text">Текущий проект: Проект 1</span>
    <a-button @click="openSettings"><SettingOutlined /></a-button>
    <a-button><UserDeleteOutlined /></a-button>
  </div>
</template>

<script setup>
import { EllipsisOutlined, SettingOutlined, UserDeleteOutlined } from '@ant-design/icons-vue'
import AppModalSettings from './app-modal-settings.vue'
import { ref, computed } from 'vue'
import { useProjectStore } from '../stores/projectStore'

const projectStore = useProjectStore()

const settings = computed(() => {
  return isEmptyFields.value
    ? {
        projectName: '',
        db: {
          host: '',
          user: '',
          password: '',
          database: '',
          import: '',
          export: '',
          batch_size: '10',
          current_row: ''
        }
      }
    : { projectName: projectStore.project.name, db: projectStore.db }
})

const isModalSettingsOpened = ref(false)
const isEmptyFields = ref(false)

const dropdownActions = {
  1: () => {
    isEmptyFields.value = true
    isModalSettingsOpened.value = !isModalSettingsOpened.value
  },
  3: () => {
    isEmptyFields.value = false
    isModalSettingsOpened.value = !isModalSettingsOpened.value
  }
}

const handleMenuClick = (e) => {
  dropdownActions[e.key]()
}

const openSettings = () => {
  isEmptyFields.value = false
  isModalSettingsOpened.value = !isModalSettingsOpened.value
}

const updateSettings = ({ db, projectName }) => {
  projectStore.db = db
  projectStore.project.name = projectName
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.header__text {
  display: inline-block;
}
</style>
