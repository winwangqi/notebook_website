import React, { useState } from 'react'
// import PropTypes from 'prop-types'

import themeLight from '../../themes/light'

Theme.propTypes = {

}

function Theme(props) {
  const { children } = props
  const [theme] = useState(themeLight)

  return (
    <div className={theme}>
      {children}
    </div>
  )
}

export default Theme
