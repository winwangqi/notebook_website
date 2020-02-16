import React from 'react'

import Tree from '../../../Tree'

import cns from 'classnames'
import styl from './index.module.scss'

export default function(props) {
  const { tableOfContentsAST } = props

  const treeDate = {
    id: -1,
    children: createTreeData(tableOfContentsAST)
  }

  return (
    <div className={cns('hidden-xs', 'hidden-sm', styl.tableOfContents)}>
      <div className={styl.wrapper}>
        {/*<div className={styl.content} dangerouslySetInnerHTML={{ __html: tableOfContents }} />*/}
        <Tree
          className={styl.content}
          node={treeDate}
          nodeCreator={node => <a href={node.context.path} title={node.label} className={styl.label}>{node.label}</a>}
        />
      </div>
    </div>
  )
}

function createTreeData(list = []) {
  return list.map((item, index) => {
    const node = {
      id: item.value,
      label: item.value,
      context: {
        path: `#${item.value}`,
      }
    }

    if (!item.children && index !== 0) {
      return node
    }

    return {
      ...node,
      children: createTreeData(item.children)
    }
  })
}
