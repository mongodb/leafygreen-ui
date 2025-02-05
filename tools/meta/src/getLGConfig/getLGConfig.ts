import { getPackageJson } from '../getPackageJson';

export interface LGConfig {
  scopes: Record<string, string>;
}

/**
 * @returns The LG config object for the current repository
 */
export const getLGConfig = (dir?: string): LGConfig => {
  const rootDir = dir ?? process.cwd();
  const packageJson = getPackageJson(rootDir);

  // Check if an package.json exists
  if (!packageJson) {
    throw new Error(`\`package.json\` file not found`);
  }

  if (!packageJson.lg) {
    throw new Error(`\`lg\` property not found in \`package.json\``);
  }

  return packageJson.lg as LGConfig;
};
