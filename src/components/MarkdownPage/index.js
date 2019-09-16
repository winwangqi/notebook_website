import React from 'react'

import Sidebar from '../Sidebar'
import TableOfContents from '../TableOfContents'

import styl from './index.module.scss'

export default function(props) {
  const { markdownRemark, tableOfContentsAST, headingIDs } = props

  return (
    <div className={styl.markdownPage}>
      <Sidebar />
      <div className={styl.content} dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      <TableOfContents tableOfContents={markdownRemark.tableOfContents} tocAST={tableOfContentsAST} />
    </div>
  )
}