module.exports = {
  extends: 'npm-package-json-lint-config-default',
  rules: {
    'prefer-property-order': [
      'off',
      [
        'name',
        'version',
        'description',
        'publishConfig',
        'scripts',
        'dependencies',
        'devDependencies',
        'peerDependencies',
      ],
    ],
    'prefer-caret-version-dependencies': [
      'off',
      { exceptions: ['highlight.js', 'prettier'] },
    ],
    'valid-values-license': ['error', ['Apache-2.0']],
  },
};
