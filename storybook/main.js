const customWebpack = require('./webpack.config.js');

module.exports = {
  stories: ['../**/*.story.@(ts|js)?(x)'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    'storybook-addon-performance',
  ],
  webpackFinal: config => {
    return { ...config, ...customWebpack };
  },
};
