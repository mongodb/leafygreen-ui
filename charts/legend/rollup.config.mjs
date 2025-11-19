import defaultConfig, {
  esmConfig,
  umdConfig,
} from '@lg-tools/build/config/rollup.config.mjs';

const esmConstantsConfig = {
  ...esmConfig,
  // remove terser plugin
  plugins: [...esmConfig.plugins.filter(plugin => plugin.name !== 'terser')],
};
const umdConstantsConfig = {
  ...umdConfig,
  // remove terser plugin
  plugins: [...umdConfig.plugins.filter(plugin => plugin.name !== 'terser')],
};

export default [...defaultConfig, esmConstantsConfig, umdConstantsConfig];
