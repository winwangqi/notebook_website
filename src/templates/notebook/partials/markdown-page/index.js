import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import TableOfContents from './components/table-of-contents'

import cns from 'classnames'
import './index.scss'
import styl from './index.module.scss'

export default function(props) {
  const { mdx } = props

  return (
    <main className={styl.markdownPage}>
      <div className={styl.wrapper}>
        <div className={cns('markdown', styl.markdownWrapper)}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>

        <TableOfContents className={styl.toc} tableOfContents={mdx.tableOfContents.items} />
      </div>
    </main>
  )
}
