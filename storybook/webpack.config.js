module.exports = ({ config, mode }) => {
  const webpackConfig = require('../webpack.config.js')(mode);
  config.module.rules = webpackConfig.module.rules;
  config.resolve.extensions = webpackConfig.resolve.extensions;

  return config;
};
