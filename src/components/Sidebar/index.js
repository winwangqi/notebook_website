import React from 'react'
import { Link } from 'gatsby'

import Tree from '../Tree'

import list from '../../../content/sidebar.yml'

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
  return (
    <div className={cns('theme-background', 'hidden-xs', 'hidden-sm', styl.sidebar)}>
      <div className={styl.content}>
        <Tree
          data={treeData}
          createLeaf={node => <Link className="theme-color" to={node.context.path}>{node.label}</Link>}
        />
      </div>
    </div>
  )
}
