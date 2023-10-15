const path = require('path');
const {
  withStorybookModuleFederation,
} = require('storybook-module-federation');
const CopyPlugin = require('copy-webpack-plugin');
const ProvidePlugin = require('webpack').ProvidePlugin;
const storybookConfig = {
  framework: '@storybook/web-components-webpack5',
  stories: [
    '../stories/*.stories.mdx',
    '../packages/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    '@storybook/theming',
  ],
  core: {
    builder: 'webpack5',
    options: {
      fsCache: false,
    },
  },
  features: {
    storyStoreV7: false,
  },
  webpackFinal: async (config, { configType }) => {
    config.output.filename = 'dtk/' + config.output.filename;
    const webComponentsRule = config.module.rules.find(
      rule => rule.use && rule.use.options && rule.use.options.babelrc === true,
    );

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: [{ loader: 'url-loader' }],
      include: path.resolve(__dirname, '../', 'node_modules'),
    });

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../src/assets/global.css'),
            to: path.resolve(__dirname, '../storybook-static/assets/global.css'),
          },
        ],
      }),
      new ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new ProvidePlugin({
        process: 'process/browser',
      }),
    );

    config.resolve = {
      ...config.resolve,
      fallback: {
        ...(config.resolve || {}).fallback,
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
      },
    };

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../', 'node_modules'),
    });
    return config;
  },
};

const storybookModuleFederationConfig = {
  name: 'storybook',
  filename: 'dtk/remoteEntry.js',
  exposes: {
    './BaseStyles': '/src/assets/global.css',
    './Button': '/packages/button/src/Button/Button.tsx',
    './Select': '/packages/select/src/Select.tsx',
    './Popover': '/packages/popover/src/Popover.tsx',
    './Modal': '/packages/modal/src/index.ts',
    './Badge': '/packages/badge/src/index.ts',
    './Icon': '/packages/icon/src/Icon.tsx',
    './Typography': '/packages/typography/src/index.ts',
    './LoadingIndicator': '/packages/loading-indicator/src/index.ts',
    './Banner': '/packages/banner/src/index.ts',
    './Box': '/packages/box/src/index.ts',
    './Callout': '/packages/callout/src/index.ts',
    './Card': '/packages/card/src/index.ts',
    './Checkbox': '/packages/checkbox/src/index.ts',
    './Code': '/packages/code/src/index.ts',
    './Combobox': '/packages/combobox/src/index.ts',
    './ConfirmationModal': '/packages/confirmation-modal/src/index.ts',
    './Copyable': '/packages/copyable/src/index.ts',
    './Emotion': '/packages/emotion/src/index.ts',
    './EmptyState': '/packages/empty-state/src/index.ts',
    './ExpandableCard': '/packages/expandable-card/src/index.ts',
    './FormFooter': '/packages/form-footer/src/index.ts',
    './GuideCue': '/packages/guide-cue/src/index.ts',
    './IconButton': '/packages/icon-button/src/index.ts',
    './InlineDefinition': '/packages/inline-definition/src/index.ts',
    './InputOptional': '/packages/input-optional/src/index.ts',
    './Logo': '/packages/logo/src/index.ts',
    './MarketingModal': '/packages/marketing-modal/src/index.ts',
    './Menu': '/packages/menu/src/index.ts',
    './SideNav': '/packages/side-nav/src/index.ts',
    './leafygreen-provider': '/packages/leafygreen-provider/src/index.ts',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^17.0.2',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^17.0.2',
    },
  },
};

module.exports = withStorybookModuleFederation(storybookModuleFederationConfig)(
  storybookConfig,
);
