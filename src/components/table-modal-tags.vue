<template>
  <TableModalTagsEdit
    v-if="editableTag"
    v-model:visible="isTagsEditModalOpened"
    :title="editableTag.id"
  />
  <a-modal
    v-model:visible="isVisible"
    :title="`Установка набора тегов для поля: ${props.title}`"
    @ok="handleOk"
    width="800px"
    class="table-modal-tags"
  >
    <template #footer>
      <a-button key="save" type="primary" @click="handleOk"
        ><SaveOutlined /> Сохранить и закрыть</a-button
      >
      <a-button key="reset" @click="handleReset">Сбросить сопоставление</a-button>
      <a-button key="add" @click="handleReset"><PlusOutlined /> Создать набор</a-button>
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
import { defineProps, computed, defineEmits, ref } from 'vue'
import TableModalTagsEdit from './table-modal-tags-edit.vue'
import { EllipsisOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  visible: Boolean,
  title: String
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

const tableData = [
  { id: 0, tagsSet: 'COLORS;' },
  { id: 1, tagsSet: 'HASDOC;' }
]

const handleOk = () => {
  isVisible.value = false
}

const handleReset = () => {
  isVisible.value = false
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
