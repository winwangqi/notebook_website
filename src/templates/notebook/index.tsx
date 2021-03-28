import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'

import SEO from '@/components/seo'
import Video from '@/components/mdx/video'
import CodeBlock from '@/components/mdx/code-block'
import Theme from '@/components/theme'
import Sidebar from './partials/sidebar'
import MarkdownPage from './partials/markdown-page'

import * as styl from './index.module.scss'
import cns from 'classnames'

export default function Index({ location, data, pageContext: { title } }) {
  return (
    <MDXProvider
      components={{
        Video,
        pre: CodeBlock,
      }}
    >
      <Theme>
        <SEO title={title} />

        <header className={styl.header}>
          <div className={styl.lf}>
            <div className={styl.logoWrapper}>
              <i className={styl.logo} />
              <span>Notebook</span>
            </div>

            <span className={styl.slogan}>
              Note Everything
            </span>
          </div>
          <div className={styl.rt}>
            <Link to="/search" className={styl.search}>
              <i className={cns('iconfont icon-search')} />
              <span>搜索</span>
            </Link>
          </div>
        </header>

        <div className={styl.markdownLayout}>
          <Sidebar location={location} />

          <MarkdownPage
            title={title}
            mdx={data.mdx}
          />
        </div>
      </Theme>
    </MDXProvider>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    mdx(fields: { slug: { eq: $path } }) {
      body
      rawBody
      tableOfContents
      fields {
        filePath
      }
    }
  }
`
