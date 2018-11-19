module.exports = (storybookBaseConfig, env) => {
  const webpackConfig = require('../scripts/webpack-config.js')(env);

  return {
    ...storybookBaseConfig,
    module: {rules: webpackConfig.module.rules},
    resolve: webpackConfig.resolve,
    plugins: storybookBaseConfig.plugins.concat(webpackConfig.plugins),
  }
};
