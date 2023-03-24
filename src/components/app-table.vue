<template>
  <div>
    <TableModalTags
      v-if="currentRecord"
      v-model:visible="isTagsModalOpened"
      :title="currentRecord.field"
    />
    <a-table :dataSource="tableSource" :columns="columns" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'tagsNumber'">
          <a-button @click="handleTagsNumberButtonClick(record)"><EditOutlined /></a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TableModalTags from './table-modal-tags.vue'
import tableSource from './table_source.json'
import { EditOutlined } from '@ant-design/icons-vue'

const columns = [
  {
    title: 'Столбец',
    dataIndex: 'field',
    key: 'field'
  },
  {
    title: 'Набор тэгов',
    dataIndex: 'tagsNumber',
    key: 'tagsNumber'
  },
  {
    title: 'Исходный текст',
    dataIndex: 'initialText',
    key: 'initialText'
  },
  {
    title: 'Результат обработки',
    dataIndex: 'result',
    key: 'result'
  }
]

const isTagsModalOpened = ref(false)
const currentRecord = ref(undefined)

const handleTagsNumberButtonClick = (record) => {
  isTagsModalOpened.value = true
  currentRecord.value = record
}
</script>
