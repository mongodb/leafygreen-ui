import fsx from 'fs-extra';
import path from 'path';

/**
 * Gets a list of available codemods by scanning the codemods directory
 */
export async function getAvailableCodemods(): Promise<Array<string>> {
  try {
    // Note: when this is built, __dirname is `dist`
    const codemodDir = path.join(__dirname, './codemods');

    // Make sure the directory exists
    if (!fsx.existsSync(codemodDir)) {
      return [];
    }

    // Get all subdirectories in the codemods directory
    const dirs = fsx
      .readdirSync(codemodDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    return dirs;
  } catch (error) {
    console.error('Error listing codemods:', error);
    return [];
  }
}
