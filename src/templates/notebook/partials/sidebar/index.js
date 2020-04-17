import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'

import menuList from '@/../content/sidebar.yml'

import Tree from '@/components/Tree'
import TreeButtonGroup from './components/tree-button-group'
import ExpandButton from './components/expand-button'

import cloneDeep from 'lodash/cloneDeep'

import cns from 'classnames'
import styl from './index.module.scss'

const initialTreeData = createTree(menuList)

export default function Sidebar({ location }) {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false)
  const [activeID, setActiveID] = useState(findActiveID(initialTreeData, location))
  const [treeData, setTreeData] = useState(
    updateTreeDataCollapse({
      treeData: initialTreeData,
      id: activeID,
      collapse: false,
      chain: true
    })
  )
  const activeNode = useRef()


  useEffect(() => {
    setActiveID(findActiveID(treeData, location))
  }, [location])

  function handleToggleSideBar() {
    setSideBarIsOpen(!sideBarIsOpen)
  }

  function handleToggleNodeCollapse(node) {
    setTreeData(updateTreeDataCollapse({
      treeData,
      id: node.id,
      toggle: true,
      chain: false,
    }))
  }

  function handleToggleExpand(expand) {
    setTreeData(updateTreeDataCollapse({
      treeData,
      id: 'all',
      collapse: !expand
    }))
  }

  function handleLocateCurrent() {
    activeNode.current && activeNode.current.scrollIntoView({ block: 'center' })
    setTreeData(updateTreeDataCollapse({
      treeData,
      id: activeID,
      collapse: false,
      chain: true,
    }))
  }

  function handleGetActiveNode(node) {
    activeNode.current = node
  }

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
        <div className={styl.content}>
          <TreeButtonGroup
            onToggleExpand={handleToggleExpand}
            onLocateCurrent={handleLocateCurrent}
          />

          <Tree
            className={styl.menuTree}
            treeClassName="theme-tree"
            nodeClassName="theme-tree-node"
            labelClassName={cns('theme-tree-label', styl.treeLabel)}
            enableScrollIntoView
            enableCollapse
            activeID={activeID}
            node={treeData}
            nodeCreator={
              node => node.context
                ? <Link to={node.context.path} title={node.label} className={styl.label}>{node.label}</Link>
                : <span title={node.label} className={styl.label}>{node.label}</span>
            }
            onToggleNodeCollapse={handleToggleNodeCollapse}
            onGetActiveNode={handleGetActiveNode}
          />
        </div>
      </aside>

      <div
        className={cns(
          'hidden-lg',
          { 'theme-color': sideBarIsOpen },
          styl.toggleButton,
        )}
        onClick={handleToggleSideBar}
      >
        <ExpandButton collapse={sideBarIsOpen} typeClose />
      </div>
    </>
  )
}

function createTree(list) {
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

function updateTreeDataCollapse(options) {
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

function findActiveID(tree, location) {
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

function findTreeNode(treeData, id) {
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
