/* eslint-disable import/no-named-as-default */
/* eslint-disable import/default */
/* eslint-disable import/namespace */
// eslint-disable-next-line import/no-named-as-default-member
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import merge from "webpack-merge";
import common from "./webpack.config.common";

const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "src"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
};

export default merge(common, devConfig);
