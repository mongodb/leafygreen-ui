/* eslint-disable no-console */
import chalk from 'chalk';
import { sync as spawnSync } from 'cross-spawn';
import fse from 'fs-extra';
import path from 'path';

export const findRollupConfigFile = (
  packageName?: string,
  options?: { verbose?: boolean },
) => {
  const packageDir = process.cwd();
  const workspaceRoot = getRepositoryRoot();
  const buildPackageDir = getBuildPackageDir(__dirname);

  const packageRollupConfigPath = path.join(packageDir, 'rollup.config.mjs');
  const repoRollupConfigPath = path.join(workspaceRoot, 'rollup.config.mjs');
  const defaultRollupConfigPath = path.join(
    buildPackageDir,
    './config/rollup.config.mjs',
  );

  if (fse.existsSync(packageRollupConfigPath)) {
    options?.verbose &&
      console.log(
        chalk.bgGray.blackBright(
          `Building ${chalk.bold(packageName)} using local rollup config.`,
        ),
        chalk.gray(packageRollupConfigPath),
      );

    return packageRollupConfigPath;
  }

  if (fse.existsSync(repoRollupConfigPath)) {
    options?.verbose &&
      console.log(
        chalk.gray(`Building using repository level rollup config:`),
        chalk.gray(repoRollupConfigPath),
      );

    return repoRollupConfigPath;
  }

  return defaultRollupConfigPath;
};

// redeclaring `getRepositoryRoot` to avoid circular dependency with `@lg-tools/meta`
export const getRepositoryRoot = (): string => {
  try {
    const result = spawnSync('git', ['rev-parse', '--show-toplevel'], {
      stdio: 'pipe',
    });

    const { stdout } = result;
    return stdout.toString().trim();
  } catch (err) {
    console.error(err);
    return '';
  }
};

export const getBuildPackageDir = (startDir: string): string => {
  let currentDir = startDir;

  while (currentDir !== '/') {
    const packageJsonPath = path.join(currentDir, 'package.json');

    if (fse.existsSync(packageJsonPath)) {
      return currentDir;
    }

    // Move up one directory
    currentDir = path.dirname(currentDir);
  }

  return '/';
};
