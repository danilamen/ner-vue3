<template>
  <a-modal
    v-model:visible="isVisible"
    :title="`Редактирование набора №${props.title}`"
    @ok="handleOk"
    width="850px"
    class="table-modal-tags-edit-rules"
    @cancel="handleCancel"
    centered
  >
    <template #footer>
      <a-button key="check" type="primary" @click="handleCheck">Проверить</a-button>
      <a-button key="save" @click="handleSave"><SaveOutlined /> Сохранить и закрыть</a-button>
    </template>
    <div class="table-modal-tags-edit-rules__input">
      <span>Название тэга:</span>
      <a-input v-model:value="localTagName" />
    </div>
    <a-tabs v-model:activeKey="selectedTab" width="100%" :defaultActiveKey="selectedTab">
      <a-tab-pane key="1" tab="Совпадение подстроки" class="edit-rules-tab">
        <span>Исключения по сочетанию букв (маска)</span>
        <a-input-search
          v-model:value="matcherName"
          placeholder="Название совпадения"
          @search="addMatcher"
        >
          <template #enterButton>
            <a-button type="primary">⏎</a-button>
          </template>
        </a-input-search>
        <a-checkbox-group v-model:value="selectedMatchers" style="width: 100%">
          <a-table :dataSource="localMatchers" :columns="matcherColumns" bordered>
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
        <a-button @click="deleteSelectedMatchers"><CloseOutlined /> Удалить выбранные</a-button>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Вкл. по фразе" force-render class="edit-rules-tab">
        <span>Включение по фразе</span>
        <a-checkbox v-model:checked="isIgnoreWordform">Не учитывать словоформы</a-checkbox>
        <a-input-search
          v-model:value="phrasematcherName"
          placeholder="Название фразы"
          @search="addPhrasematcher"
        >
          <template #enterButton>
            <a-button type="primary">⏎</a-button>
          </template>
        </a-input-search>
        <a-checkbox-group v-model:value="selectedPhrasematchers" style="width: 100%">
          <a-table :dataSource="localPhrasematchers" :columns="phrasematcherColumns" bordered>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'checkbox'">
                <a-checkbox :value="record"></a-checkbox>
              </template>
            </template>
          </a-table>
        </a-checkbox-group>
        <a-button @click="deleteSelectedPhrasematchers"
          ><CloseOutlined /> Удалить выбранные</a-button
        >
      </a-tab-pane>
      <a-tab-pane
        key="3"
        tab="Фразы исключения"
        class="edit-rules-tab"
        v-if="localPhrasematchers && localPhrasematchers.length"
      >
        <span>Исключение из маски по фразе (только если указано включение по фразе)</span>
        <a-checkbox v-model:checked="isIgnoreWordformExcluder">Не учитывать словоформы</a-checkbox>
        <a-input-search
          v-model:value="excluderName"
          placeholder="Название фразы"
          @search="addExcluder"
        >
          <template #enterButton>
            <a-button type="primary">⏎</a-button>
          </template>
        </a-input-search>
        <a-checkbox-group v-model:value="selectedExcluders" style="width: 100%">
          <a-table :dataSource="localExcluders" :columns="excludersColumns" bordered>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'checkbox'">
                <a-checkbox :value="record"></a-checkbox>
              </template>
            </template>
          </a-table>
        </a-checkbox-group>
        <a-button @click="deleteSelectedExcluders"><CloseOutlined /> Удалить выбранные</a-button>
      </a-tab-pane>
    </a-tabs>
    <label>
      <span>Проверка разметки:</span>
      <a-input v-model:value="checkedMarkup" disabled />
    </label>
  </a-modal>
</template>

<script setup>
import { defineProps, computed, defineEmits, ref, watchEffect, onUpdated } from 'vue'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { deleteSelected } from '../utils'

const props = defineProps({
  visible: Boolean,
  title: Number,
  rules: Object
})

const emit = defineEmits(['update:visible', 'update:tagRules'])

onUpdated(() => {
  selectedTab.value = '1'
})

const localTagName = ref('')

watchEffect(() => {
  localTagName.value = props.rules.tag.rule.tag
})

// ------------------------
// Совпадение подстроки
const localMatchers = ref([])
const selectedMatchers = ref([])
const matcherName = ref('')

