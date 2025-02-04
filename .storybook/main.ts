import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },
  addons: ['@lg-tools/storybook-addon'],
  stories: [
    '../{packages,tools,charts,chat}/**/*.stor@(y|ies).@(js|ts)?(x)',
    '../{packages,tools,charts,chat}/*/node_modules',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    skipCompiler: false,
    reactDocgen: 'react-docgen',
  },
};

export default config;
