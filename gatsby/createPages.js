const path = require(`path`)

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
            rawBody
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

  /**
   * search
   */
  createPage({
    path: '/search',
    component: path.resolve(`src/templates/client-search/index.js`),
    context: {
      allPageData: result.data.allMdx.edges.map(({ node }) => {
        return {
          path: node.fields.slug,
          rawBody: node.rawBody,
        }
      })
    },
  })
}
