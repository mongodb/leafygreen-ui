const defaultConfig = require('./jest.config.js');

module.exports = {
  ...defaultConfig,
  setupFiles: [
    ...defaultConfig.setupFiles,
    '<rootDir>/scripts/jestSSRSetup.js',
  ],
};
