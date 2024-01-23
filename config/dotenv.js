const dotenv = require("dotenv");
const path = require("path");

const envConfigPath={
  development:path.resolve(process.cwd(),".env.development"),
  production:path.resolve(process.cwd(),".env.production")
}
const envConfig = dotenv.config({
  path:envConfigPath[process.env.CURRENT_ENV]
}).parsed;
module.exports={
  dotenv,
  envConfig,
  envConfigPath
}
