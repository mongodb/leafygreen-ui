/* eslint-disable no-console */
import { spawn } from 'cross-spawn';

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
