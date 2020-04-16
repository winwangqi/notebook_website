/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import 'normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './src/styles/index.scss'

import 'lazysizes'

// Auto switch color model by prefers-color-scheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  require('./src/plugins/prismjs/themes/prism-tomorrow')
} else {
  require('./src/plugins/prismjs/themes/prism-dracula.css')
}
