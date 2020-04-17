import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Tree from '@/components/Tree'

import throttle from 'lodash/throttle'

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

  const [treeData, setTreeData] = useState(null)
  const [activeID, setActiveID] = useState('')
  const [itemTopOffsets, setItemTopOffsets] = useState([])

  useEffect(() => {
    setTreeData({
      id: -1,
      children: createTreeData(tableOfContents)
    })

    calculateItemTopOffsets()
  }, [])

  useEffect(() => {
    setTreeData({
      id: -1,
      children: createTreeData(tableOfContents)
    })

    calculateItemTopOffsets()
  }, [tableOfContents])

  useEffect(() => {
    handleScroll()
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [itemTopOffsets])

  function calculateItemTopOffsets() {
    const itemIDs = getItemIDs(tableOfContents)
    setItemTopOffsets(getElementTopOffsetsByID(itemIDs))
  }

  function handleResize() {
    calculateItemTopOffsets()
    handleScroll()
  }

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
            nodeCreator={node => <a href={node.context.path} title={node.label} className={styl.label}>{node.label}</a>}
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

function getItemIDs(tableOfContents) {
  const IDs = []

  ;(function getItems(list) {
    list.forEach(item => {
      IDs.push(item.url.slice(1))
      if (item.items) {
        getItems(item.items)
      }
    })
  })(tableOfContents)

  return IDs
}

function getElementTopOffsetsByID(itemIDs) {
  return itemIDs
    .map(id => {
      const element = document.getElementById(id)
      if (!element) {
        return null
      }
      return {
        id,
        offsetTop: element.offsetTop,
      }
    })
    .filter(item => item)
}
