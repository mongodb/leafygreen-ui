/* eslint-disable no-console */
import { exitWithErrorMessage } from '@lg-tools/meta';
import fse from 'fs-extra';
import path from 'path';

import { TestCommandOptions } from '..';

/** Returns the correct Jest config file path */
export function getConfigFile(options: TestCommandOptions): string {
  const rootDir = process.cwd();
  const { verbose, config: configParam, react17 } = options;

  if (configParam && fse.existsSync(configParam)) {
    return configParam; // Use the parameter if it exists
  }

  const localConfigFile = path.resolve(rootDir, 'jest.config.js');
  const defaultConfigFile = path.resolve(
    rootDir,
    'tools/test/config/jest.config.js',
  );
  const react17ConfigFile = path.resolve(
    rootDir,
    'tools/test/config/react17/jest.config.js',
  );

  if (react17) {
    if (fse.existsSync(react17ConfigFile)) {
      console.log('Using React 17 test config');
      verbose && console.log(react17ConfigFile);
      return react17ConfigFile; // If react17 flag was used, use that config
    } else {
      exitWithErrorMessage(
        `No React17 test config found. Reading ${react17ConfigFile}`,
      );
    }
  }

  if (fse.existsSync(localConfigFile)) {
    return localConfigFile; // otherwise look for a config at the root
  }

  return defaultConfigFile; // fallback to the default config
}
