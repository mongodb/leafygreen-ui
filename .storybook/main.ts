import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },

  addons: [
    '@lg-tools/storybook-addon',
    '@storybook/addon-webpack5-compiler-babel',
  ],

  // stories: [
  //   '../{packages,tools,charts,chat}/**/*.stor@(y|ies).@(js|ts)?(x)',
  //   '../{packages,tools,charts,chat}/*/node_modules',
  // ],

  stories: ['../packages/button/**/*.stories.@(js|jsx|ts|tsx)'],

  typescript: {
    check: false,
    checkOptions: {},
    skipCompiler: false,
    reactDocgen: 'react-docgen',
  },

  docs: {
    autodocs: true,
  },

  webpackFinal: config => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }

    return config;
  },
};

export default config;
