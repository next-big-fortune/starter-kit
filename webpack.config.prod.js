/* eslint-disable import/no-named-as-default */
/* eslint-disable import/default */
/* eslint-disable import/namespace */
// eslint-disable-next-line import/no-named-as-default-member
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import merge from "webpack-merge";
import common from "./webpack.config.common";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const prodConfig = {
  mode: "production",
  devtool: "source-map", // recommanded for production,
  entry: {
    main: path.resolve(__dirname, "src/index"),
    vendor: path.resolve(__dirname, "src/vendor"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      // Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: "7b274d95c75b489382b37ed571c5272e",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};

export default merge(common, prodConfig);
