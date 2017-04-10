var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');



module.exports = {
  context: __dirname,
   entry: {
    index: './webpack_js/index',
    recruiter_login: './webpack_js/recruiter_login',
    recruiter: './webpack_js/recruiter',
    dashboard: './webpack_js/dashboard',
  },
  output: {
      path: path.resolve('./static/webpack_bundles/'),
      filename: "[name]-[hash].js"
  },
  module: {
        loaders: [
            // Extract css files
{
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.less$/i,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: "css-loader!less-loader" })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: "css-loader!sass-loader!image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false" })
            },
            {test: /\.(jpe?g|png|gif|svg)$/i, loaders: [
                'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]},
            // Optionally extract less files
            // or any other compile-to-css language
            // You could also use other loaders the same way. I. e. the autoprefixer-loader
        ]
    },
	externals: {
	},
  plugins: [
      new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery",
           "window.jQuery": "jquery"
       }),

    new webpack.HotModuleReplacementPlugin({
      include: /\.min\.js$/,
      minimize: true
    }),

    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin({
        filename: "[name]-[hash].css",
        allChunks: true
      }),  ]
}