const { join, resolve } = require('path')
const { DefinePlugin } = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = (config) => ({
  entry: {
    main: './src',
  },
  context: resolve(__dirname, '..'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [join(__dirname, '../node_modules'), join(__dirname, '../src')],
  },
  plugins: [
    new DefinePlugin({
      APP_ENV: JSON.stringify(process.env.NODE_ENV),
      APP_NAME: JSON.stringify(config.appName),
      APP_VERSION: JSON.stringify(config.appVersion),
    }),
    new HtmlPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '../src/index.template.html'),
      title: config.appName,
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
})
