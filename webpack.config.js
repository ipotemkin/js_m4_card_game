const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const mode = process.env.MODE;

console.log('--->', mode);

module.exports = {
  mode: process.env.MODE,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
    ],
  },
  devtool:
    process.env.MODE === 'production' ? 'hidden-source-map' : 'source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new HtmlWebpackPlugin({
      filename: 'screen2.html',
      template: './screen2.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'screen3.html',
      template: './screen3.html',
    }),
    new CopyPlugin({ patterns: [{ from: 'src/img', to: 'static' }] }),
  ],
  optimization: { minimizer: ['...', new CssMinimizerPlugin()] },
};
