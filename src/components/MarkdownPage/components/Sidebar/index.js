import React, { useState } from 'react'
import { Link } from 'gatsby'

import Tree from '../../../Tree'

import list from '../../../../../content/sidebar.yml'

import cns from 'classnames'
import styl from './index.module.scss'

const treeData = (function createTreeData(list, relativePath = '/') {
  return list.map(item => {
    if (typeof item === 'string') {
      return {
        type: 'leaf',
        label: item,
        context: {
          path: relativePath + item,
        },
      }
    } else if (item instanceof Object) {
      const keys = Object.keys(item)
      return keys.map(key => {
        const value = item[key]
        return {
          type: 'branchNode',
          label: key,
          isOpen: true,
          items: createTreeData(value, `${relativePath + key}/`)
        }
      })
    }
    return null
  })
})(list)

export default function Sidebar() {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false)

  function handleToggleSideBar() {
    setSideBarIsOpen(!sideBarIsOpen)
  }

  return (
    <>
      <nav
        className={cns(
          'theme-background',
          'hidden-xs',
          'hidden-sm',
          styl.sidebar,
          { [styl.open]: sideBarIsOpen }
        )}
      >
        <div className={styl.content}>
          <Tree
            data={treeData}
            createLeaf={node => <Link to={node.context.path} title={node.label}>{node.label}</Link>}
          />
        </div>
      </nav>

      <div
        className={cns(
          'hidden-lg',
          { 'theme-color': sideBarIsOpen },
          styl.toggleButton
        )}
        onClick={handleToggleSideBar}
      >
        <i className="fa fa-align-right" />
      </div>
    </>
  )
}
