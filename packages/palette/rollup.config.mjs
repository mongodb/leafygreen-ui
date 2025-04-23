import urlPlugin from '@rollup/plugin-url';
import {
  esmConfig,
  umdConfig,
  storiesConfig,
} from '@lg-tools/build/config/rollup.config.mjs';

export default [
  {
    ...esmConfig,
    plugins: [
      ...esmConfig.plugins,
      urlPlugin({
        limit: 0,
        include: ['**/*.less'],
        fileName: '[name][extname]',
      }),
    ],
  },
  {
    ...umdConfig,
    plugins: [
      ...esmConfig.plugins,
      urlPlugin({
        limit: 0,
        include: ['**/*.less'],
        fileName: '[name][extname]',
      }),
    ],
  },
  storiesConfig,
];
