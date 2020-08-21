module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/react',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: '16.13.1',
    },
  },
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.tsx'],
      },
    ],
    'react/forbid-prop-types': 1,
    'react/sort-comp': 'error',
    'import/no-extraneous-dependencies': 0,
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['block-like', 'const', 'let', 'if', 'while', 'return'],
        next: 'block-like',
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: ['block-like', 'const', 'let', 'case', 'if', 'while', 'return'],
      },
    ],
    'no-var': 1,
    'prefer-const': 1,
    'no-trailing-spaces': 'error',
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        // The regular rule thinks imported types are unused
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': [1, { ignoreRestSiblings: true }],
        '@typescript-eslint/adjacent-overload-signatures': 2,
        '@typescript-eslint/array-type': [2, { default: 'generic' }],
        '@typescript-eslint/class-name-casing': 2,
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
          },
        ],
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/interface-name-prefix': ['error', 'never'],
        '@typescript-eslint/no-inferrable-types': 'warn',
      },
    },
    {
      files: ['packages/**/*.spec.{ts,tsx}'],
      globals: {
        expect: true,
        should: true,
        jest: true,
      },
      rules: {
        'jest/no-disabled-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/valid-expect': 'error',
        'jest/expect-expect': [
          'warn',
          {
            assertFunctionNames: ['expect', 'waitForElementToBeRemoved'],
          },
        ],
      },
    },
  ],
};
