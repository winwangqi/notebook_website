const pluginCreator = require('../lib/remark-extend-inline-syntax-plugin-creator')

module.exports = pluginCreator({
  defaultNodeType: 'inlineHighlight',
  defaultMarker: '!!',
  defaultClassNames: ['inline-highlight'],
  defaultTagType: 'strong',
  inlineMethodName: 'inlineHighlight'
})
