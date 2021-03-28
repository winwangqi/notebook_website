import React from 'react'
import PropTypes from 'prop-types'

import cns from 'classnames'
import * as styl from './index.module.scss'

Index.propTypes = {
  collapse: PropTypes.bool,
  typeClose: PropTypes.bool,
}

Index.defaultProps = {
  collapse: false,
  typeClose: false,
}

function Index(props) {
  return (
    <div
      className={cns(
        styl.button,
        props.className,
        {
          [styl.collapse]: props.collapse,
          [styl.typeClose]: props.typeClose,
        },
      )}
    >
      <i className={cns('iconfont icon-arrow-up', styl.arrow, styl.up)}/>
      <i className={cns('iconfont icon-arrow-down', styl.arrow, styl.down)}/>
    </div>
  )
}

export default Index
