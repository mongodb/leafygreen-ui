import {
  esmConfig,
  storiesConfig,
  umdConfig,
} from '@lg-tools/build/config/rollup.config.mjs';
import fs from 'fs';
import path from 'path';

/**
 *
 * @returns An array of all generated glyphs
 */
function getGeneratedFiles() {
  const directory = path.resolve(process.cwd(), 'src/generated');

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter(file => /\.tsx?$/.test(file))
    .map(file => path.resolve(directory, file));
}

// Create both ESM and UMD builds for each icon
const iconConfigs = [esmConfig, umdConfig].flatMap(config =>
  getGeneratedFiles().map(file => ({
    ...config,
    input: `src/generated/${path.basename(file)}`,
    output: {
      ...config.output,
      name: `${path.basename(file, path.extname(file))}.js`,
    },
  })),
);

export default [esmConfig, umdConfig, storiesConfig, ...iconConfigs];
