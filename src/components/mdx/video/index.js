import React from 'react'
import PropTypes from 'prop-types'

import cns from 'classnames'
import * as styl from './index.module.scss'

Index.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  iframe: PropTypes.bool,
}

Index.defaultProps = {
  iframe: false,
}

function Index(props) {
  return (
    <div className={cns('mdx-video', styl.outer)}>
      <div className={styl.inner}>
        {props.iframe
          ? (
            <iframe
              title={props.src}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              src={props.src}
              allowFullScreen={true}
            />
          ) : (
            // eslint-disable jsx-a11y/media-has-caption
            <video
              src={props.src}
              poster={props.poster}
              width="100%"
              controls
            />
          )
        }
      </div>
    </div>
  )
}

export default Index
