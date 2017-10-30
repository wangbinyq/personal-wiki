var path = require("path")
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js"
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
  devServer: {
    port: 10001
  }
}