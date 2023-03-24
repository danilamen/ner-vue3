<template>
  <a-modal
    v-model:visible="isVisible"
    :title="`Редактирование набора №${props.title}`"
    @ok="handleOk"
    width="850px"
    class="table-modal-tags-edit-rules"
    centered
  >
    <template #footer>
      <a-button key="check" type="primary" @click="handleCheck">Проверить</a-button>
      <a-button key="save" @click="handleSave"><SaveOutlined /> Сохранить и закрыть</a-button>
    </template>
    <div class="table-modal-tags-edit-rules__input">
      <span>Название тэга:</span>
      <a-input v-model:value="tagName" />
    </div>
    <a-tabs v-model:activeKey="selectedTab" width="100%" defaultActiveKey="1">
      <a-tab-pane key="1" tab="Совпадение подстроки" class="tab-one">
        <span>Исключения по сочетанию букв (маска)</span>
        <a-input-search v-model:value="maskName" placeholder="Название маски" @search="addMask">
          <template #enterButton>
            <a-button type="primary">⏎</a-button>
          </template>
        </a-input-search>
        <a-checkbox-group v-model:value="selectedMasks" style="width: 100%">
          <a-table :dataSource="maskData" :columns="maskColumns" bordered>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'checkbox'">
                <a-checkbox :value="record"></a-checkbox>
              </template>
              <template v-if="column.key === 'lowercase'">
                <a-switch v-model:checked="record.lowercase" />
              </template>
              <template v-if="column.key === 'regExp'">
                <a-switch v-model:checked="record.regExp" />
              </template>
            </template>
          </a-table>
        </a-checkbox-group>
        <a-button @click="deleteSelectedMasks"><CloseOutlined /> Удалить выбранные</a-button>
        <label>
          <span>Проверка разметки:</span>
          <a-input v-model:value="checkedMarkup" disabled />
        </label>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Вкл. по фразе" force-render>Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="Фразы исключения">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script setup>
import { defineProps, computed, defineEmits, ref } from 'vue'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  visible: Boolean,
  title: Number
})

const emit = defineEmits(['update:visible'])

const isVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    emit('update:visible', visible)
  }
})

const tagName = ref('')
const maskName = ref('')

const addMask = (maskName) => {
  maskData.value.push({
    id: 1,
    value: maskName,
    lowercase: false,
    regExp: false
  })
}

const selectedTab = ref(1)

const handleOk = () => {
  isVisible.value = false
}

const handleReset = () => {
  isVisible.value = false
}

const maskColumns = [
  {
    title: ' ',
    dataIndex: 'checkbox',
    key: 'checkbox'
  },
  {
    title: '#',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Значение',
    dataIndex: 'value',
    key: 'value'
  },
  {
    title: 'Строчные',
    dataIndex: 'lowercase',
    key: 'lowercase'
  },
  {
    title: 'RegExp',
    dataIndex: 'regExp',
    key: 'regExp'
  }
]

const selectedMasks = ref([])

const maskData = ref([
  {
    id: 0,
    value: 'green/red',
    lowercase: ref(false),
    regExp: ref(false)
  },
  {
    id: 1,
    value: 'blue',
    lowercase: ref(false),
    regExp: ref(false)
  }
])

//TODO: Сделать проверку
const handleCheck = () => {
  console.log('Проверка')
}

//TODO: Сделать сохранение
const handleSave = () => {
  console.log('Сохранить и закрыть')
}

const deleteSelectedMasks = () => {
  selectedMasks.value = []
}

const checkedMarkup = ref('')
</script>

<style>
.table-modal-tags-edit-rules > .ant-modal-content > .ant-modal-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.table-modal-tags-edit-rules__input {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.table-modal-tags-edit-rules__input > span {
  white-space: nowrap;
}

.tab-one {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
