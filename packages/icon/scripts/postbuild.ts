/* eslint-disable no-console */
import fs from 'fs-extra';
import path from 'path';

// Since the icons are currently bundled together without code-splitting,
// output each UMD build separately at the dist root to allow consumers
// to import only the icons they need.
async function copyUmdToDist(): Promise<void> {
  const sourceDir = path.resolve(process.cwd(), 'dist/umd');
  const targetDir = path.resolve(process.cwd(), 'dist');

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

copyUmdToDist();
