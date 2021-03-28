import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import AnimateHeight from 'react-animate-height'

import cns from 'classnames'
import * as styl from './Tree.module.scss'

Tree.propTypes = {
  node: PropTypes.object.isRequired,
  context: PropTypes.object,
  activeID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nodeCreator: PropTypes.func,
  enableScrollIntoView: PropTypes.bool,
  enableNativeScrollIntoView: PropTypes.bool,
  enableCollapse: PropTypes.bool,
  treeClassName: PropTypes.string,
  nodeClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  onToggleNodeCollapse: PropTypes.func,
  onGetActiveNode: PropTypes.func,
}

Tree.defaultProps = {
  activeClassName: ''
}

Tree.defaultProps = {
  nodeCreator: (node) => <span>{node.label}</span>,
  enableScrollIntoView: false,
  enableNativeScrollIntoView: true,
  enableCollapse: false,
  treeClassName: '',
  nodeClassName: '',
  labelClassName: '',
  onToggleNodeCollapse: Function.prototype,
  onGetActiveNode: Function.prototype,
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
  const {
    node, nodeCreator, activeID, nodeClassName, labelClassName, activeClassName,
    enableScrollIntoView, enableNativeScrollIntoView, enableCollapse,
    onToggleNodeCollapse,
    onGetActiveNode
  } = props
  const active = node.id === activeID

  const collapsible = enableCollapse && node.children

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
        onGetActiveNode(node)
        if (enableNativeScrollIntoView) node.scrollIntoView({ block: 'center' })
      }
    },
    [active],
  )

  function handleExpand(e) {
    e.stopPropagation()
    collapsible && onToggleNodeCollapse(node)
  }

  const child = node.children && (
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
  )

  return (
    <div
      className={cns(nodeClassName, { active, [activeClassName]: active })}
      ref={itemRef}
    >
      {node.label && (
        <div
          className={cns(styl.label, { [styl.open]: !node.collapse }, labelClassName)}
          onClick={handleExpand}
        >
          {nodeCreator(node)}
          {collapsible && (
            <i className={cns('iconfont icon-arrow-right theme-tree-label-arrow', styl.arrow)} />
          )}
        </div>
      )}
      {node.children && (
        node.type === 'root' || !enableCollapse
          ? child
          : (
            <AnimateHeight
              height={node.collapse ? 0 : 'auto'}
              easing="ease-out"
              animateOpacity
            >
              {child}
            </AnimateHeight>
          )
      )}
    </div>
  )
}

export default Tree
