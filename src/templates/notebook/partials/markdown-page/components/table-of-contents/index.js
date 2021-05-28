import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Tree from '@/components/tree'

import { throttle } from 'lodash'

import cns from 'classnames'
import * as styl from './index.module.scss'

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
  const [isOpen, setIsOpen] = useState(false)
  const { className, tableOfContents, itemTopOffsets } = props
  const wrapperRef = useRef(null)

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

  function handleGetActiveNode(node) {
    if (wrapperRef?.current) {
      wrapperRef.current.scrollTo({
        top: node.offsetTop - wrapperRef.current.offsetHeight / 2,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  function handleToggleTableOfContents() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className={cns('table-of-contents', styl.tableOfContents, className, { [styl.open]: isOpen })}>
        <div className={styl.wrapper} ref={wrapperRef}>
          {treeData && (
            <Tree
              className={styl.content}
              activeClassName={''}
              enableScrollIntoView
              enableNativeScrollIntoView={false}
              onGetActiveNode={handleGetActiveNode}
              activeID={activeID}
              node={treeData}
              nodeCreator={node => (
                <a
                  onClick={() => setIsOpen(false)}
                  href={node.context.path}
                  title={node.label}
                  className={styl.label}
                >{node.label}</a>
              )}
            />
          )}
        </div>
      </div>

      <div className={cns('hidden-lg', styl.toggleButton)} onClick={handleToggleTableOfContents}>
        <i className="iconfont icon-category"/>
      </div>
    </>
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
