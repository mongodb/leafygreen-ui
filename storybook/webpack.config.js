module.exports = (storybookBaseConfig, env = 'development') => {
  const webpackConfig = require('../webpack.config.js')(env);

  return {
    ...storybookBaseConfig,
    module: { rules: webpackConfig.module.rules },
    resolve: webpackConfig.resolve,
    plugins: storybookBaseConfig.plugins.concat(webpackConfig.plugins),
  };
};
