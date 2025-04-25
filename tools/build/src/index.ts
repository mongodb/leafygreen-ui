import spawn from 'cross-spawn';

export { buildAll as build } from './buildAll';
export { buildPackage } from './rollup/build-package';
export { buildTSDoc } from './tsdoc/build-tsdoc';
export { parseTSDoc } from './tsdoc/tsdocParser';
export { buildTypescript } from './typescript/build-ts';
export { runTypescriptDownlevel } from './typescript/downlevel';

interface BuildOptions {
  only: Array<string>;
  verbose: boolean;
}

const validSteps = ['build', 'tsc', 'docs'];

export function buildAll(packages: Array<string>, { only }: BuildOptions) {
  console.log({ packages, only });

  const steps = only ? only.filter(s => validSteps.includes(s)) : validSteps;

  spawn('turbo', ['run', ...steps], {
    stdio: 'inherit',
  });
}
