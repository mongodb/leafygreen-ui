/* eslint-disable no-console */
import { MergedRollupOptions, rollup } from 'rollup';

import { GENERATED_DIR } from './constants';

async function getBatchBuildOptions(
  batch: Array<string>,
): Promise<Array<MergedRollupOptions>> {
  const { constructUMDGlobalName } = await import(
    '@lg-tools/build/config/utils/constructUMDGlobalName.mjs'
  );

  const { nodeExternals } = await import('rollup-plugin-node-externals');

  const { esmConfig, umdConfig } = await import(
    '@lg-tools/build/config/rollup.config.mjs'
  );

  return [
    // ESM build can take an array of input files
    {
      ...esmConfig,
      input: batch.map(icon => `${GENERATED_DIR}/${icon}.tsx`),
      output: [esmConfig.output],
      plugins: [
        // Ensure @emotion packages are externalized (not bundled into icons)
        nodeExternals({ deps: true, include: [/@emotion/] }),
        ...esmConfig.plugins,
      ],
    },
    // UMD builds need a single input file
    ...batch.map(iconName => {
      return {
        ...umdConfig,
        input: `${GENERATED_DIR}/${iconName}.tsx`,
        output: [
          {
            ...umdConfig.output,
            name: constructUMDGlobalName('icon', iconName),
            dir: `dist/umd`,
          },
        ],
        plugins: [
          // Ensure @emotion packages are externalized (not bundled into icons)
          nodeExternals({ deps: true, include: [/@emotion/] }),
          ...umdConfig.plugins,
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
