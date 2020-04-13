import React, { useState } from "react"
import PropTypes from "prop-types"

import copyToClipboard from "../../../utils/copy-to-clipboard"

const delay = duration => new Promise(resolve => setTimeout(resolve, duration))

function Copy({ className, content, duration, fileName, trim = false }) {
  const [copied, setCopied] = useState(false)

  const label = copied
    ? `${fileName ? fileName + ` ` : ``}copied to clipboard`
    : `${fileName ? fileName + `: ` : ``}copy code to clipboard`

  return (
    <button
      name={label}
      className={className}
      disabled={copied}
      onClick={async () => {
        await copyToClipboard(trim ? content.trim() : content)

        setCopied(true)

        await delay(duration)

        setCopied(false)
      }}
    >
      {copied ? `Copied` : `Copy`}
    </button>
  )
}

Copy.propTypes = {
  content: PropTypes.string.isRequired,
  duration: PropTypes.number,
  trim: PropTypes.bool,
}

Copy.defaultProps = {
  duration: 3000,
  fileName: ``,
}

export default Copy
