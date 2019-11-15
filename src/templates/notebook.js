import React from "react"
import { graphql } from "gatsby"

import MarkdownPage from 'components/MarkdownPage'
export default function Notebook({ data, pageContext: { title, headingIDs, tableOfContentsAST } }) {
  const { markdownRemark } = data

  return (
    <MarkdownPage
      title={title}
      markdownRemark={markdownRemark}
      headingIDs={headingIDs}
      tableOfContentsAST={tableOfContentsAST}
    />
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      tableOfContents (
        pathToSlugField: "fields.slug"
        heading: null
        maxDepth: 4
      )
    }
  }
`
