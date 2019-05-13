const lernaScopesConfig = require('@commitlint/config-lerna-scopes');

const scopes = ['tooling', 'XX'];

const getScopes = (initialEnum = []) => (ctx) =>
  lernaScopesConfig.utils
    .getPackages()
    .then((packageList) => initialEnum.concat(packageList))
    .then((scopeList) => [2, 'always', scopeList]);

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': (ctx) => getScopes(scopes)(ctx),
  },
};

