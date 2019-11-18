/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import 'normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './src/styles/index.scss'

// prismjs show line number
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import './src/plugins/prismjs/line-numbers/index.scss'

// Auto switch color model by prefers-color-scheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  import('prismjs/themes/prism-tomorrow.css')
} else {
  import('./src/plugins/prismjs/themes/prism-dracula.css')
}