import React, { useEffect }  from "react"
import { Link, navigate } from "gatsby"

// import SEO from "../components/seo"

// import themePink from '../themes/pink/index'

// import cns from 'classnames'
// import styl from './index.module.scss'

function IndexPage() {
  useEffect(() => {
    if (window) {
      window.location.replace('/track/index.html')
    }
  }, [])
  return null
}

export default IndexPage
