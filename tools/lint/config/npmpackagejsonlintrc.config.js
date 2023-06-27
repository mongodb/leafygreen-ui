module.exports = {
  rules: {
    'prefer-caret-version-dependencies': 'warning',
  },
  overrides: [
    {
      patterns: ['./packages/code/package.json'],
      rules: {
        'prefer-caret-version-dependencies': 'off',
      },
    },
  ],
};
