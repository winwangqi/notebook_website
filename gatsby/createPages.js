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
    const pathSegments = node.fields.slug.split('/')

    createPage({
      path: node.fields.slug,
      component: path.resolve(`src/templates/notebook.js`),
      // additional data can be passed via context
      context: {
        title: pathSegments[pathSegments.length - 2],
        tableOfContentsAST: getTableOfContentsAstFromHTMLAST(node.htmlAst),
        headingIDs: getHeadingIDs(node.htmlAst),
      },
    })
  })
}

function getTableOfContentsAstFromHTMLAST(htmlAst) {
  function getNode(id, value, depth) {
    return { id, value, depth }
  }

  function getNewNodeWrapper(id, value, depth) {
    const root = getNode(undefined, value, 1)

    let parent = root
    let last = root

    if (depth > 1) {
      for (let i = 2; i <= depth; i++) {
        let node = getNode(undefined, value, i)

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

  function getAfterNodeWrapper(start, end, id, value, lastNodeObj) {
    let last = lastNodeObj.last
    let parent = lastNodeObj.parent
    for (let i = start + 1; i <= end; i++) {
      const node = getNode(undefined, value, i)

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

  function getHeadingValue(children = []) {
    return children
      .map(node => {
        if (node.tagName === 'svg') {
          return false
        }

        if (node.type === 'element') {
          const value = getHeadingValue(node.children)
          return value && ` ${value} `
        }

        if (node.type === 'text') {
          return node.value.trim()
        }
      })
      .filter(Boolean)
      .reduce((acc, cur) => acc + cur, '')
      .trim()
  }

  const headingTagNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  const list = []
  let rootNodeWrapper = null
  let lastNodeWrapper = null

  const headings = htmlAst.children.filter(node => headingTagNames.includes(node.tagName))

  headings.forEach((item, index) => {
    const depth = headingTagNames.indexOf(item.tagName) + 1

    if (index === 0) {
      rootNodeWrapper = getNewNodeWrapper(item.properties.id, getHeadingValue(item.children), depth)
      lastNodeWrapper = rootNodeWrapper
    } else {
      const lastItem = headings[index - 1]
      const lastDepth = headingTagNames.indexOf(lastItem.tagName) + 1

      if (depth < lastDepth) {
        list.push(rootNodeWrapper.root)
        rootNodeWrapper = getNewNodeWrapper(item.properties.id, getHeadingValue(item.children), depth)
        lastNodeWrapper = rootNodeWrapper
      }

      if (depth === lastDepth) {
        if (!rootNodeWrapper.parent.children) rootNodeWrapper.parent.children = []
        const node = getNode(item.properties.id, getHeadingValue(item.children), depth)
        rootNodeWrapper.parent.children.push(node)
        lastNodeWrapper = {
          root: rootNodeWrapper.root,
          parent: rootNodeWrapper.parent.children,
          last: node
        }
      }

      if (depth > lastDepth) {
        rootNodeWrapper = getAfterNodeWrapper(lastDepth, depth, item.properties.id, getHeadingValue(item.children), lastNodeWrapper)
      }
    }

    if (headings.length - 1 === index) {
      list.push(rootNodeWrapper.root)
    }
  })

  return list
}

function getHeadingIDs(htmlAst) {
  const headingTagNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  return htmlAst.children.filter(node => headingTagNames.includes(node.tagName)).map(node => node.properties.id)
}
