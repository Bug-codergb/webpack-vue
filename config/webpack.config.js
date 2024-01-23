const { envConfigPath } = require("./dotenv.js");
const paths =require("./paths.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvWebpack = require('dotenv-webpack');



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
    cache:{
      type:"filesystem",
      cacheDirectory: paths.appWebpackCache,
      store:'pack'
    },
    module:{
      rules:[
        {
          oneOf:[
            {
              test:/\.vue$/,
              include: paths.appSrc,
              loader: require.resolve('vue-loader'),
            }
          ]
        }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: paths.appHtml
        }),
      new DotenvWebpack({
        path: envConfigPath[process.env.CURRENT_ENV] // 根据环境配置文件路径
      }),
    ]
  }
}
