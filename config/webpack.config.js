const { envConfigPath } = require("./dotenv.js");
const paths =require("./paths.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvWebpack = require('dotenv-webpack');
const { VueLoaderPlugin } = require('vue-loader')
module.exports = function(webpackEnv){
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  return {
    target:"browserslist",
    entry:paths.appIndexJs,
    output:{
      path:paths.appBuild,
      filename:isEnvProduction?'static/js/[name].[contenthash:8].js':'static/js/bundle.js',
      chunkFilename: isEnvProduction ?"static/js/[name].[contenthash:8].chunk.js":"static/js/[name].chunk.js",
      assetModuleFilename: "static/media/[name].[hash][ext]",
      clean: true
    },
    mode:isEnvProduction ?'production':"development",
    devtool: isEnvProduction?false:"cheap-module-source-map",
    resolve: {
      extensions: ['.vue','.js','.jsx']
    },
    cache:{
      type:"filesystem",
      cacheDirectory: paths.appWebpackCache,
      store:'pack'
    },
    module:{
      rules:[
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/i,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.(jpg|jpeg|png|gif|webp|svg)$/,
          type: 'asset/resource',
          exclude: /(node_modules|bower_components)/,
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024
            }
          }
        },

      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: paths.appHtml
        }),
      new VueLoaderPlugin(),
      new DotenvWebpack({
        path: envConfigPath[process.env.CURRENT_ENV] // 根据环境配置文件路径
      }),
    ]
  }
}
