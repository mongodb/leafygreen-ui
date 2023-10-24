import { rules } from './rules';

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const plugin = {
  meta: {
    name: '@lg-tools/eslint-plugin',
    version: '0.0.1',
  },
  rules,
  configs: {
    maintainer: {
      plugins: ['@lg-tools'],
      rules: {
        '@lg-tools/test-rule': ['error'],
      },
    },
    consumer: {
      plugins: ['@lg-tools'],
      rules: {},
    },
  },
};

export default plugin;
