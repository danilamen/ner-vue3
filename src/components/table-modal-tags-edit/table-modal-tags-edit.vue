<template>
  <TableModalTagsEditRules
    v-if="editableTag"
    v-model:visible="isTagEditRulesModalOpened"
    :title="title"
    :rules="editableTag"
    @update:tagRules="updateTagRules"
  />
  <a-modal
    v-model:visible="isVisible"
    :title="`Редактирование набора №${props.title}`"
    @ok="saveTags"
    width="850px"
    class="table-modal-tags-edit"
    centered
  >
    <template #footer>
      <a-button key="save" type="primary" @click="saveTags"
        ><SaveOutlined /> Сохранить выделенные в набор
      </a-button>
      <a-button key="delete" @click="deleteTags"><CloseOutlined /> Удалить тэг(и)</a-button>
    </template>
    <div class="table-modal-tags-edit__input">
      <span>Создать тэг:</span>
      <a-input-search v-model:value="tagName" placeholder="Название набора" @search="addTag">
        <template #enterButton>
          <a-button type="primary">⏎</a-button>
        </template>
      </a-input-search>
    </div>
    <a-checkbox-group v-model:value="selectedTags" style="width: 100%">
      <a-table :dataSource="tags" :columns="columns" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'checkbox'">
            <a-checkbox :value="record.tag.rule.tag"></a-checkbox>
          </template>
          <template v-if="column.key === 'rules'">
            <a-button @click="handleEditTagButtonClick(record)"><EllipsisOutlined /></a-button>
          </template>
          <template v-if="column.key === 'tag'">
            <span>{{ record.tag.rule.tag }}</span>
          </template>
        </template>
      </a-table>
    </a-checkbox-group>
  </a-modal>
</template>

<script setup>
import { defineProps, computed, defineEmits, ref, watch, onUpdated } from 'vue'
import TableModalTagsEditRules from '../table-modal-tags-edit-rules'
import { EllipsisOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { useNerConfigStore } from '../../stores/nerConfigStore'
import { deleteSelected } from '../utils'

const nerConfigStore = useNerConfigStore()

const props = defineProps({
  visible: Boolean,
  title: Number,
  tags: Object
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

onUpdated(() => {
  if (!props.tags) {
    return
  }

  selectedTags.value = props.tags.tagsSet.split('; ')
  console.log(selectedTags.value)
})

watch(selectedTags, () => console.log(selectedTags.value))

const columns = [
  {
    title: ' ',
    dataIndex: 'checkbox',
    key: 'checkbox'
  },
  {
    title: '#',
    dataIndex: 'number',
    key: 'number'
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

const tags = computed(() =>
  nerConfigStore.ner_config[0].classification.map((tag, idx) => {
    return {
      id: tag.rule.tag,
      tag,
      number: idx
    }
  })
)

console.log(tags)

const saveTags = () => {
  if (!selectedTags.value) {
    emit('update:tagsSet', selectedTags.value.join(''))
    return
  }

  emit('update:tagsSet', selectedTags.value.join('; '))
  isVisible.value = false
}

const deleteTags = () => {
  const { newArray, newSelectedArray } = deleteSelected(
    tags.value,
    selectedTags.value.map((tag) => ({ id: tag, tag }))
  )

  nerConfigStore.ner_config[0].classification = newArray.map(({ tag }) => tag)
  selectedTags.value = newSelectedArray
  console.log(selectedTags.value)
}

const isTagEditRulesModalOpened = ref(false)
const editableTag = ref(undefined)

const handleEditTagButtonClick = (record) => {
  isTagEditRulesModalOpened.value = true
  editableTag.value = record
}

const tagName = ref('')

const addTag = () => {
  nerConfigStore.ner_config[0].classification.push({
    rule: {
      tag: tagName.value
    }
  })

  tagName.value = ''
}

const updateTagRules = (tag) => {
  nerConfigStore.ner_config[0].classification = nerConfigStore.ner_config[0].classification.map(
    (oldTag) => {
      if (oldTag.rule.tag !== editableTag.value.tag.rule.tag) {
        return oldTag
      }

      return tag
    }
  )
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
