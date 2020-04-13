import React from 'react'
import PropTypes from 'prop-types'

import Tree from '@/components/Tree'

import cns from 'classnames'
import styl from './index.module.scss'

Index.propTypes = {
  tableOfContents: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.array,
  })),
}

Index.defaultProps = {
  tableOfContents: [],
}

export default function Index(props) {
  const { className, tableOfContents } = props

  if (tableOfContents.length === 0) return null

  const treeDate = {
    id: -1,
    children: createTreeData(tableOfContents)
  }

  return (
    <div className={cns('hidden-xs', 'hidden-sm', styl.tableOfContents, className)}>
      <div className={styl.wrapper}>
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
      id: item.url,
      label: item.title,
      context: {
        path: item.url,
      }
    }

    if (!item.items && index !== 0) {
      return node
    }

    return {
      ...node,
      children: createTreeData(item.items)
    }
  })
}
