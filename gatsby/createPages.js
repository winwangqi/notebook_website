const path = require(`path`)

module.exports = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            html
            htmlAst
            tableOfContents(
              pathToSlugField: "fields.slug"
              heading: null
              maxDepth: 4
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

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`src/templates/notebook.js`),
      // additional data can be passed via context
      context: {
        tableOfContentsAST: getTableOfContentsAstFromHTMLAST(node.htmlAst),
        headingIDs: getHeadingIDs(node.htmlAst),
      },
    })
  })
}

function getTableOfContentsAstFromHTMLAST(htmlAst) {
  function getNewNode(depth, id) {
    const root = {
      depth: 1,
    }

    let parent = root
    let last = root

    if (depth > 1) {
      for (let i = 2; i <= depth; i++) {
        let node = {
          depth: i
        }

        if (i === depth) {
          node.id = id
        }

        if (!parent.children) parent.children = []
        parent.children.push(node)
        parent = node
        last = node
      }
    } else {
      root.id = id
    }

    return { root, last, parent }
  }

  function getAfterNode(start, end, id, lastNodeObj) {
    let last = lastNodeObj.last
    let parent = lastNodeObj.parent
    for (let i = start + 1; i <= end; i++) {
      const node = {
        depth: i,
      }

      if (i === end) {
        node.id = id
      }

      if (!last.children) last.children = []
      last.children.push(node)
      parent = last
      last = node
    }
    return { root: lastNodeObj.root, last, parent }
  }

  const headingTagNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  const list = []
  let rootNode = null

  const headings = htmlAst.children.filter(node => headingTagNames.includes(node.tagName))

  headings.forEach((item, index) => {
      const depth = headingTagNames.indexOf(item.tagName) + 1

      if (index === 0) {
        rootNode = getNewNode(depth, item.properties.id)
      } else {
        const lastItem = headings[index - 1]
        const lastDepth = headingTagNames.indexOf(lastItem.tagName) + 1

        if (depth < lastDepth) {
          list.push(rootNode.root)
          rootNode = getNewNode(depth, item.properties.id)
        }

        if (depth === lastDepth) {
          if (!rootNode.parent.children) rootNode.parent.children = []
          rootNode.parent.children.push({
            id: item.properties.id,
            depth,
          })
        }

        if (depth > lastDepth) {
          rootNode = getAfterNode(lastDepth, depth, item.properties.id, rootNode)
        }
      }

      if (headings.length - 1 === index) {
        list.push(rootNode.root)
      }
    })

  return list
}

function getHeadingIDs(htmlAst) {
  const headingTagNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  return htmlAst.children.filter(node => headingTagNames.includes(node.tagName)).map(node => node.properties.id)
}
