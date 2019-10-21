const resolvableExtensions = () => [`.ts`, `.tsx`]

function onCreateWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader"
            }
          ]
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        }
      ],
    },
  })
}

exports.resolvableExtensions = resolvableExtensions
exports.onCreateWebpackConfig = onCreateWebpackConfig
