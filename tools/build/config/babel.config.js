module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  const isProduction = api.env('production');
  const modules = isProduction ? false : 'commonjs';

  const presets = [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules,
        targets: {
          browsers: ['last 2 versions', 'safari >= 7', 'ie >= 10'],
        },
      },
    ],
  ];

  // For an explanation of `{loose: true}` see:
  // https://github.com/babel/babel/issues/11622#issuecomment-644141879
  const plugins = [
    '@babel/plugin-proposal-export-default-from',
    '@emotion/babel-plugin',
  ];

  return { presets, plugins };
};
