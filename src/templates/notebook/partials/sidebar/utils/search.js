import { flatten } from 'lodash'
import * as JsSearch from 'js-search'

export function initSearch(documents) {
  const search = new JsSearch.Search('id')

  const originTokenize = search.tokenizer.tokenize

  search.tokenizer.tokenize = function(text) {
    return flatten(
      flatten(
        text.split('/')
          .filter(Boolean)
          .map(v => v.split(/\s+/)),
      ).map((segment) => {
        const enReg = /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/

        if (enReg.test(segment)) {
          return originTokenize(segment)
        }

        return segment.split('')
      })
    )
  }

  search.addIndex('label')

  search.addDocuments(documents)

  return search
}
