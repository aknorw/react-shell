const dotenv = require('dotenv')

const { version } = require('../package.json')

dotenv.config()

module.exports = {
  appName: process.env.APP_NAME || 'APP',
  appVersion: version,
  devServer: {
    host: process.env.DEV_HOST || 'localhost',
    port: process.env.DEV_PORT || 5000,
  },
}
