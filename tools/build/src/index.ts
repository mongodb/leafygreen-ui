import { spawn } from 'child_process';
export { buildTSDoc } from './tsdoc/build-tsdoc';
export { parseTSDoc } from './tsdoc/tsdocParser';
export { buildPackage } from './rollup/build-package';
export { buildTypescript } from './typescript/build-ts';

interface BuildOptions {
  only: Array<string>;
  verbose: boolean;
}

const validSteps = ['build', 'tsc', 'docs'];

export function build(
  packages: Array<string>,
  { only, verbose }: BuildOptions,
) {
  console.log({ packages, only });

  const steps = only ? only.filter(s => validSteps.includes(s)) : validSteps;

  spawn('turbo', ['run', ...steps], {
    stdio: 'inherit',
  });
}
