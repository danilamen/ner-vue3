import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNerConfigStore = defineStore('nerConfig', () => {
  const ner_config = ref([
    {
      classification: [
        {
          rule: {
            tag: 'COLORS',
            matchers: {
              values: [
                {
                  LOWER: {
                    REGEX: '(green|red)'
                  }
                }
              ]
            },
            excluders: {
              values: ['greens']
            }
          }
        },
        {
          rule: {
            tag: 'FRUITS',
            phrasematchers: {
              attr: ['LEMMA'],
              values: ['apple', 'grapes']
            },
            excluders: {
              values: ['Apple']
            }
          }
        },
        {
          rule: {
            tag: 'VEGETABLES',
            phrasematchers: {
              attr: ['LEMMA'],
              values: ['potatoes']
            }
          }
        },
        {
          rule: {
            tag: 'HASDOC',
            matchers: {
              values: [
                {
                  LOWER: 'doc'
                }
              ]
            }
          }
        },
        {
          rule: {
            tag: 'DOCID',
            matchers: {
              values: [
                {
                  LOWER: {
                    REGEX: '(\\d.\\d)'
                  }
                }
              ]
            }
          }
        }
      ]
    }
  ])

  return { ner_config }
})
