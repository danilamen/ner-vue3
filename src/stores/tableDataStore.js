import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTableDataStore = defineStore('tableData', () => {
  const sourceTable = ref([
    { id: 1, field: 'code', ruleset: null },
    { id: 2, field: 'serialnumb', ruleset: null },
    { id: 3, field: 'numbsertif', ruleset: null },
    { id: 4, field: 'numbsertif_normal', ruleset: null },
    { id: 5, field: 'blankver', ruleset: null },
    { id: 6, field: 'n_state', ruleset: null },
    { id: 7, field: 'n_org', ruleset: null },
    { id: 8, field: 'n_otdel', ruleset: null },
    { id: 9, field: 'n_okp', ruleset: null },
    { id: 10, field: 'n_type', ruleset: null },
    { id: 11, field: 'n_currnumb', ruleset: null },
    { id: 12, field: 'n_char', ruleset: null },
    { id: 13, field: 'n_year', ruleset: null },
    { id: 14, field: 'date', ruleset: null },
    { id: 15, field: 'prodnm', ruleset: null },
    { id: 16, field: 'firmget', ruleset: null },
    { id: 17, field: 'firmmade', ruleset: null },
    { id: 18, field: 'orgnm', ruleset: null },
    { id: 19, field: 'sdateup', ruleset: null },
    { id: 20, field: 'nrmdoc', ruleset: null },
    { id: 21, field: 'impdoc', ruleset: null },
    { id: 22, field: 'usearea', ruleset: null },
    { id: 23, field: 'gighark', ruleset: null },
    { id: 24, field: 'condition', ruleset: null },
    { id: 25, field: 'label', ruleset: null },
    { id: 26, field: 'typeprod', ruleset: null },
    { id: 27, field: 'protocol', ruleset: null },
    { id: 28, field: 'm_control', ruleset: null },
    { id: 29, field: 'sblankver', ruleset: null },
    { id: 30, field: 'sdate', ruleset: null },
    { id: 31, field: 'scountryget', ruleset: null },
    { id: 32, field: 'scountrymade', ruleset: null },
    { id: 33, field: 'priltitle', ruleset: null },
    { id: 34, field: 'priltext', ruleset: null },
    { id: 35, field: 'enableuse', ruleset: null },
    { id: 36, field: 'datereal', ruleset: null },
    { id: 37, field: 'ienable3x', ruleset: null },
    { id: 38, field: 'prodnm_latin', ruleset: null },
    { id: 39, field: 'uinz', ruleset: null },
    { id: 40, field: 'g1', ruleset: null },
    { id: 41, field: 'firmget_type', ruleset: null },
    { id: 42, field: 'firmget_inn', ruleset: null },
    { id: 43, field: 'firmget_ogrn', ruleset: null },
    { id: 44, field: 'firmget_ua', ruleset: null },
    { id: 45, field: 'trial911', ruleset: null }
  ])

  const parsedRow = ref([
    {
      id: '1',
      field1: 'Green Apples',
      field2: 'Document #1212.2',
      checked_by: '',
      checked_date: ''
    },
    {
      id: '1',
      field1: '[COLOR]Green[/COLOR] [FRUITS]Apples[/FRUITS]',
      field2: '[HASDOC]Doc[/HASDOC]ument #[DOCID]1212.2[/DOCID]',
      checked_by: '',
      checked_date: ''
    },
    25
  ])

  return { parsedRow, sourceTable }
})
