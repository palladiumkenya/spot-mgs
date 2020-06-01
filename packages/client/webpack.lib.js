const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const APP_PATH = path.resolve(__dirname, "src");
const webpack = require("webpack");

common.devServer.proxy = {
  "/api/": {
    target: "https://localhost:4730",
    pathRewrite: { "^/api": "" },
  },
};

module.exports = merge(common, {
  entry: {
    mgs: path.join(APP_PATH, "spot-mgs-client.js"),
  },
  output: {
    filename: "[name].js",
    libraryTarget: "amd",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVICE_HOST: JSON.stringify("localhost"),
    }),
  ],
});
