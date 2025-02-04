import type { StorybookConfig } from '@storybook/react-webpack5';
import isRegExp from 'lodash/isRegExp';
import isUndefined from 'lodash/isUndefined';
import path from 'path';
import { ProvidePlugin, RuleSetRule } from 'webpack';

function isRule(rule: any): rule is RuleSetRule {
  return rule !== '...' && typeof rule === 'object' && !isUndefined(rule);
}

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },

  addons: [
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-essentials', // actions, controls & docs
    '@lg-tools/storybook-addon',
  ],

  // stories: ['../{packages,tools,charts,chat}/**/*.stor@(y|ies).@(js|ts)?(x)'],
  stories: ['../packages/button/**/*.stor@(y|ies).@(js|ts)?(x)'],

  typescript: {
    check: false,
    checkOptions: {},
    skipCompiler: false,
    reactDocgen: 'react-docgen',
  },

  docs: {
    autodocs: false,
  },

  webpackFinal: config => {
    config.module = config.module ?? {};
    config.module.rules = config.module.rules ?? [];
    config.plugins = config.plugins ?? [];
    config.resolve = config.resolve ?? {};

    // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    // We want to override this for svg
    const fileLoaderRule = config.module.rules.find(
      rule => isRule(rule) && isRegExp(rule.test) && rule?.test.test('.svg'),
    ) as RuleSetRule | undefined;

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
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
          },
        },
      ],
    });

    // Required for Webpack 5:
    // BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
    // This is no longer the case. Verify if you need this module and configure a polyfill for it.
    config.resolve.fallback = {
      buffer: require.resolve('buffer'),
      constants: false,
      fs: false,
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      tty: require.resolve('tty-browserify'),
    };

    config.plugins.push(
      // @ts-ignore - webpack TS can of worms
      new ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    );

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }

    return config;
  },

  // webpackFinal: config => {
  //   config.plugins = config.plugins ?? [];

  //   if (config.resolve) {
  //     config.resolve.alias = {
  //       ...config.resolve.alias,
  //       '@': path.resolve(__dirname, '../src'),
  //     };
  //   }

  //   config.plugins.push(
  //     // @ts-ignore - webpack TS can of worms
  //     new ProvidePlugin({
  //       process: 'process/browser',
  //       Buffer: ['buffer', 'Buffer'],
  //     }),
  //   );

  //   return config;
  // },
};

export default config;
