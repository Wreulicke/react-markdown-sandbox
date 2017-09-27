"use strict"
const path = require("path")
const webpack = require("webpack")
module.exports = {
  devServer: {
    contentBase: "./",
    port: 3000,
  },
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve("./target/"),
    filename: "bundle.js",
  },
  resolve: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false,
    // }),
    // new webpack.optimize.UglifyJsPlugin(),
  ],
}
