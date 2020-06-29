import { flatten } from 'lodash'
import * as JsSearch from 'js-search'

export function initSearch(uid, indexes, documents) {
  const search = new JsSearch.Search(uid)

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

        return segment.replace(/[\x00-\x7F]/g, "").split('')
      })
    )
  }

  indexes.forEach(index => search.addIndex(index))

  search.addDocuments(documents)

  return search
}
