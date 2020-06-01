const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const APP_PATH = path.resolve(__dirname, "src");
const WWW_PATH = path.resolve(__dirname, "public");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: path.join(APP_PATH, "index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },

  module: {
    rules: [
      { test: /\.(ts|js)x?$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.(scss|sass|css)$/,
        loader: ["style-loader", "css-loader", "sass-loader"],
      },
      { test: /\.(png|svg|jpg|jpeg|gif|ico)$/, loader: ["file-loader"] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, loader: ["file-loader"] },
    ],
  },
  devServer: {
    https: true,
    port: 4731,
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    proxy: {
      "/api": "https://localhost:4730",
    },
  },
  devtool: "source-map",
  externals: [],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(WWW_PATH, "index.html"),
      favicon: path.join(WWW_PATH, "favicon.ico"),
    }),
    new webpack.DefinePlugin({
      SERVICE_HOST: JSON.stringify("localhost"),
    }),
    new CleanWebpackPlugin(),
  ],
};
