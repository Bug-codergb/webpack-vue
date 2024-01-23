const path =require("path");
const fs = require("fs");
const appDirectory=fs.realpathSync(process.cwd());
console.log(process.env.BUILD_PATH)
const resolveApp = (relativePath)=>path.resolve(appDirectory,relativePath);
const buildPath = process.env.BUILD_PATH;
module.exports = {
  appBuild:resolveApp(buildPath),
  appPublic:resolveApp("public"),
  appHtml:resolveApp("public/index.html"),
  appIndexJs:resolveApp("src/index.js"),
  appSrc:resolveApp("src"),
  appWebpackCache: resolveApp('node_modules/.cache'),

}
