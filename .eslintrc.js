module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
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
      version: '16.4.1',
    },
  },
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.tsx'],
      },
    ],
    'react/forbid-prop-types': 'any',
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
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        // The regular rule thinks imported types are unused
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/adjacent-overload-signatures': 2,
        '@typescript-eslint/array-type': ['error', 'generic'],
        '@typescript-eslint/class-name-casing': 2,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/interface-name-prefix': ['error', 'never'],
        '@typescript-eslint/no-angle-bracket-type-assertion': 'error',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/prefer-interface': 'error',
      },
    },
    {
      files: ['packages/**/*.spec.js'],
      globals: {
        expect: true,
        should: true,
        jest: true,
      },
      rules: {
        'jest/no-disabled-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/valid-expect': 'error',
      },
    },
  ],
};
