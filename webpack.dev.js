const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /.s?css$/i,
        use: [
          'style-loader', //3. Injects styles into DOM
          'css-loader',   //2. Turns css into common js
          'sass-loader'   //1. Turns sass into css
        ],
      },
    ]
  }
});