const defaultConfig = require('./jest.config.js');

module.exports = {
  ...defaultConfig,
  setupFiles: [
    ...defaultConfig.setupFiles,
    '<rootDir>/node_modules/@lg-tools/jest/ssr/setup.js',
  ],
};
