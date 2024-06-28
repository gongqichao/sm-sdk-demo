const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./index.js", // 入口文件的路径
  output: {
    path: path.resolve(__dirname, "dist"), // 输出文件夹路径
    filename: "bundle.js", // 输出的打包文件名
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    allowedHosts: [".ngrok-free.app", ".ngrok.io"],
    static: path.join(__dirname, "dist"),
    port: 3000,
    open: true,
  },
};
