import React from 'react'

import Sidebar from '../Sidebar'
import TableOfContents from '../TableOfContents'
import Theme from '../../components/theme'

import cns from 'classnames'
import './index.scss'
import styl from './index.module.scss'

export default function(props) {
  const { markdownRemark, tableOfContentsAST, /* headingIDs */ } = props

  return (
    <Theme>
      <div className={styl.markdownPage}>
        <Sidebar />
        <div className={cns('markdown', styl.content)} dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        <TableOfContents tableOfContentsAST={tableOfContentsAST} />
      </div>
    </Theme>
  )
}
