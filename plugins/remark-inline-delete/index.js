const pluginCreator = require('../lib/remark-extend-inline-syntax-plugin-creator')

module.exports = pluginCreator({
  defaultNodeType: 'inlineDelete',
  defaultMarker: '~~',
  defaultClassNames: ['inline-delete'],
  defaultTagType: 'del',
  inlineMethodName: 'inlineDelete'
})
