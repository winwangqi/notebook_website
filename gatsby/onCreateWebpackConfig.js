const {resolve} = require('path')
const webpack = require('webpack')

module.exports = ({ getConfig, stage, actions }) => {
  const config = getConfig()

  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }

  actions.setWebpackConfig({
    resolve: {
      modules: [
        resolve(__dirname, '../src'),
        resolve(__dirname, '../node_modules'),
      ],
      alias: {
        '@': resolve(__dirname, '../src'),
      },
    },
    // See https://github.com/FormidableLabs/react-live/issues/5
    // plugins: [new webpack.IgnorePlugin(/^(xor|props)$/)],
  })
}
