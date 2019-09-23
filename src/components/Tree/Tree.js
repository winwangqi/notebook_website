import React from 'react'
import PropTypes from 'prop-types'

import cns from 'classnames'

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

function createNode({ node, createBranchNode, createLeaf }) {
  if (Array.isArray(node)) {
    return node.map(item => createNode({ node: item, createBranchNode, createLeaf }))
  }

  if (node instanceof Object) {
    if (node.type === 'branchNode') {
      return (
        <ul key={node.label} className={styl.branch}>
          <div className={styl.label}>{createBranchNode ? createBranchNode(node) : node.label}</div>
          {node.isOpen && <ul className={styl.branch}>{createNode({ node: node.items, createBranchNode, createLeaf })}</ul>}
        </ul>
      )
    }

    if (node.type === 'leaf') {
      return <li key={node.label} className={styl.leaf}>{createLeaf ? createLeaf(node) : node.label}</li>
    }
  }

  return null
}

Tree.propTypes = {
  createLeaf: PropTypes.func,
}

function Tree(props) {
  console.log(props.data, 'sssss')
  return (
    <div className={cns(styl.rootNode, props.className)}>
      {createNode({
        node: props.data,
        createBranchNode: props.createBranchNode,
        createLeaf: props.createLeaf
      })}
    </div>
  )
}

export default Tree
