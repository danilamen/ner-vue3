<template>
  <TableModalTagsEdit
    v-if="editableTag"
    v-model:visible="isTagsEditModalOpened"
    :title="editableTag.id"
    @update:tagsSet="updateTags"
    :tags="editableTag"
  />
  <a-modal
    v-model:visible="isVisible"
    :title="`Установка набора тегов для поля: ${props.title}`"
    @ok="saveTags"
    width="800px"
    class="table-modal-tags"
  >
    <template #footer>
      <a-button key="save" type="primary" @click="saveTags"
        ><SaveOutlined /> Сохранить и закрыть</a-button
      >
      <a-button key="reset" @click="handleReset">Сбросить сопоставление</a-button>
      <a-button key="add" @click="createSet"><PlusOutlined /> Создать набор</a-button>
    </template>

    <a-radio-group v-model:value="selectedTags" style="width: 100%">
      <a-table :dataSource="tableData" :columns="columns" bordered style="width: 100%">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'option'">
            <a-radio :value="record.tagsSet"></a-radio>
          </template>
          <template v-if="column.key === 'editSet'">
            <a-button @click="handleEditTagsButtonClick(record)"><EllipsisOutlined /></a-button>
          </template> </template
      ></a-table>
    </a-radio-group>
  </a-modal>
</template>

<script setup>
import { defineProps, computed, defineEmits, ref, watchEffect } from 'vue'
import TableModalTagsEdit from './table-modal-tags-edit'
import { EllipsisOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  visible: Boolean,
  title: String,
  tags: String
})

const emit = defineEmits(['update:visible', 'update:tagsSet'])

const isVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    emit('update:visible', visible)
  }
})

const selectedTags = ref(undefined)

watchEffect(() => {
  selectedTags.value = props.tags
})

const columns = [
  {
    title: ' ',
    dataIndex: 'option',
    key: 'option'
  },
  {
    title: '#',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Набор Тегов',
    dataIndex: 'tagsSet',
    key: 'tagsSet'
  },
  {
    title: ' ',
    dataIndex: 'editSet',
    key: 'editSet'
  }
]

const tableData = ref([
  { id: 0, tagsSet: 'COLORS' },
  { id: 1, tagsSet: 'HASDOC' }
])

const saveTags = () => {
  emit('update:tagsSet', selectedTags.value)
  isVisible.value = false
}

const handleReset = () => {
  selectedTags.value = undefined
}

const createSet = () => {
  if (!tableData.value) {
    tableData.value = [{ id: 0, tagsSet: '' }]
  }

  tableData.value.push({
    id: tableData.value.length,
    tagsSet: ''
  })
}

const updateTags = (tags) => {
  if (!tags) {
    tableData.value = tableData.value.filter((tag) => tag.id !== editableTag.value.id)
  }

  editableTag.value = { ...editableTag.value, tagsSet: tags }

  tableData.value = tableData.value.map((tag) => {
    if (tag.id !== editableTag.value.id) {
      return tag
    }

    return { id: tag.id, tagsSet: editableTag.value.tagsSet }
  })

  console.log(tableData.value)
}

const isTagsEditModalOpened = ref(false)
const editableTag = ref(undefined)

const handleEditTagsButtonClick = (record) => {
  isTagsEditModalOpened.value = true
  editableTag.value = record
}
</script>

<style>
.table-modal-tags > .ant-modal-content > .ant-modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
