const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

module.exports = {

  entry: {
    index: './src/index/index.js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.ts|\.tsx$/,
        use: 'awesome-typescript-loader',
        include: __dirname
      },
      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }

      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /img/,
        include: /fonts/,
        use: [
          {
            loader: 'file-loader?name=./fonts/[name]/[name].[ext]'
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /fonts/,
        use: [
          {
            loader: 'file-loader?name=img/[name].[ext]',
            options: {
              name: './img/[name].[ext]',
              context: path.resolve(__dirname, "src/"),
              useRelativePaths: true,
              emitFile: false
            }
          }]
      },

    ]
  },
  devServer: {
    stats: 'errors-only'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CopyWebpackPlugin([{
      from: './src/fonts',
      to: './fonts'
    },
    {
      from: './src/img',
      to: './img'
    }
    ]),

    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/index/index.pug',
      filename: 'index.html',
      chunks: ['index']
    }),
  ]
};