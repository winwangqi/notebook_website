import React from 'react'
import PropTypes from 'prop-types'

import cns from 'classnames'
import styl from './Tree.module.scss'

Tree.propTypes = {
  node: PropTypes.object.isRequired,
  context: PropTypes.object,
  activeID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nodeCreator: PropTypes.func,
  treeClassName: PropTypes.string,
  nodeClassName: PropTypes.string,
}

Tree.defaultProps = {
  nodeCreator: (node) => <span>{node.label}</span>
}

function Tree(props) {
  const { className, treeClassName, nodeClassName, node, nodeCreator, activeID } = props

  return (
    <div className={cns(treeClassName, className)}>
      {createNode({ node, nodeCreator, activeID, nodeClassName })}
    </div>
  )
}

function createNode({ node, nodeCreator, activeID, nodeClassName }) {
  return (
    <div className={cns(nodeClassName, { active: node.id === activeID })}>
      {node.label && <div className={styl.label}>{nodeCreator(node)}</div>}
      {node.children && (
        <ul>
          {node.children.map((subNode) => (
            <li key={subNode.id}>
              {createNode({ node: subNode, nodeCreator, activeID, nodeClassName })}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tree
