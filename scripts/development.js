require("../config/dotenv.js")
const WebpackDevServer = require("webpack-dev-server")
const paths = require("../config/paths.js")
const configFactory = require("../config/webpack.config.js");
const { createCompiler } = require("../config/createCompiler.js");
process.env.NODE_ENV="development";
const config = configFactory("development");
const compiler = createCompiler({
  appName:"webpack-vue",
  config
})
const devServer = new WebpackDevServer({
  port:3000,
  open:true
},compiler)
devServer.startCallback(() => {
  console.log('start......');
});
