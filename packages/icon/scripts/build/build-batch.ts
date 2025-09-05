/* eslint-disable no-console */
import { MergedRollupOptions, rollup } from 'rollup';
import { GENERATED_DIR } from './constants';

async function getBatchBuildOptions(
  batch: Array<string>,
): Promise<Array<MergedRollupOptions>> {
  const { esmConfig, umdConfig } = await import(
    '@lg-tools/build/config/rollup.config.mjs'
  );

  return [
    // ESM build can take an array of input files
    {
      ...esmConfig,
      input: batch.map(icon => `${GENERATED_DIR}/${icon}.tsx`),
      output: [esmConfig.output],
    },
    // UMD builds need a single input file
    ...batch.map(icon => {
      return {
        ...umdConfig,
        input: `${GENERATED_DIR}/${icon}.tsx`,
        output: [
          {
            ...umdConfig.output,
            name: `LeafyGreen_${icon}Icon`,
            dir: `dist/umd`,
          },
        ],
      };
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
  try {
    const rollupConfigs = await getBatchBuildOptions(batch);

    for (const config of rollupConfigs) {
      const bundle = await rollup(config);

      if (verbose) {
        console.log(bundle.watchFiles);
      }

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
