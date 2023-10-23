import { ESLint } from 'eslint';

import { rules } from './rules';

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const plugin: ESLint.Plugin = {
  meta: {
    name: '@lg-tools/eslint-plugin',
    version: '0.0.1',
  },
  rules,
  configs: {
    contributor: {
      plugins: ['@lg-tools'],
      rules: {
        '@lg-tools/test-rule': ['error'],
      },
    },
  },
};

export default plugin;
