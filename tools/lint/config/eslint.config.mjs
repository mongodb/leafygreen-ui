import { fixupConfigRules } from '@eslint/compat';
import * as emotion from '@emotion/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jest/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:storybook/recommended',
    ),
  ),
  {
    ignores: [
      '**/dist/**/*',
      '**/bin/**/*',
      'storybook-static/**/*',
      '**/stories.js*',
      '.turbo',
      'tools/**/config/**/*',
      'packages/icon/src/glyphs/*.svg',
      'packages/icon/src/generated/*.tsx',
      'prettier.config.js',
    ],
  },
  {
    plugins: {
      '@emotion': emotion,
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: babelParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      '@emotion/jsx-import': 'error',
      '@emotion/pkg-renaming': 'error',
      'jest/no-conditional-expect': 'off',
      'jest/valid-title': 'off',

      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.js', '.tsx'],
        },
      ],

      'react/forbid-prop-types': 'warn',

      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(useIsomorphicLayoutEffect)',
        },
      ],

      'react/sort-comp': 'error',
      'import/no-extraneous-dependencies': 'off',

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

      'no-redeclare': 'off',
      'no-trailing-spaces': 'error',
      'no-undef': 'off',
      'no-var': 'warn',
      'prefer-const': 'warn',

      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/adjacent-overload-signatures': 'error',

      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],

          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
      ],

      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
        },
      ],

      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-inferrable-types': 'warn',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^(@|components)(/.*|$)'],
            ['^@leafygreen-ui', '^@?\\w'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css)$'],
          ],
        },
      ],
    },
  },
  {
    files: ['{chat,packages,tools}/**/*.spec.{ts,tsx}'],

    languageOptions: {
      globals: {
        expect: true,
        should: true,
        jest: true,
      },
    },

    rules: {
      'jest/no-alias-methods': 'warn',
      'jest/no-disabled-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/valid-expect': 'error',
      'jest/expect-expect': 'off',
    },
  },
];
