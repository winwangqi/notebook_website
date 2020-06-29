// In work.js, the import should be absolute path, not relative path
import { initSearch } from '@/utils/js-search'
import { MESSAGE_TYPE } from '@/templates/client-search/search.worker.actions'

let searchEngine = null

function initSearchEngine(data) {
  searchEngine = initSearch('path', ['path', 'rawBody'], data)
}

self.addEventListener('message', e => {
  switch (e.data.type) {
    case MESSAGE_TYPE.INIT:
      initSearchEngine(e.data.payload)
      break

    case MESSAGE_TYPE.SEARCH:
      self.postMessage(searchEngine.search(e.data.payload))
      break

    default:
      console.log('do nothing...')
  }
})
