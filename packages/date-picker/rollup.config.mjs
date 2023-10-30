import {
  esmConfig,
  storiesConfig,
  umdConfig,
} from '@lg-tools/build/config/rollup.config.mjs';

const sharedConfig = [esmConfig, umdConfig].map(config => ({
  ...config,
  input: 'src/shared/index.ts',
}));

const config = [esmConfig, umdConfig, ...sharedConfig];

export default config;
