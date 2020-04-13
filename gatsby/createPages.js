const path = require(`path`)

const headingTagNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

module.exports = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMdx(
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            body
            tableOfContents(
              maxDepth: 3
            )
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    const pathSegments = node.fields.slug.split('/')

    createPage({
      path: node.fields.slug,
      component: path.resolve(`src/templates/notebook/index.js`),
      // additional data can be passed via context
      context: {
        title: pathSegments[pathSegments.length - 2],
      },
    })
  })
}
