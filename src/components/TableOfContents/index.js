import React from 'react'

import Tree from '../Tree'

import styl from './index.module.scss'
import { Link } from 'gatsby'

export default function(props) {
  const { tableOfContents, tocAST } = props

  return (
    <div className={styl.tableOfContents}>
      {/*<div className={styl.content} dangerouslySetInnerHTML={{ __html: tableOfContents }} />*/}
      <Tree
        className={styl.content}
        data={createTreeData(tocAST)}
        createBranchNode={node => <Link to={node.context.path}>{node.context.path + '||' + node.label}</Link>}
        createLeaf={node => <Link to={node.context.path}>{node.context.path + '||' + node.label}</Link>}
      />
    </div>
  )
}

function createTreeData(tocAST) {
  return tocAST.map(item => {
    if (!item.children) {
      return {
        type: 'leaf',
        label: item.id,
        context: {
          path: `#${item.id}`,
        },
      }
    } else {
      return {
        type: 'branchNode',
        label: item.id ? item.id : '',
        isOpen: true,
        items: createTreeData(item.children),
        context: {
          path: `#${item.id}`,
        },
      }
    }
  })
}