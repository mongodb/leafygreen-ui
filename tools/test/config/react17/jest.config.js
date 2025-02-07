const baseConfig = require('../jest.config.js');

module.exports = {
  ...baseConfig,
  testTimeout: 60_000,
  testPathIgnorePatterns: [
    ...baseConfig.testPathIgnorePatterns,
    'packages/combobox', // Combobox tests are problematic in React 17
  ],
};
