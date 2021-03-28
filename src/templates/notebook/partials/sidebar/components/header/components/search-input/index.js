import React, { useState } from 'react'
import PropTypes from 'prop-types'

import cns from 'classnames'
import * as styl from './index.module.scss'

Index.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
}

Index.defaultProps = {
  value: '',
  onChange: Function.prototype,
  onClear: Function.prototype,
}

function Index(props) {
  const { value, onChange, onClear } = props

  return (
    <div className={styl.searchInput}>
      <div className={styl.inputWrapper}>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
        {value && (
          <i
            className={cns('iconfont icon-reeor-fill', styl.icon)}
            onClick={onClear}
          />
        )}
      </div>
    </div>
  )
}

export default Index
