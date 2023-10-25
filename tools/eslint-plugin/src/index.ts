import { RuleModule } from '@typescript-eslint/utils/ts-eslint';
import { ESLint } from 'eslint';

import { rules } from './rules';

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

type RuleKey = keyof typeof rules;
// type DefaultConfigsRecord = Exclude<ESLint.Plugin['configs'], undefined>;
// type DefaultConfig = DefaultConfigsRecord[string];
// type DefaultConfigRules = DefaultConfig['rules'];

interface Plugin extends Omit<ESLint.Plugin, 'rules'> {
  rules: Record<RuleKey, RuleModule<any, any, any>>;
}

const plugin: Plugin = {
  meta: {
    name: '@lg-tools/eslint-plugin',
    version: '0.0.1',
  },
  rules,
  configs: {
    maintainer: {
      plugins: ['@lg-tools'],
      rules: {
        '@lg-tools/example': ['off'],
        '@lg-tools/standard-testid': ['warn'],
        '@lg-tools/boolean-verb-prefix': [
          'warn',
          { allowVarNames: ['darkMode'] },
        ],
      },
    },
    consumer: {
      plugins: ['@lg-tools'],
      rules: {},
    },
  },
};

export default plugin;
