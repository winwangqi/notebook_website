export const MESSAGE_TYPE = {
  INIT: 'INIT',
  SEARCH: 'SEARCH',
}

export const getInitSearchEngineAction = (data) => getAction(MESSAGE_TYPE.INIT, data)
export const getSearchAction = (keyword) => getAction(MESSAGE_TYPE.SEARCH, keyword)

function getAction(type, payload) {
  return { type, payload }
}
