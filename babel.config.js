module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'safari >= 7', 'ie >= 10'],
        },
        modules: 'commonjs',
      },
    ],
  ];

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    'emotion',
  ];

  return { presets, plugins };
};
