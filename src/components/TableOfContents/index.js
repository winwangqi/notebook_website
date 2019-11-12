import React from 'react'

import Tree from '../Tree'

import cns from 'classnames'
import styl from './index.module.scss'

export default function(props) {
  const { tableOfContentsAST } = props

  if (tableOfContentsAST.length === 0) return null

  return (
    <div className={cns('hidden-xs', 'hidden-sm', styl.tableOfContents)}>
      <div className={styl.wrapper}>
        {/*<div className={styl.content} dangerouslySetInnerHTML={{ __html: tableOfContents }} />*/}
        <Tree
          className={styl.content}
          data={createTreeData(tableOfContentsAST)}
          createBranchNode={node => <a className="theme-color" href={node.context.path}>{node.label}</a>}
          createLeaf={node => <a className="theme-color" href={node.context.path}>{node.label}</a>}
        />
      </div>
    </div>
  )
}

function createTreeData(tableOfContentsAST) {
  return tableOfContentsAST.map((item, index) => {
    if (!item.children && index !== 0) {
      return {
        type: 'leaf',
        label: item.value,
        context: {
          path: `#${item.id}`,
        },
      }
    } else {
      return {
        type: 'branchNode',
        label: item.value ? item.value : '',
        isOpen: true,
        items: createTreeData(item.children || []),
        context: {
          path: `#${item.id}`,
        },
      }
    }
  })
}
