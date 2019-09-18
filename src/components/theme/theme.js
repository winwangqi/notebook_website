import React, { useState } from 'react'
import PropTypes from 'prop-types'

import themePink from '../../themes/pink'

Theme.propTypes = {

}

function Theme(props) {
  const { children } = props
  const [theme, setTheme] = useState(themePink)

  return (
    <div className={theme}>
      {children}
    </div>
  )
}

export default Theme
