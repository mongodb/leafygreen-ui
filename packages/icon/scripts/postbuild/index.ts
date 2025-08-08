/* eslint-disable no-console */
import fs from 'fs-extra';
import path from 'path';

async function copy(sourceDir: string, targetDir: string): Promise<void> {
  try {
    if (!(await fs.pathExists(sourceDir))) {
      console.error(`Source directory does not exist: ${sourceDir}`);
      return;
    }

    console.log(`Copying files from ${sourceDir} to ${targetDir}.`);
    await fs.copy(sourceDir, targetDir, { overwrite: true });
    console.log('Copy completed successfully.');
  } catch (error) {
    console.error('Error while copying files:', error);
  }
}

/**
 * Keeps backward compatibility for imports like 'leafygreen-ui/icon/dist/MyIconName'.
 */
const sourceDir = path.resolve(process.cwd(), 'dist/umd');
const targetDir = path.resolve(process.cwd(), 'dist');

copy(sourceDir, targetDir);
