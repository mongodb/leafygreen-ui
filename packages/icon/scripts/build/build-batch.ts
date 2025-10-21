/* eslint-disable no-console */
import { MergedRollupOptions, rollup } from 'rollup';

import { GENERATED_DIR } from './constants';

async function getBatchBuildOptions(
  batch: Array<string>,
): Promise<Array<MergedRollupOptions>> {
  const { constructUMDGlobalName, createConfigForFormat } = await import(
    '@lg-tools/build/config/utils/index.mjs'
  );

  const { esmConfig, umdConfig } = await import(
    '@lg-tools/build/config/rollup.config.mjs'
  );

  return [
    // ESM build can take an array of input files
    createConfigForFormat('esm', {
      input: batch.map(icon => `${GENERATED_DIR}/${icon}.tsx`),
      output: [esmConfig.output],
    }),
    // UMD builds need a single input file
    ...batch.map(iconName => {
      return createConfigForFormat('umd', {
        input: `${GENERATED_DIR}/${iconName}.tsx`,
        output: [
          {
            ...umdConfig.output,
            name: constructUMDGlobalName('icon', iconName),
            dir: `dist/umd`,
          },
        ],
      });
    }),
  ];
}

/**
 * Runs the Rollup build command for a batch of icons.
 */
export async function buildBatch(
  batch: Array<string>,
  verbose = false,
): Promise<void> {
  verbose && console.log('Building batch', batch);
  try {
    const rollupConfigs = await getBatchBuildOptions(batch);

    for (const config of rollupConfigs) {
      const bundle = await rollup(config);

      await Promise.all(config.output.map(bundle.write));
      await bundle.close();
    }
  } catch (e) {
    console.error(
      `Error building icon batch including: ${batch.join(', ')}\n`,
      e,
    );
  }
}
