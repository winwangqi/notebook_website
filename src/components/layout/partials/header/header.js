import PropTypes from "prop-types"
import React from "react"

import cns from 'classnames'
import * as styl from './header.module.scss'

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

function Header ({ siteTitle }) {
  return (
    <header className={cns('theme-color', styl.header)}>
      <div className={cns('main-width', styl.wrapper)}>
        <h1>{siteTitle}</h1>
      </div>
    </header>
  )
}

export default Header
