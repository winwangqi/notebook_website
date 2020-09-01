const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

module.exports = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  switch (node.internal.type) {
    case 'Mdx':
      // filed: slug
      const relativeFilePath = createFilePath({
        node,
        getNode,
        basePath: path.resolve(__dirname, '../content'),
      })

      createNodeField({
        node,
        name: "slug",
        value: relativeFilePath,
      })

      // filed: filePath
      const contentPath = path.resolve(__dirname, '../content')
      createNodeField({
        node,
        name: "filePath",
        value: node.fileAbsolutePath.slice(contentPath.length),
      })
  }
}
