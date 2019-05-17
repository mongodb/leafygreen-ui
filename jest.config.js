// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
    'png',
    'jpg',
    'jpeg',
    'gif',
    'svg',
    'woff',
    'woff2',
    'ttf',
    'eot',
  ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$':
      '<rootDir>/__mocks__/fileMock.js',
  },

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],

  // The regexp pattern Jest uses to detect test files
  testRegex: '.spec.[jt]sx?',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  setupFiles: ['<rootDir>/scripts/jestSetup.js'],
};
