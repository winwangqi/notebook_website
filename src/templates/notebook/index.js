import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'

import SEO from '@/components/seo'
import Video from '@/components/mdx/video'
import CodeBlock from '@/components/mdx/code-block'
import Theme from '@/components/theme'
import Sidebar from './partials/sidebar'
import MarkdownPage from './partials/markdown-page'

import styl from './index.module.scss'

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
            <i className={styl.logo}></i>
            <span>Notebook</span>
          </div>
          <div className={styl.rt}>Note Everything</div>
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
      tableOfContents
    }
  }
`
