const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


module.exports = merge(common,{
  mode: "production",
  output: {
    filename: "js/main.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({filename: "main.[contenthash].css"}),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 7 }],
          [
            'svgo',
            {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          ],
        ],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          'css-loader',   //2. Turns css into common js
          'sass-loader'   //1. Turns sass into css
        ],
      },
      {
        test: /\.svg$/i,
        type: 'asset/inline',
        parser: {
          dataUrlCondition: {
            maxSize: 12 * 1024,
          },
        },
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(), new TerserPlugin(),
    ],
  },
});