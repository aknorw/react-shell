const { resolve } = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')

const commons = require('./commons')
const config = require('./config')

const commonsConfig = commons(config)

const devConfig = {
  output: {
    publicPath: `http://${config.devServer.host}:${config.devServer.port}/`,
    filename: '[name].[hash].js',
  },
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    ...config.devServer,
    watchOptions: {
      // Without polling, dev server does not work on Ubuntu
      poll: 1000,
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}

const prodConfig = {
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'public/js/[name].[hash].js',
    chunkFilename: 'public/js/[name].[chunkhash].js',
  },
  plugins: [new webpack.HashedModuleIdsPlugin(), new webpack.NoEmitOnErrorsPlugin(), new BundleAnalyzerPlugin()],
  optimization: {
    concatenateModules: true,
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: {
      name: 'runtime',
    },
    // https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendors',
          chunks: 'all',
          test: /node_modules/,
          priority: 20,
        },
        common: {
          name: 'commons',
          minChunks: 2,
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true,
          priority: 10,
        },
      },
    },
    minimizer: [new TerserPlugin()],
  },
}

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonsConfig, prodConfig)
  }
  return merge(commonsConfig, devConfig)
}
