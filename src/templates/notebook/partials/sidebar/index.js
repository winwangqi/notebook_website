import React, { useState } from 'react'
import { Link } from 'gatsby'

import Tree from '@/components/Tree'

import list from '../../../../../content/sidebar.yml'

import cns from 'classnames'
import styl from './index.module.scss'

export default function Sidebar({ location }) {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false)

  const treeData = {
    id: NaN,
    children: createTree(list),
  }

  function handleToggleSideBar() {
    setSideBarIsOpen(!sideBarIsOpen)
  }

  const paths = location.pathname.split('/')
    .filter(Boolean)
    .map((item) => decodeURIComponent(item))

  return (
    <>
      <aside
        className={cns(
          'sidebar',
          'hidden-xs',
          'hidden-sm',
          styl.sidebar,
          { [styl.open]: sideBarIsOpen },
        )}
      >
        <Tree
          className={styl.content}
          treeClassName="theme-tree"
          nodeClassName="theme-tree-node"
          enableScrollIntoView
          activeID={findActiveID(treeData, paths)}
          node={treeData}
          nodeCreator={
            node => node.context
              ? <Link to={node.context.path} title={node.label} className={styl.label}>{node.label}</Link>
              : <span title={node.label} className={cns(styl.label, styl.plainText)}>{node.label}</span>
          }
        />
      </aside>

      <div
        className={cns(
          'hidden-lg',
          { 'theme-color': sideBarIsOpen },
          styl.toggleButton,
        )}
        onClick={handleToggleSideBar}
      >
        <i className="fa fa-align-right"/>
      </div>
    </>
  )
}

function createTree(list, idPrefix = '', relativePath = '/') {
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
      children: createTree(value, id, buildPath(label)),
    }
  })
}

function findActiveID(tree, paths, pathIndex = 0) {
  const path = paths[pathIndex]

  for (let i = 0; i < tree.children.length; i++) {
    const child = tree.children[i]
    if (child.label === path) {
      if (child.children) {
        return findActiveID(child, paths, pathIndex + 1)
      }

      return child.id
    }
  }

  return NaN
}
