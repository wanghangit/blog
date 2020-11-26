const path = require("path")
const CopyRightWebpackPlugin = require("./plugin/copyright-webpack-plugin.js")

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, './loader/replaceWord.js'),
          options: {
            name: 'good bye1'
          }
        }
      }
    ]
  },
  plugins: [
    new CopyRightWebpackPlugin()
  ]
}