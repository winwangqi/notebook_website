import React from "react"
import { graphql } from "gatsby"

import MarkdownPage from 'components/MarkdownPage'
export default function Notebook({ data }) {
  const { markdownRemark } = data

  console.log(markdownRemark)

  return (
    <MarkdownPage
      markdownRemark={markdownRemark}
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