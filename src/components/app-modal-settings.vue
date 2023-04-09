<template>
  <a-modal
    v-model:visible="isVisible"
    title="Настройка проекта"
    @ok="saveTags"
    width="800px"
    class="table-modal-settings"
    centered
  >
    <template #footer>
      <a-button key="check" @click="checkConnection">Проверить подключение</a-button>
      <a-button key="recreate" @click="recreateTable"
        >Пересоздать таблицу classification_rules_assign</a-button
      >
      <a-button key="save" type="primary" @click="saveSettings"
        ><SaveOutlined /> Сохранить и закрыть</a-button
      >
    </template>

    <label class="settings-input settings-input_project-name">
      <span>Название проекта: </span>
      <a-input v-model:value="projectName" />
    </label>

    <div class="table-modal-settings__body settings-body">
      <span class="settings-body__title ant-modal-title">Настройки базы данных</span>
      <label class="settings-input">
        <span>Сервер: </span>
        <a-input v-model:value="dbSettings.host" />
      </label>
      <label class="settings-input">
        <span>Имя пользователя: </span>
        <a-input v-model:value="dbSettings.name" />
      </label>
      <label class="settings-input">
        <span>Пароль: </span>
        <a-input v-model:value="dbSettings.password" />
      </label>
      <label class="settings-input">
        <span>Имя БД: </span>
        <a-input v-model:value="dbSettings.database" />
      </label>
      <label class="settings-input">
        <span>Таблица исходных данных: </span>
        <a-input v-model:value="dbSettings.import" />
      </label>
      <label class="settings-input">
        <span>Таблица данных для выгрузки: </span>
        <a-input v-model:value="dbSettings.export" />
      </label>
      <label class="settings-input">
        <span>Размер пакета: </span>
        <a-input v-model:value="dbSettings.batchSize" />
      </label>
    </div>
  </a-modal>
</template>

<script setup>
import { defineProps, computed, defineEmits, ref, watchEffect } from 'vue'
import { SaveOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  visible: Boolean,
  settings: Object
})

const projectName = ref(props.settings.projectName)

const dbSettings = ref({
  host: props.settings.db.host,
  name: props.settings.db.user,
  password: props.settings.db.password,
  database: props.settings.db.database,
  import: props.settings.db.import,
  export: props.settings.db.export,
  batchSize: props.settings.db.batch_size
})

watchEffect(() => {
  projectName.value = props.settings.projectName
  dbSettings.value = {
    host: props.settings.db.host,
    name: props.settings.db.user,
    password: props.settings.db.password,
    database: props.settings.db.database,
    import: props.settings.db.import,
    export: props.settings.db.export,
    batchSize: props.settings.db.batch_size
  }
})

const emit = defineEmits(['update:visible', 'update:settings'])

const isVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    emit('update:visible', visible)
  }
})

const handleReset = () => {
  isVisible.value = false
}

const saveSettings = () => {
  emit('update:settings', {
    projectName: projectName.value,
    db: dbSettings.value
  })

  isVisible.value = !isVisible.value
}
</script>

<style>
.table-modal-settings > .ant-modal-content > .ant-modal-body {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.table-modal-settings > .ant-modal-content > .ant-modal-footer {
  display: flex;
}

.settings-input_project-name {
  margin-bottom: 1rem;
}

.settings-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.settings-body__title {
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}
</style>
