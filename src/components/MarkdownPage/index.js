import React from 'react'

import Sidebar from '../Sidebar'
import TableOfContents from '../TableOfContents'
import Theme from '../../components/theme'

import cns from 'classnames'
import './index.scss'
import styl from './index.module.scss'

export default function(props) {
  const { title, markdownRemark, tableOfContentsAST, /* headingIDs */ } = props

  document.title = title

  return (
    <Theme>
      <div className={styl.markdownPage}>
        <Sidebar />
        <div className={cns('markdown', styl.content)}>
          <div className={styl.title}>{title}</div>
          <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        </div>
        <TableOfContents tableOfContentsAST={tableOfContentsAST} />
      </div>
    </Theme>
  )
}
