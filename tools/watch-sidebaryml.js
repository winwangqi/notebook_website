const fs = require('fs')
const util = require('util')
const path = require('path')
const yaml = require('js-yaml')

const readFilePromise = util.promisify(fs.readFile)

const sidebarPath = path.resolve(__dirname, '../content/sidebar.yml')

function start() {
  let lastDoc = null

  function firstLoadFile() {
    loadYAML().then((doc) => lastDoc = doc)
  }

  function watchFile() {
    fs.watchFile(sidebarPath, () => {
      console.log(`watching file: ${sidebarPath}`)

      loadYAML().then((doc) => {

      })
    })
  }

}

function loadYAML() {
  return readFilePromise(sidebarPath, 'utf-8')
    .then((file) => {
      try {
        return yaml.safeLoad(file)
      } catch (e) {
        console.error('Load yaml file error', e)
        return Promise.reject(e)
      }
    })
}

function treeToPaths(tree, basePath) {
  Object.keys(tree).forEach((key) => {
    const value = tree[key]
    if (value instanceof Object) {
      treeToPaths()
    }
  })
}
