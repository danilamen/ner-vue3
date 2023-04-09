<template>
  <div>
    <TableModalTags
      v-if="currentRecord"
      v-model:visible="isTagsModalOpened"
      :title="currentRecord.field"
      :tags="currentRecord.ruleset"
      @update:tagsSet="updateTags"
    />
    <a-table
      :dataSource="tableDataStore.sourceTable"
      :columns="columns"
      bordered
      :pagination="{
        simple: true
      }"
      @change="paginate"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'tagsNumber'">
          <div class="table__cell cell-table">
            <span> {{ record.ruleset }}</span>
            <a-button @click="handleTagsNumberButtonClick(record)"><EditOutlined /></a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TableModalTags from './table-modal-tags.vue'
import { EditOutlined } from '@ant-design/icons-vue'
import { useTableDataStore } from '../stores/tableDataStore'

const tableDataStore = useTableDataStore()

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

const updateTags = (tags) => {
  tableDataStore.sourceTable = tableDataStore.sourceTable.map((record) => {
    if (record.id !== currentRecord.value.id) {
      return record
    }

    return { id: record.id, field: record.field, ruleset: tags }
  })
}

const paginate = (pagination) => {
  console.log(pagination)
}
</script>

<style>
.table__cell {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
}

.cell-table {
}
</style>
