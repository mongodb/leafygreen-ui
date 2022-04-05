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
    '@emotion/babel-preset-css-prop',
  ];

  const plugins = [
    // '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@emotion/babel-plugin',
    // '@babel/plugin-proposal-private-methods',
    // '@babel/plugin-proposal-private-property-in-object',
  ];

  return { presets, plugins };
};
