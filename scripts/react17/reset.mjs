/* eslint-disable no-console */

/**
 * This file resets all changes made by the init.mjs script
 * to restore the repository to its original React 18 state
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../..');

// Check for verbose flag
const isVerbose =
  process.argv.includes('--verbose') || process.argv.includes('-v');

async function main() {
  console.log('🔄 Resetting React 17 environment changes');

  if (isVerbose) {
    console.log('📝 Verbose mode enabled - showing detailed output');
  }

  // Step 1: Reset root package.json
  console.log('1️⃣ Resetting package.json...');
  await resetFile('package.json');

  // Step 2: Reset pnpm-lock.yaml if it exists
  console.log('2️⃣ Resetting pnpm-lock.yaml...');
  await resetFile('pnpm-lock.yaml');

  // Step 3: Reset all tsconfig.json files in package directories
  console.log('3️⃣ Resetting TypeScript configurations...');
  await resetTsConfigFiles();

  console.log('✅ React 17 environment reset complete!');
}

/**
 * Reset a specific file using git checkout
 * @param {string} fileName - The file name to reset
 */
async function resetFile(fileName) {
  // Check if file is actually modified
  if (!isFileModified(fileName)) {
    if (isVerbose) {
      console.log(`\t ✓ ${fileName} (no changes)`);
    }
    return;
  }

  try {
    const cmd = `git checkout HEAD -- ${fileName}`;
    if (isVerbose) {
      console.log(`\t \x1b[90m${cmd}\x1b[0m`);
    }

    execSync(cmd, {
      cwd: ROOT_DIR,
      stdio: isVerbose ? 'inherit' : 'pipe',
    });

    if (isVerbose) {
      console.log(`\t ✓ Reset ${fileName}`);
    }
  } catch (error) {
    // File might not be tracked or might not exist, which is fine
    console.log(
      `\t ⚠️  Could not reset ${fileName} (might not be tracked or might not exist)`,
    );
    if (isVerbose) {
      console.log(`\t    Error: ${error.message}`);
    }
  }
}

/**
 * Check if a file is modified in git
 * @param {string} filePath - The relative path to check
 * @returns {boolean} True if the file is modified
 */
function isFileModified(filePath) {
  try {
    const output = execSync(`git status --porcelain -- "${filePath}"`, {
      cwd: ROOT_DIR,
      stdio: 'pipe',
      encoding: 'utf8',
    });
    return output.trim().length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Get all modified tsconfig.json files
 * @returns {Array<string>} Array of modified tsconfig.json file paths
 */
function getModifiedTsConfigFiles() {
  try {
    const output = execSync('git status --porcelain', {
      cwd: ROOT_DIR,
      stdio: 'pipe',
      encoding: 'utf8',
    });

    return output
      .split('\n')
      .filter(line => line.trim().length > 0)
      .filter(line => line.includes('tsconfig.json'))
      .map(line => line.slice(3).trim()); // Remove git status prefix (e.g., " M ")
  } catch (error) {
    return [];
  }
}

/**
 * Find and reset all tsconfig.json files in package directories
 */
async function resetTsConfigFiles() {
  const allTsConfigPaths = findTsConfigFiles(ROOT_DIR);
  const modifiedTsConfigFiles = getModifiedTsConfigFiles();

  console.log(
    `\t Found ${modifiedTsConfigFiles.length} modified tsconfig.json files`,
  );

  if (modifiedTsConfigFiles.length === 0) {
    console.log('\t ✓ No tsconfig.json files need to be reset');
    return;
  }

  console.log('\t Resetting modified files...');

  let processed = 0;
  let errors = 0;

  for (const modifiedFile of modifiedTsConfigFiles) {
    try {
      resetFile(modifiedFile);
      processed++;
    } catch (error) {
      console.log(`\t ⚠️  Could not reset ${modifiedFile}`);
      if (isVerbose) {
        console.log(`\t    Error: ${error.message}`);
      }
      errors++;
      processed++;
    }
  }

  if (errors > 0) {
    console.log(
      `\t ✓ Reset ${processed - errors} tsconfig.json files (${errors} errors)`,
    );
  } else {
    console.log(`\t ✓ Reset ${processed} tsconfig.json files`);
  }
}

/**
 * Find tsconfig.json files only in root package directories (packages, charts, chat, tools)
 * Skip nested directories like scripts, src, etc. to avoid modifying non-package configs
 * @param {string} dir - The directory to search in
 * @returns {Array<string>} Array of tsconfig.json file paths
 */
function findTsConfigFiles(dir) {
  /** @type {Array<string>} */
  const results = [];
  const packageDirs = ['packages', 'charts', 'chat', 'tools'];

  for (const packageDir of packageDirs) {
    const packagePath = path.join(dir, packageDir);

    if (!fs.existsSync(packagePath)) {
      continue;
    }

    try {
      const packages = fs.readdirSync(packagePath);

      for (const pkg of packages) {
        const pkgPath = path.join(packagePath, pkg);
        const stat = fs.statSync(pkgPath);

        if (stat.isDirectory()) {
          const tsConfigPath = path.join(pkgPath, 'tsconfig.json');

          if (fs.existsSync(tsConfigPath)) {
            results.push(tsConfigPath);
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Failed to read directory ${packagePath}:`, error);
    }
  }

  return results;
}

// Run the script
main().catch(error => {
  console.error('❌ Reset script failed:', error);
  process.exit(1);
});
