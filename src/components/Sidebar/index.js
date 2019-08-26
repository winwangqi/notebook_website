import React from 'react'

import Tree from '../Tree'

import list from '../../../content/sidebar.yml'

import styl from './index.module.scss'
import { Link } from 'gatsby'

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

export default function Sidebar(props) {
  return (
    <div className={styl.sidebar}>
      <div className={styl.content}>
        <Tree
          data={treeData}
          createLeaf={node =>
            <Link to={node.context.path}>{node.label}</Link>
          }
        />
      </div>
    </div>
  )
}