const webpack = require('webpack');
function createCompiler({ appName, config }) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    console.error('failed to compile');
    console.log(e.message);
  }
  return compiler;
}
module.exports = {
  createCompiler
};
