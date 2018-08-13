const {
  resolve,
  join
} = require('path')
const yargs = require('yargs')

const {
  srcScript,
  dist,
  distScript
} = require('./directories')

const {
  env
} = yargs.argv

const isDeveloping = env === 'dev';

module.exports = {
  mode: 'none',
  context: join(__dirname, dist),
  output: {
    path: join(__dirname, distScript),
    filename: 'apps.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-2'],
          plugins: ['transform-runtime', 'transform-decorators-legacy'],
          cacheDirectory: true
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve(srcScript, 'cores')
    }
  },
  optimization: {
    flagIncludedChunks: true,
    concatenateModules: true,
    occurrenceOrder: true,
    sideEffects: true
  },
  devtool: isDeveloping && 'source-map'
}
