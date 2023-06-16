// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/index.ts', '.svg'],

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
    'less',
  ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '.(png|jpg|jpeg|gif|woff|woff2|ttf|less|eot)$':
      '<rootDir>/__mocks__/fileMock.js',
  },

  modulePathIgnorePatterns: ['npm-cache', '.npm'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],

  // The regexp pattern Jest uses to detect test files
  testRegex: '.spec.[jt]sx?$',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '.svg': '<rootDir>/__mocks__/svgTransformer.js',
  },

  // Ignore transforming node_modules except for:
  // 1. `react-children-utilities`
  transformIgnorePatterns: ['/node_modules/(?!(react-children-utilities)/)'],

  setupFiles: ['<rootDir>/scripts/jestSetup.js', 'jest-canvas-mock'],

  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/scripts/jestCommon.ts',
  ],
};
