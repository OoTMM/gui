'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const env = process.env.NODE_ENV || 'development';
const dev = env === 'development';

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: dev ? 'app.js' : 'app.[contenthash].min.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          'file-loader',
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'node_modules/@ootmm/core/dist/data' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: dev ? 'app.css' : 'app.[contenthash].min.css',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
  ]
};
