import React from "react"
// import { Link, navigate } from "gatsby"

// import SEO from "../components/seo"

// import themePink from '../themes/pink/index'

// import cns from 'classnames'
// import styl from './index.module.scss'

class IndexPage extends React.PureComponent {
  componentDidMount() {
    if (window) {
      window.location.replace('/track/index.html')
    }
  }

  render() {
    return null
  }
}

export default IndexPage
