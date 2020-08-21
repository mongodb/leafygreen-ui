const path = require('path');
const withTM = require('next-transpile-modules')(['@leafygreen-ui/'], {
  resolveSyminks: true,
});

module.exports = withTM({
  webpack: config => {
    config.resolve.alias['react'] = path.resolve(
      __dirname,
      '.',
      'node_modules',
      'react',
    );

    return config;
  },
});
