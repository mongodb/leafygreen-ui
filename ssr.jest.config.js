const defaultConfig = require('./jest.config.js');

module.exports = {
  ...defaultConfig,
  testEnvironment: 'node',
  setupFiles: [
    ...defaultConfig.setupFiles,
    '<rootDir>/scripts/jestSSRSetup.js',
  ],
};
