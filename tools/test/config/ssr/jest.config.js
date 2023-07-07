const defaultConfig = require('../jest.config.js');

module.exports = {
  ...defaultConfig,
  setupFiles: [
    ...defaultConfig.setupFiles,
    '<rootDir>/node_modules/@lg-tools/test/config/ssr/setup.js',
  ],
};
