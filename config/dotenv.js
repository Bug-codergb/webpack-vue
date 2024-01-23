const dotenv = require("dotenv");
const paths = require("./paths.js");
const envConfigPath={
  development:paths.appEnvDev,
  production:paths.appEnvProd
}
const envConfig = dotenv.config({
  path:envConfigPath[process.env.CURRENT_ENV]
}).parsed;
module.exports={
  dotenv,
  envConfig,
  envConfigPath
}
