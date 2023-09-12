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
            from: path.resolve(__dirname, '../src/assets'),
            to: path.resolve(__dirname, '../storybook-static/assets'),
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
    './leafygreen-provider': '/packages/leafygreen-provider/src/index.ts',
  },
  shared: {
    react: {
        singleton: true,
        requiredVersion: '^17.0.2'
    },
    'react-dom': {
        singleton: true,
        requiredVersion: '^17.0.2'
    }
  }
};

module.exports = withStorybookModuleFederation(storybookModuleFederationConfig)(
  storybookConfig,
);
