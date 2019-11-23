import React from 'react'

import Sidebar from './components/Sidebar'
import TableOfContents from './components/TableOfContents'
import Theme from '../../components/theme'

import cns from 'classnames'
import './index.scss'
import styl from './index.module.scss'

export default function(props) {
  const { title, markdownRemark, tableOfContentsAST, /* headingIDs */ } = props

  const noTOC = tableOfContentsAST.length === 0

  return (
    <Theme>
      <div className={styl.markdownPage}>
        <Sidebar />

        <div className={cns('markdown', styl.main, { [styl.noTOC]: noTOC })}>
          <div className={styl.wrapper}>
            <div className={cns('title', styl.title)}>{title}</div>
            <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
          </div>
        </div>

        {!noTOC && <TableOfContents tableOfContentsAST={tableOfContentsAST} />}
      </div>
    </Theme>
  )
}
