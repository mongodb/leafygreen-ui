/**
 * In this file we create default values for storybook `main.ts` properties
 */
import { getLGConfig } from '@lg-tools/meta';
import { findStories } from '@lg-tools/storybook-utils';
import type { StorybookConfig } from '@storybook/react-webpack5';
import isRegExp from 'lodash/isRegExp';
import {
  NormalModuleReplacementPlugin,
  ProvidePlugin,
  RuleSetRule,
} from 'webpack';

import { isRule } from './utils';

export { managerHead } from './manager-head';
export { previewHead } from './preview-head';

const { scopes } = getLGConfig();
const directories = Object.values(scopes);

export const stories: StorybookConfig['stories'] = findStories({
  includePattern: [
    `../{${directories.join(',')}}/**/*.stor@(y|ies).@(js|ts)?(x)`,
  ],
  excludePattern: [`../**/node_modules`],
});

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
  config.resolveLoader = config.resolveLoader || {};

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
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer'),
    crypto: require.resolve('crypto-browserify'),
    events: require.resolve('events'),
    fs: false,
    os: require.resolve('os-browserify/browser'),
    path: require.resolve('path-browserify'),
    process: require.resolve('process/browser'), // Make sure process polyfill is included
    stream: require.resolve('stream-browserify'),
    string_decoder: require.resolve('string_decoder'),
    tty: require.resolve('tty-browserify'),
    url: require.resolve('url'),
    util: require.resolve('util'),
  };

  config.plugins.push(
    // @ts-ignore - webpack TS can of worms
    new ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  );

  // Add support for "node:" protocol URIs
  config.plugins.push(
    new NormalModuleReplacementPlugin(/^node:/, resource => {
      resource.request = resource.request.replace(/^node:/, '');
    }),
  );

  return config;
};

export const typescript: StorybookConfig['typescript'] = {
  reactDocgen: 'react-docgen',
  check: false,
};

export const docs: StorybookConfig['docs'] = {
  autodocs: true,
};
