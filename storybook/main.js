const customWebpack = require('./webpack.config.js');

module.exports = {
  stories: [
    '../**/*.story.tsx',
    '../**/*.story.mdx',
    '../**/*.stories.tsx',
    '../**/*.stories.mdx',
  ],
  addons: [
    '@storybook/addon-knobs',
    // '@storybook/addon-a11y',
    // 'storybook-addon-performance',
  ],
  webpackFinal: config => {
    return { ...config, ...customWebpack };
  },
};
