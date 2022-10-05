module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'safari >= 7', 'ie >= 10'],
        },
        modules: api.env('production') ? false : 'commonjs',
      },
    ],
  ];

  // For an explanation of `{loose: true}` see:
  // https://github.com/babel/babel/issues/11622#issuecomment-644141879
  const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@emotion/babel-plugin',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ];

  return { presets, plugins };
};
