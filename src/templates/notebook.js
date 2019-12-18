import React from "react"
import { graphql } from "gatsby"

import SEO from '../components/seo'
import MarkdownPage from 'components/MarkdownPage'

export const TemplateContext = React.createContext({
  location: {}
})

export default function Notebook({ data, location, pageContext: { title, headingIDs, tableOfContentsAST } }) {
  const { markdownRemark } = data

  return (
    <TemplateContext.Provider value={{ location }}>
      <SEO title={title}></SEO>
      <MarkdownPage
        title={title}
        markdownRemark={markdownRemark}
        headingIDs={headingIDs}
        tableOfContentsAST={tableOfContentsAST}
      />
    </TemplateContext.Provider>
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
