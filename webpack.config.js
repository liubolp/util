var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var utils = require('./glob')
var webpack = require('webpack')
function resolve (dir) {
  return path.resolve(__dirname, dir)
}
module.exports = {
  entry: utils.getEntry('src/*/*.js', 1),
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    },
    modules: ['node_modules', path.resolve('src')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?importLoaders=1', 'postcss-loader']
        }),
        include: [resolve('src')]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?importLoaders=1', 'postcss-loader', 'less-loader']
        }),
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/static/[name].[ext]'// utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'// utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/static/font/[name].[ext]'// utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true,
    noInfo: true,
    quiet: true
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
// 生成对应的html文件
Object.keys(module.exports.entry).forEach(function (entry) {
  module.exports.plugins.push(new HtmlWebpackPlugin({
    filename: entry + '.html',
    template: 'html-withimg-loader!' + module.exports.entry[entry].replace(/\.js$/, '.html'),
    inject: true,
    chunks: [entry]
  }))
})
