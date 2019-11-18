import React from 'react'
import PropTypes from 'prop-types'

import cns from 'classnames'
import styl from './Tree.module.scss'

Tree.propTypes = {
  node: PropTypes.object.isRequired,
  context: PropTypes.object,
  nodeCreator: PropTypes.func
}

Tree.defaultProps = {
  nodeCreator: (node) => <span>{node.label}</span>
}

function Tree(props) {
  const { className, node, nodeCreator } = props

  return (
    <div className={cns(styl.rootNode, className)}>
      {createNode(node, nodeCreator)}
    </div>
  )
}

function createNode(node, nodeCreator) {
  return (
    <div className={styl.node}>
      {node.label && <div className={styl.label}>{nodeCreator(node)}</div>}
      {node.children && (
        <ul>
          {node.children.map((subNode) => (
            <li key={subNode.id}>
              {createNode(subNode, nodeCreator)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tree
