import { ProvidePlugin } from 'webpack';

const nodeModulesThatNeedToBeParsedBecauseTheyExposeES6 = [
  '@tanstack[\\\\/]react-table',
  '@tanstack[\\\\/]table-core',
];

const config = {
  stories: [
    '../!(node_modules)/**/*.story.@(mdx|js|jsx|ts|tsx)',
    '../!(node_modules)/**/*.stories.@(mdx|js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ['./static'],

  babel: async options => {
    return {
      ...options,
      presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
      ],
    };
  },

  webpackFinal: config => {
    // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    const fileLoaderRule = config?.module?.rules.find(
      rule => rule?.test && rule?.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.map(rule => {
      if (rule.test?.toString() !== String(/\.js$/)) return rule;
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

    // Required for Webpack 5
    config.resolve.fallback = {
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    };
    config.plugins.push(
      new ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    );
    //

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
  docs: {
    autodocs: false,
    source: { type: 'code' },
  },
};

export default config;
