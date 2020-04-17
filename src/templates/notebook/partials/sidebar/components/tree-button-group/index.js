import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ExpandButton from '../expand-button'

import cns from 'classnames'
import styl from './index.module.scss'

Index.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  onToggleExpand: PropTypes.func,
  onLocateCurrent: PropTypes.func,
}

Index.defaultProps = {
  onToggleExpand: Function.prototype,
  onLocateCurrent: Function.prototype,
}

function Index(props) {
  const [expand, setExpand] = useState(false)

  function handleExpand() {
    const newExpand = !expand

    setExpand(newExpand)
    props.onToggleExpand(newExpand)
  }

  return (
    <div className={cns(styl.buttonGroup, props.className)}>
      <div
        className={cns(styl.button, styl.expand)}
        onClick={handleExpand}
      >
        <ExpandButton collapse={expand} />
        <span className={styl.text}>全部{expand ? '收起' : '展开'}</span>
      </div>

      <div className={cns(styl.button, styl.locate)} onClick={props.onLocateCurrent}>
        <i className={cns('iconfont icon-aim', styl.icon)} />
        <span className={styl.text}>定位当前</span>
      </div>
    </div>
  )
}

export default Index
