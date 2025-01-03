/**
 * In this file we create default values for storybook `main.ts` properties
 */

import type { StorybookConfig } from '@storybook/react-webpack5';
import isRegExp from 'lodash/isRegExp';
import { ProvidePlugin, RuleSetRule } from 'webpack';

import { findStories } from './findStories';
import { isRule } from './utils';

export { managerHead } from './manager-head';
export { previewHead } from './preview-head';

// @ts-expect-error https://github.com/storybookjs/storybook/issues/23624
export const stories: StorybookConfig['stories'] = findStories(
  '../{packages,tools,charts,chat}/**/*.stor@(y|ies).@(js|ts)?(x)',
  '../{packages,tools,charts,chat}/*/node_modules',
);

export const addons: StorybookConfig['addons'] = [
  '@storybook/addon-essentials', // actions, controls & docs
  '@storybook/addon-links',
  '@storybook/addon-interactions',
  '@storybook/addon-a11y',
  'storybook-dark-mode',
];

export const framework: StorybookConfig['framework'] = {
  name: '@storybook/react-webpack5',
  options: {
    fastRefresh: true,
    strictMode: true,
  },
};

export const core: StorybookConfig['core'] = {
  disableTelemetry: true,
};

export const staticDirs: StorybookConfig['staticDirs'] = [
  './static',
  '../node_modules/@lg-tools/storybook-addon/static',
];

export const webpackFinal: StorybookConfig['webpackFinal'] = config => {
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
    new ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  );

  return config;
};

export const typescript: StorybookConfig['typescript'] = {
  check: false,
};

export const docs: StorybookConfig['docs'] = {
  autodocs: false,
};
