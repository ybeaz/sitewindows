//'use strict';

/*  NodeJS server with express.js 
  cd c:/Data/Dev/UserTo/r1.userto.com/
  node server.js
  localhost:3000/demo-js-redux-example.html
*/
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
var  path        = require('path');
var  webpack       = require('webpack');
var  glob         = require("glob");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    wit:   ['./index.tsx'], //['babel-polyfill', './index.js']
  },
  output: {
  path: path.resolve(__dirname, 'dist'),
  //publicPath: '/',
  filename: '[name].min.js'  
  },
  module: {
    rules: [
      {
        test: /\.(js[\S]{0,1}|ts[\S]{0,1})$/i,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader',
            query: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ['@babel/proposal-class-properties']
            }
          },
          { loader: 'ts-loader' }
        ]
      },
      {
        test: /\.(css|less)$/i,
        exclude: [/node_modules/],
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, 
        {
          loader: 'css-loader' // translates CSS into CommonJS
        }, 
        {
          loader: 'less-loader' // compiles Less to CSS
        }],
      },
      // this rule handles images
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      {
        test: /\.(jpe?g|png|gif)$/i,
        exclude: /node_modules/,
        use: [
          'url-loader?limit=10000',
          'img-loader',
          'file-loader?name=[name].[ext]?[hash]'
        ],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      // the following 3 rules handle font extraction
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.otf(\?.*)?$/,
        use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react', 'react-dom': 'ReactDOM',
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false }
    }),
    new HtmlWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),  
  ],  
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.es6', '.jsx', 'less', 'css', 'config', 'variables', 'overrides']
  },
  performance: {
    hints: false,
  },   
  watch: false,
  target: 'web',
  externals: [
    { pg: true }
  ],
  node: {
    fs: 'empty',
  },
  optimization: {
    namedModules: false,
    namedChunks: false,
    nodeEnv: 'production',
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    noEmitOnErrors: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
  },
}

/*

  new HtmlWebpackPlugin(),
  //Rule, that delay
  
    'babel-polyfill', 

    {
      test: /\.(htm|html|xhtml|hbs|handlebars|php|ejs)$/i,
      exclude: /node_modules/,
      loader: "file?name=[name].[ext]",
    }, 

*/