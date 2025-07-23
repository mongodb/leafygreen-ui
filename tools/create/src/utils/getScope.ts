/* eslint-disable no-console */
import { getLGConfig } from '@lg-tools/meta';
import chalk from 'chalk';

import { getParentScope } from './getParentScope';

export const getScope = (scopeArg?: string, parent?: string): string => {
  const { scopes } = getLGConfig();
  const defaultScope = Object.keys(scopes)[0];

  if (parent) {
    const parentScope = getParentScope(parent);

    if (parentScope) {
      return parentScope;
    }
  }

  if (scopeArg && !scopes[scopeArg]) {
    console.log(
      chalk.red(
        `Scope "${scopeArg}" not found in package.json \`lg.scopes\` parameter`,
      ),
      `\nValid Scopes:\n- ${Object.keys(scopes).join('\n- ')}`,
    );
    process.exit(1);
  }

  const scope = scopeArg && scopes[scopeArg] ? scopeArg : defaultScope;
  return scope;
};
