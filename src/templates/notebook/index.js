import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'

import SEO from '@/components/seo'
import Video from '@/components/mdx/video'
import CodeBlock from '@/components/mdx/code-block'
import Theme from '@/components/theme'
import Sidebar from './partials/sidebar'
import MarkdownPage from './partials/MarkdownPage'

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
