/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const ICON_DIR = path.resolve(process.cwd(), 'src/generated');
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const CHECKSUMS_FILE = path.resolve(process.cwd(), '.icon-checksums.json');

/** Loads prevChecksums checksums from the .icon-checksums.json file.
 * If it doesn't exist, returns an empty object.
 */
function loadStoredChecksums(): Record<string, string> {
  try {
    return JSON.parse(fs.readFileSync(CHECKSUMS_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

/** Updates prevChecksums checksums in the .icon-checksums.json file. */
function saveChecksums(checksums: Record<string, string>) {
  fs.writeFileSync(CHECKSUMS_FILE, JSON.stringify(checksums, null, 2));
}

/** Extracts the pre-computed checksum from each generated .tsx file. */
function extractChecksumFromFile(filePath: string): string | null {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/@checksum\s+([a-f0-9]+)/);
  return match ? match[1] : null;
}

/** Gets list of changes icons by comparing checksums. */
export function getChangedIcons(): Array<string> {
  const files = fs.readdirSync(ICON_DIR).filter(f => /\.tsx?$/.test(f));
  const distFiles = new Set(
    fs.existsSync(DIST_DIR) ? fs.readdirSync(DIST_DIR) : [],
  );

  const prevChecksums = loadStoredChecksums();
  const newChecksums: Record<string, string> = {};

  const changes: Array<string> = [];

  for (const file of files) {
    const filePath = path.join(ICON_DIR, file);
    const distFilePath = file.replace(/\.tsx?$/, '.js');

    const checksum = extractChecksumFromFile(filePath);

    if (!checksum || !distFiles.has(distFilePath)) {
      changes.push(file.replace(/\.[^.]+$/, ''));
      continue;
    }

    newChecksums[file] = checksum;
    if (prevChecksums[file] !== checksum) {
      changes.push(file.replace(/\.[^.]+$/, ''));
    }
  }

  console.log('Checksum comparison complete. Changes include:', changes);

  saveChecksums(newChecksums);
  return changes;
}
