/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import 'normalize.css'
import './src/styles/index.scss'

// image lazy load
import 'lazysizes'

import './src/plugins/prismjs/themes/prism-tomorrow'

// Auto switch color model by prefers-color-scheme
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//   require('./src/plugins/prismjs/themes/prism-tomorrow')
// } else {
//   require('./src/plugins/prismjs/themes/prism-dracula.css')
// }
