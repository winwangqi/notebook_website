import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'

import menuList from '@/../content/sidebar.yml'

import Tree from '@/components/tree'
import Header from './components/header'
import ExpandButton from './components/expand-button'

import { createTree, findActiveID, flattenTree, updateTreeDataCollapse, filterTree } from './utils/tree'
import { initSearch } from '@/utils/js-search'

import cns from 'classnames'
import * as styl from './index.module.scss'

export const initialTreeData = createTree(menuList)

export default function Sidebar({ location }) {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false)
  const [activeID, setActiveID] = useState(findActiveID(initialTreeData, location))
  const [treeData, setTreeData] = useState(initTreeData)
  const [searchEngine] = useState(() => initSearch('id', ['label'], flattenTree(initialTreeData, true)))
  const [searched, setSearched] = useState(false)
  const [searchedTreeData, setSearchedTreeData] = useState(null)
  const activeNode = useRef()

  useEffect(() => {
    setActiveID(findActiveID(treeData, location))
  }, [location])

  function initTreeData() {
    return updateTreeDataCollapse({
      treeData: initialTreeData,
      id: activeID,
      collapse: false,
      chain: true,
    })
  }

  function handleToggleSideBar() {
    setSideBarIsOpen(!sideBarIsOpen)
  }

  function handleToggleDefaultTreeNodeCollapse(node) {
    setTreeData(updateTreeDataCollapse({
      treeData,
      id: node.id,
      toggle: true,
      chain: false,
    }))
  }

  function handleToggleSearchedTreeNodeCollapse(node) {
    setSearchedTreeData(updateTreeDataCollapse({
      treeData: searchedTreeData,
      id: node.id,
      toggle: true,
      chain: false,
    }))
  }

  function handleToggleExpand(expand) {
    setTreeData(updateTreeDataCollapse({
      treeData,
      id: 'all',
      collapse: !expand,
    }))
  }

  function handleLocateCurrent() {
    activeNode.current && activeNode.current.scrollIntoView({ block: 'center' })
    setTreeData(updateTreeDataCollapse({
      treeData: initTreeData(),
      id: activeID,
      collapse: false,
      chain: true,
    }))
  }

  function handleSearchInputChange(value) {
    if (!value) {
      setSearched(false)
      return
    }

    const filterIDList = searchEngine.search(value).map(v => v.id)
    setSearched(true)
    setSearchedTreeData(updateTreeDataCollapse({
      treeData: filterTree(initialTreeData, filterIDList),
      id: 'all',
      collapse: false,
    }))
  }

  function handleSearchStatusChange(value) {
    if (!value) {
      setSearched(false)
    }
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
          <Header
            onToggleExpand={handleToggleExpand}
            onLocateCurrent={handleLocateCurrent}
            onSearchInputChange={handleSearchInputChange}
            onSearchStatusChange={handleSearchStatusChange}
          />

          {searched
            ? (
              searchedTreeData && searchedTreeData.children.length > 0
                ? (
                  <SidebarTree
                    key={0}
                    activeID={activeID}
                    treeData={searchedTreeData}
                    onToggleNodeCollapse={handleToggleSearchedTreeNodeCollapse}
                  />
                ) : (
                  <div className={styl.noSearchResult}>无搜索结果</div>
                )
            ) : (
              <SidebarTree
                key={1}
                activeID={activeID}
                treeData={treeData}
                onToggleNodeCollapse={handleToggleDefaultTreeNodeCollapse}
                onGetActiveNode={handleGetActiveNode}
              />
            )}
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
        <ExpandButton collapse={sideBarIsOpen} typeClose/>
      </div>
    </>
  )
}

SidebarTree.defaultProps = {
  onToggleNodeCollapse: Function.prototype,
  onGetActiveNode: Function.prototype,
}

function SidebarTree(props) {
  const { activeID, treeData, onToggleNodeCollapse, onGetActiveNode } = props

  return (
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
      onToggleNodeCollapse={onToggleNodeCollapse}
      onGetActiveNode={onGetActiveNode}
    />
  )
}
