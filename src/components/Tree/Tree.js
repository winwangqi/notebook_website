import React from 'react'
import PropTypes from 'prop-types'

import styl from './Tree.module.scss'

/*
[
  {
    type: 'branchNode',
    label: 'label'
    isOpen: false,
    items: [
      {
        type: 'leaf',
        label: 'item1',
      }
    ]
  }
]
 */

function createNode(node, createLeaf) {
  if (Array.isArray(node)) {
    return node.map(item => createNode(item, createLeaf))
  }

  if (node instanceof Object) {
    if (node.type === 'branchNode') {
      return (
        <div key={node.label} className={styl.branch}>
          <div className={styl.label}>{node.label}</div>
          {node.isOpen && <div className={styl.branch}>{createNode(node.items, createLeaf)}</div>}
        </div>
      )
    }

    if (node.type === 'leaf') {
      return <div key={node.label} className={styl.leaf}>{createLeaf ? createLeaf(node) : node.label}</div>
    }
  }

  return null
}

Tree.propTypes = {
  createLeaf: PropTypes.func,
}

function Tree(props) {
  return (
    <div className={styl.rootNode}>
      {createNode(props.data, props.createLeaf)}
    </div>
  )
}

export default Tree