const merge = require('webpack-merge')

const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,
    inline: true,
  },
  devtool: 'source-map',
})
