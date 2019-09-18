import React  from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import themePink from '../themes/pink/index'

import cns from 'classnames'
import styl from './index.module.scss'

function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />
      <div className={cns('main-width theme-color', styl.slogan)}>For Learning! For Everyone!</div>
      <div className={styl.content}>
        <video className={styl.banner} src={require('../assets/videos/beach.mp4')} autoPlay loop />
        <Link className={cns('theme-primary-button', styl.button)} to="/Notebook/功能需求">Let's Go!</Link>
      </div>
    </Layout>
  )
}

export default IndexPage
