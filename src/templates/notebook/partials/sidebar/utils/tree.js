import { cloneDeep } from 'lodash'

export function createTree(list) {
  function createChildren(list, idPrefix = '', relativePath = '/') {
    const buildPath = label => relativePath + label + '/'

    return list.map((item, index) => {
      const id = [idPrefix, String(index)].filter(Boolean).join('-')

      if (typeof item === 'string') {
        return {
          id,
          label: item,
          context: {
            path: buildPath(item),
          },
        }
      }

      const [label, value] = Object.entries(item)[0]
      return {
        id,
        label,
        collapse: true,
        children: createChildren(value, id, buildPath(label)),
      }
    })
  }

  return {
    id: 'root',
    type: 'root',
    children: createChildren(list),
  }
}

export function findActiveID(tree, location) {
  const paths = location.pathname.split('/')
    .filter(Boolean)
    .map((item) => decodeURIComponent(item))

  function find(tree, paths, pathIndex = 0) {
    const path = paths[pathIndex]

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i]
      if (child.label === path) {
        if (child.children) {
          return find(child, paths, pathIndex + 1)
        }

        return child.id
      }
    }

    return ''
  }

  return find(tree, paths)
}

export function updateTreeDataCollapse(options) {
  const { treeData, id = '', collapse = true, toggle = false, chain = false } = options

  const tree = cloneDeep(treeData)

  function visit(treeData) {
    if (treeData.children) {
      if (treeData.type !== 'root') {
        if (id === 'all') {
          treeData.collapse = collapse
        } else if (chain ? id.startsWith(treeData.id) : id === treeData.id) {
          treeData.collapse = toggle ? !treeData.collapse : collapse
        }
      }
      treeData.children = treeData.children.map(item => visit(item))
    }

    return treeData
  }

  return visit(tree)
}

export function findTreeNode(treeData, id) {
  function find(treeData) {
    if (treeData.id === id) {
      return treeData
    }
    if (treeData.children) {
      for (let i = 0; i < treeData.children.length; i++) {
        const node = find(treeData.children[i])
        if (node) return node
      }
    }
  }

  return find(treeData)
}

export function flattenTree(tree, chain = false) {
  let list = []

  function flatten(tree, chainedLabel = '') {
    if (tree.type !== 'root') {
      list.push({
        id: tree.id,
        label: chain ? chainedLabel : tree.label,
      })
    }

    if (tree.children) {
      tree.children.forEach(subTree => flatten(subTree, `${chainedLabel}/${subTree.label}`))
    }
  }

  flatten(tree)

  return list
}

/**
 * filterTree
 * @param tree
 * @param filterIDList string[]
 */
export function filterTree(tree, filterIDList) {
  const newTree = cloneDeep(tree)

  function visit(tree, parent) {
    const wrapper = v => `${v}-`
    const currentTreeShouldInNewTree = filterIDList.some(
      id => wrapper(id).startsWith(wrapper(tree.id))
    )

    if (filterIDList.includes(tree.id)) return

    if (parent && !currentTreeShouldInNewTree) {
      parent.children = parent.children.filter(node => node.id !== tree.id)
      return
    }

    if (tree.children) {
      tree.children.forEach(subTree => visit(subTree, tree))
    }
  }
  visit(newTree, null)

  return newTree
}
