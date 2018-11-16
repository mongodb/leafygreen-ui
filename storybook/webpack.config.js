/* eslint-disable global-require */

const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const webpackConfig = require('../scripts/webpack-config.js')(env);

  const storybookWebpackConfig = genDefaultConfig(baseConfig, env);

  // Extend default storybook webpack config with our own webpack configuration
  storybookWebpackConfig.module.rules = webpackConfig.module.rules;
  storybookWebpackConfig.resolve = webpackConfig.resolve;
  storybookWebpackConfig.plugins = storybookWebpackConfig.plugins.concat(
    webpackConfig.plugins,
  );

  return storybookWebpackConfig;
};
