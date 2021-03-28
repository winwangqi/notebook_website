import React from 'react'

import cns from 'classnames'
import * as styl from './footer.module.scss'

function Footer() {
  return (
    <div className={cns('main-width', styl.footer)}></div>
  )
}

export default Footer
