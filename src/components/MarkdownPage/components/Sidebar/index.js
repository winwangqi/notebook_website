import React, { useState } from 'react'
import { Link } from 'gatsby'

import Tree from '../../../Tree'

import list from '../../../../../content/sidebar.yml'

import cns from 'classnames'
import styl from './index.module.scss'

export default function Sidebar() {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false)

  const treeData = {
    id: -1,
    children: createTree(list),
  }

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
          { [styl.open]: sideBarIsOpen },
        )}
      >
        <Tree
          className={styl.content}
          node={treeData}
          nodeCreator={
            node => node.context
              ? <Link to={node.context.path} title={node.label} className={styl.label}>{node.label}</Link>
              : <span title={node.label} className={styl.label}>{node.label}</span>
          }
        />
      </nav>

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
