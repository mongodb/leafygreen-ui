const nodeModulesThatNeedToBeParsedBecauseTheyExposeES6 = [
  '@tanstack[\\\\/]react-table',
  '@tanstack[\\\\/]table-core',
];

module.exports = {
  stories: [
    '../**/*.story.@(mdx|js|jsx|ts|tsx)',
    '../**/*.stories.@(mdx|js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react',
  core: {
    disableTelemetry: true,
  },
  staticDirs: ['./static'],
  webpackFinal: config => {
    // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    const fileLoaderRule = config.module.rules.find(
      rule => rule.test && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.map(rule => {
      if (rule.test.toString() !== String(/\.js$/)) return rule;

      const include = new RegExp(
        `[\\\\/]node_modules[\\\\/](${nodeModulesThatNeedToBeParsedBecauseTheyExposeES6.join(
          '|',
        )})`,
      );

      if (Array.isArray(rule.include)) {
        rule.include.push(include);
      } else {
        rule.include = [rule.include, include].filter(Boolean);
      }

      return rule;
    });

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });

    return config;
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};
