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
              filePath
            }
            body
            mdxAST
            rawBody
            tableOfContents(
              maxDepth: 3
            )
            parent {
              ... on File {
                modifiedTime(formatString: "YYYY-MM-DD HH:mm")
              }
            }
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
          rawBody: getValueListFromMDXAst(node.mdxAST).join(' '),
        }
      })
    },
  })
}

function getValueListFromMDXAst(mdxAST) {
  const list = []

  function visit(AST) {
    if (AST.type !== 'export' && AST.value) {
      list.push(AST.value)
    }
    if (AST.children) {
      AST.children.forEach(visit)
    }
  }

  visit(mdxAST)

  return list
}

