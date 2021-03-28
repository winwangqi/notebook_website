import React, { useEffect, useRef, useState } from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import TableOfContents from './components/table-of-contents'

import { throttle } from 'lodash'

import cns from 'classnames'
import './index.scss'
import * as styl from './index.module.scss'
import './plugins/remark-container/classic.scss'
import Theme from '@/components/theme'

export default function(props) {
  const { mdx } = props

  const [itemTopOffsets, setItemTopOffsets] = useState([])

  const markdownWrapperRef = useRef(null)

  useEffect(() => {
    const observer = new MutationObserver(calculateItemTopOffsets)
    observer.observe(
      markdownWrapperRef.current,
      { attributes: true, childList: true, subtree: true },
    )
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    calculateItemTopOffsets()
  }, [mdx.tableOfContents])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [itemTopOffsets])

  function calculateItemTopOffsets() {
    setItemTopOffsets(
      getElementTopOffsetsByID(
        getItemIDs(mdx.tableOfContents.items),
      ),
    )
  }

  const handleResize = throttle(function handleResize() {
    calculateItemTopOffsets()
  }, 16)

  return (
    <div className={styl.markdownPage}>
      <main className={styl.wrapper}>
        <div
          className={cns('markdown', styl.markdownWrapper)}
          ref={markdownWrapperRef}
        >
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>

        <TableOfContents
          className={styl.toc}
          itemTopOffsets={itemTopOffsets}
          tableOfContents={mdx.tableOfContents.items}
        />
      </main>

      <div className={styl.bottomActionSection}>
        <div className={styl.line}>
          <div className={styl.section}>
            <a
              className={cns(styl.editThisPage, styl.item)}
              target="_blank"
              href={`${process.env.GATSBY_CONTENT_REPOSITORY}/tree/master${mdx.fields.filePath}`}
            >编辑此页</a>
          </div>
        </div>
      </div>

      <footer className={styl.footer}>
        <p>w@ngq! All rights reserved. @{new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

function getItemIDs(tableOfContents = []) {
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

      if (!element) return null

      return {
        id,
        offsetTop: element.offsetTop,
      }
    })
    .filter(Boolean)
}
