import React from "react"

import * as styl from './404.module.scss'

const NotFoundPage = () => (
  <div className={styl.page}>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
)

export default NotFoundPage
