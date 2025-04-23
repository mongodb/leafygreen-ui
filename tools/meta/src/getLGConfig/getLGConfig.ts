/* eslint-disable no-console */
import { getPackageJson } from '../getPackageJson';
import { getRootPackageJson } from '../getRootPackageJson';

export interface LGConfig {
  scopes: Record<string, string>;
}

/**
 * @returns The LG config object for the current repository
 */
export const getLGConfig = (dir?: string): LGConfig => {
  // If a directory is provided, use it to resolve the package.json
  const packageJson = dir ? getPackageJson(dir) : getRootPackageJson();

  // Check if an package.json exists
  if (!packageJson) {
    throw new Error(`\`package.json\` file not found`);
  }

  if (!packageJson.lg) {
    console.log(packageJson);
    throw new Error(`\`lg\` property not found in \`package.json\``);
  }

  return packageJson.lg as LGConfig;
};
