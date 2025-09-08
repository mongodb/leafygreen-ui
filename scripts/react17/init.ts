/* eslint-disable no-console */
import { sync as spawnSync } from 'cross-spawn';
import fs from 'fs';
import { defaultsDeep } from 'lodash';
import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '../..');
const R17_PACKAGES_PATH = path.join(__dirname, 'r17-packages.json');
const R17_TSCONFIG_PATH = path.join(__dirname, 'r17-tsconfig.json');
const ROOT_PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');
const PNPM_LOCK_PATH = path.join(ROOT_DIR, 'pnpm-lock.yaml');
const NODE_MODULES_PATH = path.join(ROOT_DIR, 'node_modules');

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  pnpm?: {
    overrides?: Record<string, string>;
  };
  [key: string]: any;
}

interface TsConfig {
  compilerOptions?: {
    baseUrl?: string;
    rootDir?: string;
    outDir?: string;
    declarationDir?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

async function main() {
  console.log('⚛️ Initializing React 17 environment');

  // Step 1: Remove pnpm-lock.yaml
  console.log('1️⃣ Removing pnpm-lock.yaml...');
  if (fs.existsSync(PNPM_LOCK_PATH)) {
    fs.unlinkSync(PNPM_LOCK_PATH);
  } else {
    console.log('pnpm-lock.yaml not found, skipping');
  

  // Step 2: Update package.json versions
  console.log('2️⃣ Updating package.json...');
  await mergePackageVersions();

  // Step 3: Update tsconfig files
  console.log('3️⃣ Updating TypeScript configurations...');
  await mergeTsConfigs();

  console.log('⚛️ React 17 environment setup complete!');
}

/**
 * Find tsconfig.json files only in root package directories (packages, charts, chat, tools)
 * Skip nested directories like scripts, src, etc. to avoid modifying non-package configs
 */
function findTsConfigFiles(dir: string): Array<string> {
  const results: Array<string> = [];
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

async function mergePackageVersions() {
  // Read the React 17 package configuration
  const r17Package: PackageJson = JSON.parse(
    fs.readFileSync(R17_PACKAGES_PATH, 'utf-8'),
  );

  // Read the root package.json
  const rootPackage: PackageJson = JSON.parse(
    fs.readFileSync(ROOT_PACKAGE_JSON_PATH, 'utf-8'),
  );

  // Merge dependencies - keep existing versions, add new ones from r17
  if (r17Package.dependencies) {
    rootPackage.devDependencies = defaultsDeep(
      {},
      r17Package.dependencies,
      rootPackage.devDependencies,
    );
  }

  // Merge pnpm overrides
  if (r17Package.pnpm?.overrides) {
    rootPackage.pnpm = defaultsDeep({}, r17Package.pnpm, rootPackage.pnpm);
  }

  // Write the updated package.json
  fs.writeFileSync(
    ROOT_PACKAGE_JSON_PATH,
    JSON.stringify(rootPackage, null, 2) + '\n',
  );
}

async function mergeTsConfigs() {
  // Read the React 17 tsconfig configuration
  const r17TsConfig: TsConfig = JSON.parse(
    fs.readFileSync(R17_TSCONFIG_PATH, 'utf-8'),
  );

  // Find all package tsconfig.json files
  const tsConfigPaths = findTsConfigFiles(ROOT_DIR);

  console.log(`\t Found ${tsConfigPaths.length} tsconfig.json files to update`);

  for (const tsConfigPath of tsConfigPaths) {
    try {
      // Skip root tsconfig.json - it has different structure
      if (
        path.basename(path.dirname(tsConfigPath)) === 'leafygreen-ui-branch'
      ) {
        continue;
      }

      const tsConfig: TsConfig = JSON.parse(
        fs.readFileSync(tsConfigPath, 'utf-8'),
      );

      // Merge compilerOptions from r17 config
      if (r17TsConfig.compilerOptions) {
        tsConfig.compilerOptions = tsConfig.compilerOptions || {};

        // Merge the r17 compiler options, keeping existing ones
        for (const [key, value] of Object.entries(
          r17TsConfig.compilerOptions,
        )) {
          tsConfig.compilerOptions[key] = value;
        }
      }

      // Write the updated tsconfig.json
      fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2) + '\n');
    } catch (error) {
      console.warn(`⚠️  Failed to update ${tsConfigPath}:`, error);
    }
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
