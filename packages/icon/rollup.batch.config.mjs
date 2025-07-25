import { esmConfig, umdConfig } from '@lg-tools/build/config/rollup.config.mjs';

const iconsEnv = process.env.ICONS || '';

const iconNames = iconsEnv.split('|');

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

export default iconNames.length ? iconConfigs : [];
