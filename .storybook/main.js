module.exports = {
  stories: [
    '../**/*.story.@(mdx|js|jsx|ts|tsx)',
    '../**/*.stories.@(mdx|js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-knobs',
  ],
  framework: '@storybook/react',
  staticDirs: ['./static'],
};
