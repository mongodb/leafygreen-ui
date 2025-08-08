import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';
import { DELIMITER } from './constants.mjs';

const iconsEnv = process.env.ICONS || '';
const iconNames = iconsEnv.split(DELIMITER);

const iconConfigs = [esmConfig, umdConfig].flatMap(config =>
  iconNames.map(name => ({
    ...config,
    input: `src/generated/${name}.tsx`,
    output: {
      ...config.output,
      name: `${name}.js`,
    },
  })),
);

export default iconConfigs;
