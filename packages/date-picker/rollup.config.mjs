import {
  esmConfig,
  storiesConfig,
  umdConfig,
} from '@lg-tools/build/config/rollup.config.mjs';

const utilsConfig = [esmConfig, umdConfig].map(config => ({
  ...config,
  input: 'src/utils/index.ts',
}));

const hooksConfig = [esmConfig, umdConfig].map(config => ({
  ...config,
  input: 'src/hooks/index.ts',
}));

const config = [esmConfig, umdConfig, ...utilsConfig, ...hooksConfig];

export default config;
