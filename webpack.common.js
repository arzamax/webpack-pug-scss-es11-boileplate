const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
})

const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: 'styles/[hash].[name].css',
})

const getHtmlWebpackPluginConfigs = () => {
  const pages = fs
    .readdirSync(path.resolve(__dirname, 'src', 'pages'))
    .filter(file => file.endsWith('.pug'))

  return pages.map(p => {
    const baseName = path.basename(p, '.pug')

    return new HtmlWebpackPlugin({
      filename: `${baseName}.html`,
      template: path.resolve(__dirname, 'src', 'pages', `${baseName}.pug`),
    })
  })
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'scripts/[hash].[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.(jpe?g|png|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: path.join('assets', 'images'),
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          outputPath: path.join('assets', 'fonts'),
        },
      },
    ],
  },
  plugins: [
    MiniCssExtractPluginConfig,
    DefinePluginConfig,
    ...getHtmlWebpackPluginConfigs(),
  ],
}