const addMatcher = () => {
  if (!localMatchers.value) {
    localMatchers.value = [
      {
        id: 0,
        value: matcherName.value
      }
    ]

    return
  }

  localMatchers.value.push({
    id: localMatchers.value.length,
    value: matcherName.value,
    lowercase: ref(false),
    regExp: ref(false)
  })

  matcherName.value = ''
}

const deleteSelectedMatchers = () => {
  const { newArray, newSelectedArray } = deleteSelected(localMatchers.value, selectedMatchers.value)
  localMatchers.value = newArray
  selectedMatchers.value = newSelectedArray
}

watchEffect(() => {
  localMatchers.value =
    props.rules.tag.rule.matchers &&
    props.rules.tag.rule.matchers.values.map((matcher, idx) => ({
      id: idx,
      value: matcher.LOWER.REGEX ? matcher.LOWER.REGEX : matcher.LOWER,
      lowercase: ref(matcher.LOWER.REGEX ? false : true),
      regExp: ref(matcher.LOWER.REGEX ? true : false)
    }))
})

const matcherColumns = [
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

// ------------------------
// Включение по фразе
const localPhrasematchers = ref([])
const selectedPhrasematchers = ref([])
const phrasematcherName = ref('')

const addPhrasematcher = () => {
  if (!localPhrasematchers.value) {
    localPhrasematchers.value = [
      {
        id: 0,
        value: phrasematcherName.value
      }
    ]

    return
  }

  localPhrasematchers.value.push({
    id: localPhrasematchers.value.length,
    value: phrasematcherName.value
  })

  phrasematcherName.value = ''
}

const deleteSelectedPhrasematchers = () => {
  const { newArray, newSelectedArray } = deleteSelected(
    localPhrasematchers.value,
    selectedPhrasematchers.value
  )
  localPhrasematchers.value = newArray
  selectedPhrasematchers.value = newSelectedArray
}

watchEffect(() => {
  localPhrasematchers.value =
    props.rules.tag.rule.phrasematchers &&
    props.rules.tag.rule.phrasematchers.values.map((phrasematcher, idx) => ({
      id: idx,
      value: phrasematcher
    }))
})

const isIgnoreWordform = ref(false)

const phrasematcherColumns = [
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
  }
]

// Фразы исключения

const localExcluders = ref([])
const selectedExcluders = ref([])
const excluderName = ref('')

const addExcluder = () => {
  if (!localExcluders.value) {
    localExcluders.value = [
      {
        id: 0,
        value: excluderName.value
      }
    ]

    return
  }

  localExcluders.value.push({
    id: localExcluders.value.length,
    value: excluderName.value
  })

  excluderName.value = ''
}

const deleteSelectedExcluders = () => {
  const { newArray, newSelectedArray } = deleteSelected(
    localExcluders.value,
    selectedExcluders.value
  )
  localExcluders.value = newArray
  selectedExcluders.value = newSelectedArray
}

watchEffect(() => {
  localExcluders.value =
    props.rules.tag.rule.excluders &&
    props.rules.tag.rule.excluders.values.map((excluder, idx) => ({
      id: idx,
      value: excluder
    }))
})

const isIgnoreWordformExcluder = ref(false)

const excludersColumns = [
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
  }
]

// ------------------------
// Логика модального окна
const isVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    emit('update:visible', visible)
  }
})

const selectedTab = ref('1')

const handleOk = () => {
  isVisible.value = false
  selectedMatchers.value = localMatchers.value
}

const handleCancel = () => {
  isVisible.value = false
  selectedMatchers.value = localMatchers.value
}

const handleReset = () => {
  isVisible.value = false
}

// Собрать правила из всех табов
const collectRules = () => {
  const tag = {
    rule: {
      tag: localTagName.value,
      matchers: {
        values: selectedMatchers.value.map((matcher) => {
          if (matcher.regExp) {
            return { LOWER: { REGEX: matcher.value } }
          }
          return { LOWER: matcher.value }
        })
      },
      phrasematchers: {
        attr: ['LEMMA'],
        values: selectedPhrasematchers.value.map(({ value }) => value)
      },
      excluders: {
        values: selectedExcluders.value.map(({ value }) => value)
      }
    }
  }

  console.log(tag)

  return tag
}

const handleSave = () => {
  console.log('Сохранить и закрыть')

  emit('update:tagRules', collectRules())
  isVisible.value = false
}

const checkedMarkup = ref('')
//TODO: Сделать проверку
const handleCheck = () => {
  console.log('Проверка')
}
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

.edit-rules-tab {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
