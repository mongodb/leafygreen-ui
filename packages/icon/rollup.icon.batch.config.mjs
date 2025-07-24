import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';
import path from 'path';

const iconsEnv = process.env.ICONS || '';

const iconNames = iconsEnv.split(',').filter(Boolean);

export function getBatchIconConfig(names) {
  const inputs = names.map(name => path.resolve(`src/generated/${name}.tsx`));

  return [esmConfig, umdConfig].map(config => ({
    ...config,
    input: inputs,
    output: {
      ...config.output,
      //   dir: config.output.dir || 'dist/',
    },
  }));
}

export default iconNames.length ? getBatchIconConfig(iconNames) : [];
