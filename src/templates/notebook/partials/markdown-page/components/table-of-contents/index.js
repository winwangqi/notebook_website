import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Tree from '@/components/tree'

import { throttle } from 'lodash'

import cns from 'classnames'
import styl from './index.module.scss'

Index.propTypes = {
  tableOfContents: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
      items: PropTypes.array,
    }),
  ),
  itemTopOffsets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      offsetTop: PropTypes.number,
    }),
  ),
}

Index.defaultProps = {
  tableOfContents: [],
  itemTopOffsets: [],
}

export default function Index(props) {
  const { className, tableOfContents, itemTopOffsets } = props

  if (tableOfContents.length === 0) return null

  const [treeData, setTreeData] = useState(() => ({
    id: -1,
    children: createTreeData(tableOfContents),
  }))
  const [activeID, setActiveID] = useState('')

  useEffect(() => {
    setTreeData({
      id: -1,
      children: createTreeData(tableOfContents),
    })
  }, [tableOfContents])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [itemTopOffsets])

  const handleScroll = throttle(function handleScroll() {
    const item = itemTopOffsets.find((itemTopOffset, i) => {
      const nextItemTopOffset = itemTopOffsets[i + 1]

      if (nextItemTopOffset) {
        return (
          window.scrollY >= itemTopOffset.offsetTop &&
          window.scrollY < nextItemTopOffset.offsetTop
        )
      }
      return window.scrollY >= itemTopOffset.offsetTop
    })

    setActiveID(item ? item.id : '')
  }, 16)

  return (
    <div className={cns('hidden-xs', 'hidden-sm', 'table-of-contents', styl.tableOfContents, className)}>
      <div className={styl.wrapper}>
        {treeData && (
          <Tree
            className={styl.content}
            activeClassName={styl.active}
            activeID={activeID}
            node={treeData}
            nodeCreator={node => (
              <a
                href={node.context.path}
                title={node.label}
                className={styl.label}
              >{node.label}</a>
            )}
          />
        )}
      </div>
    </div>
  )
}

function createTreeData(list = []) {
  return list.map((item, index) => {
    const node = {
      id: item.url.slice(1),
      label: item.title,
      context: {
        path: item.url,
      },
    }

    if (!item.items && index !== 0) {
      return node
    }

    return {
      ...node,
      children: createTreeData(item.items),
    }
  })
}
