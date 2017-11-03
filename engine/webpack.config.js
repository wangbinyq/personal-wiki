var path = require("path")
const { CheckerPlugin } = require('awesome-typescript-loader')

function entry (name) {
  return path.resolve(__dirname, 'src/entry', name)
}

module.exports = {
  entry: {
    loader: entry('loader')
  },
  output: {
    filename: "[name].js",
    path: __dirname + '/dist'
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".vert", ".frag", ".glsl"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "awesome-typescript-loader" },
      { test: /(\.vert)|(\.frag)|(\.glsl)/, use: "raw-loader"}
    ]
  },
  plugins: [
    new CheckerPlugin()
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9800
  }
}