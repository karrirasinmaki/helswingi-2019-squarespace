require('dotenv').config({silent: true});

const webpack = require('webpack');

const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');
const pkg = require(__dirname + '/package.json');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const siteJs = ['./scripts/site.js', './scripts/custom.js']

const config = {
  devtool: IS_PRODUCTION ? false : 'source-map',
  entry: {
    'scripts/site-bundle': siteJs
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: IS_PRODUCTION ? false : true,
        terserOptions: {
          beautify: !IS_PRODUCTION,
          compress: IS_PRODUCTION ? {
            drop_console: true, // eslint-disable-line camelcase
            warnings: false
          } : false,
          mangle: IS_PRODUCTION ? {
              except: ['_'] // don't mangle lodash
          } : false
        }
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEBUG__': JSON.stringify(!IS_PRODUCTION)
    }),

    new CopyPlugin([
      { from: './custom-collections-confs/*', to: './', flatten: true },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
        options: { babelrc: true }
      }
    ]
  }
}

module.exports = config;
