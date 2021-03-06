var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var utils = require('./utils')
var RewriteImportPlugin = require('less-plugin-rewrite-import')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    app: './src/main.js',
    vendor: [
      'easystarjs',
      'is_js',
      'lodash',
      'moment',
      'phaser',
      'theaterjs',
      'vue',
      'vue-resource',
      'vue-router',
      'vuex',
      'vuex-router-sync'
    ]
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'phaser': path.resolve(__dirname, '../node_modules/phaser/build/custom/phaser-split.js'),
      'pixi': path.resolve(__dirname, '../node_modules/phaser/build/custom/pixi.js'),
      'p2': path.resolve(__dirname, '../node_modules/phaser/build/custom/p2.js')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'file',
        query: {
          name: utils.assetsPath('json/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /phaser-split\.js$/,
        loader: 'imports?p2=p2&PIXI=pixi'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Phaser: 'phaser'
    })
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  lessLoader: {
    lessPlugins: [
      new RewriteImportPlugin({
        paths: {
          '../../theme.config': path.resolve(__dirname, '../src/semantic-ui/theme.config')
        }
      })
    ]
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
