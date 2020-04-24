import * as JsSearch from 'js-search'

export function initSearch(documents) {
  const search = new JsSearch.Search('id')

  const originTokenize = search.tokenizer.tokenize

  search.tokenizer.tokenize = function(text) {
    return text.split('/')
      .filter(Boolean)
      .map(v => v.split(/\s+/)).flat()
      .map((segment) => {
        const enReg = /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/

        if (enReg.test(segment)) {
          return originTokenize(segment)
        }

        return segment.split('')
      })
      .flat()
  }

  search.addIndex('label')

  search.addDocuments(documents)

  return search
}
