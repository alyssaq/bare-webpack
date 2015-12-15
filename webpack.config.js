var path = require('path')
var webpack = require('webpack')
var embedFileSize = 65536

var output = {
  path: path.join(__dirname, 'build'),
  filename: 'app.js',
  publicPath: '/'
}

var assetsLoaders = [
  {test: /\.css$/, loader: 'style!css!autoprefixer?browsers=last 2 versions'}
]

var eslintLoader = {
  test: /\.js/,
  exclude: /node_modules/,
  loader: 'eslint'
}

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin()
]

var production = {
  entry: [
    './src/app'
  ],
  output: output,

  plugins: plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ]),

  stats: {
    colors: true
  }
}

var development = {
  port: 3000,
  devtool: 'inline-source-map',
  debug: true,
  entry: [
    './src/app',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server'
  ],
  output: output,

  plugins: plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]),

  stats: {
    chunkModules: false,
    colors: true
  }
}

module.exports = production
module.exports.development = development
