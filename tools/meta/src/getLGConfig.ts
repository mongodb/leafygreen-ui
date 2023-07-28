import fse from 'fs-extra';
import path from 'path';

export interface LGConfig {
  scopes: Record<string, string>;
}

export const LGConfigFileName = 'lg.json';

/**
 *
 * @returns The LG config object for the current repository
 */
export const getLGConfig = (): LGConfig => {
  const rootDir = process.cwd();
  const lgConfigPath = path.resolve(rootDir, LGConfigFileName);

  // Check if an lg.json exists
  if (!fse.existsSync(lgConfigPath)) {
    throw new Error(`${LGConfigFileName} file not found`);
  }

  const lgConfig = JSON.parse(fse.readFileSync(lgConfigPath, 'utf-8'));
  return lgConfig as LGConfig;
};
