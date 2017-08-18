const path = require('path')

console.log(process.cwd())

const appPath = path.join(process.cwd(), 'src')
const assetsPath = path.join(appPath, 'assets')
const relAssetsPath = path.relative('.', assetsPath)
const processEnv = process.env.NODE_ENV

const aliases = {
  root: process.cwd(),
  'moment-timezone': 'moment-timezone/moment-timezone',
  images: path.join(assetsPath, 'images'),
  styles: path.join(assetsPath, 'styles'),
  fonts: path.join(assetsPath, 'fonts'),
  services: path.join(appPath, 'services'),
  'ui-components': path.join(appPath, 'ui-components'),
  components: path.join(appPath, 'hoc-components')
}

module.exports = {
  appPath,
  assetsPath,
  relAssetsPath,
  processEnv,
  aliases
}
