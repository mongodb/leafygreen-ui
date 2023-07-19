import fs from 'fs';
import path from 'path';

export interface LGConfig {
  scopes: Record<string, string>;
}

export const LGConfigFileName = 'lg.config.json';

export const getLGConfig = (): LGConfig => {
  const rootDir = process.cwd();
  const lgConfigPath = path.resolve(rootDir, LGConfigFileName);

  // Check if an lg.json exists
  if (!fs.existsSync(lgConfigPath)) {
    throw new Error(`${LGConfigFileName} file not found`);
  }

  const lgConfig = JSON.parse(fs.readFileSync(lgConfigPath, 'utf-8'));
  return lgConfig as LGConfig;
};
