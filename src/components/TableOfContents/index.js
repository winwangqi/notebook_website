import React from 'react'

import styl from './index.module.scss'

export default function(props) {
  const { tableOfContents } = props

  return (
    <div className={styl.tableOfContents}>
      <div className={styl.content} dangerouslySetInnerHTML={{ __html: tableOfContents }} />
    </div>
  )
}