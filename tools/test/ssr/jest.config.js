const defaultConfig = require('./jest.config.js');

module.exports = {
  ...defaultConfig,
  setupFiles: [
    ...defaultConfig.setupFiles,
    '@lg-tools/jest/ssr/setup.js',
  ],
};
