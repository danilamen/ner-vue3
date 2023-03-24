<template>
  <TableModalTagsEditRules
    v-if="editableTag"
    v-model:visible="isTagEditRulesModalOpened"
    :title="title"
  />
  <a-modal
    v-model:visible="isVisible"
    :title="`Редактирование набора №${props.title}`"
    @ok="handleOk"
    width="850px"
    class="table-modal-tags-edit"
    centered
  >
    <template #footer>
      <a-button key="save" type="primary" @click="handleOk"
        ><SaveOutlined /> Сохранить выделенные в набор
      </a-button>
      <a-button key="delete" @click="handleReset"><CloseOutlined /> Удалить тэг(и)</a-button>
    </template>
    <div class="table-modal-tags-edit__input">
      <span>Создать тэг:</span>
      <a-input-search v-model:value="value" placeholder="Название набора" @search="onSearch">
        <template #enterButton>
          <a-button type="primary">⏎</a-button>
        </template>
      </a-input-search>
    </div>
    <a-checkbox-group v-model:value="selectedTags" style="width: 100%">
      <a-table :dataSource="tableData" :columns="columns" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'checkbox'">
            <a-checkbox :value="record.tag"></a-checkbox>
          </template>
          <template v-if="column.key === 'rules'">
            <a-button @click="handleEditTagButtonClick(record)"><EllipsisOutlined /></a-button>
          </template>
        </template>
      </a-table>
    </a-checkbox-group>
  </a-modal>
</template>

<script setup>
import { defineProps, computed, defineEmits, ref, watch } from 'vue'
import TableModalTagsEditRules from './table-modal-tags-edit-rules'
import { EllipsisOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons-vue'

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

const selectedTags = ref(undefined)

watch(selectedTags, () => console.log(selectedTags.value))

const columns = [
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
    title: 'Тэги',
    dataIndex: 'tag',
    key: 'tag'
  },
  {
    title: 'Правила',
    dataIndex: 'rules',
    key: 'rules'
  }
]

const tableData = [
  { id: 0, tag: 'COLORS' },
  { id: 1, tag: 'FRUITS' },
  { id: 2, tag: 'VEGETABLES' },
  { id: 3, tag: 'HASDOC' },
  { id: 4, tag: 'DOCID' },
  { id: 5, tag: 'sdf' }
]

const handleOk = () => {
  isVisible.value = false
}

const handleReset = () => {
  isVisible.value = false
}

const isTagEditRulesModalOpened = ref(false)
const editableTag = ref(undefined)

const handleEditTagButtonClick = (record) => {
  isTagEditRulesModalOpened.value = true
  editableTag.value = record
}
</script>

<style>
.table-modal-tags-edit > .ant-modal-content > .ant-modal-body {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.table-modal-tags-edit__input {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.table-modal-tags-edit__input > span {
  white-space: nowrap;
}
</style>
