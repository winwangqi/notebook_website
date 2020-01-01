import React, { useEffect, useRef } from 'react'
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
  //
  // const treeNodeElement = useRef(null)
  // const activeNodeElement = useRef(null)
  //
  // useEffect(() => {
  //   if (treeNodeElement.current && activeNodeElement.current) {
  //     treeNodeElement.current.scrollTo(
  //       0,
  //       activeNodeElement.current.getBoundingClientRect().top -
  //       (window.screen.availHeight - treeNodeElement.current.getBoundingClientRect().top) / 2
  //     )
  //   }
  // }, [])

  return (
    <div
      ref={treeNodeElement}
      className={cns(treeClassName, className)}
    >
      {createNode({ node, nodeCreator, activeID, nodeClassName, activeNodeElement })}
    </div>
  )
}

function createNode({ node, nodeCreator, activeID, nodeClassName, activeNodeElement }) {
  const active = node.id === activeID

  return (
    <div className={cns(nodeClassName, { active })} ref={active ? activeNodeElement : null}>
      {node.label && <div className={styl.label}>{nodeCreator(node)}</div>}
      {node.children && (
        <ul>
          {node.children.map((subNode) => (
            <li key={subNode.id}>
              {createNode({ node: subNode, nodeCreator, activeID, nodeClassName, activeNodeElement })}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tree
