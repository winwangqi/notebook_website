import React, { useCallback } from 'react'
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
  activeClassName: PropTypes.string,
}

Tree.defaultProps = {
  nodeCreator: (node) => <span>{node.label}</span>,
  enableScrollIntoView: false
}

function Tree(props) {
  const { className, treeClassName } = props

  return (
    <div className={cns(treeClassName, className)}>
      <Node{...props} />
    </div>
  )
}

function Node(props) {
  const { node, nodeCreator, activeID, nodeClassName, activeClassName, enableScrollIntoView } = props
  const active = node.id === activeID

  const itemRef = useCallback(
    (node) => {
      if (node && active && enableScrollIntoView) {
        // this noop for whatever reason gives time for React to know what
        // ref is attached to the node to scroll to it, removing this line
        // will only scroll to the correct location on a full page refresh,
        // instead of navigating between pages with the prev/next buttons
        // or clicking on linking guides or urls
        // line: 34 https://github.com/gatsbyjs/gatsby/blob/master/www/src/components/sidebar/item.js
        // await function () {}
        node.scrollIntoView({ block: 'center' })
      }
    },
    [active],
  )

  return (
    <div
      className={cns(nodeClassName, { active, [activeClassName]: active })}
      ref={itemRef}
    >
      {node.label && <div className={styl.label}>{nodeCreator(node)}</div>}
      {node.children && (
        <ul>
          {node.children.map((subNode) => (
            <li key={subNode.id}>
              <Node
                {
                  ...{
                    ...props,
                    node: subNode
                  }
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tree
