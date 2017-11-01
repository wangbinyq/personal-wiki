var path = require("path")
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: {
    webgl: "./src/webgl.ts",
    three: "./src/t.ts"
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
    port: 10001
  }
}