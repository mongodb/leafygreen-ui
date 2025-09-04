import fs from 'fs';
import path from 'path';

const ICON_DIR = path.resolve(process.cwd(), 'src/generated');

export function getAllIcons(): Array<string> {
  const iconNames = fs
    .readdirSync(ICON_DIR)
    .filter(f => /\.tsx?$/.test(f))
    .map(f => path.basename(f, path.extname(f)));
  return iconNames;
}

function getChecksumsFilePath(): string {
  const relativePath = 'dist/checksums.json';
  const fullPath = path.resolve(process.cwd(), relativePath);

  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, JSON.stringify({}, null, 2));
  }

  return fullPath;
}

/**
 * Loads checksums from the .checksums.json file as an object.
 * If it doesn't exist, returns an empty object.
 */
function getPrevChecksums(): Record<string, string> {
  try {
    return JSON.parse(fs.readFileSync(getChecksumsFilePath(), 'utf-8'));
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // this is normal if the file doesn't exist yet
      return {};
    } else if (err instanceof SyntaxError) {
      console.error(
        `[compare-checksum] Invalid JSON in checksums file at ${getChecksumsFilePath()}:`,
        err.message,
      );
    } else {
      console.error(
        `[compare-checksum] Error reading checksums file at ${getChecksumsFilePath()}:`,
        err,
      );
    }

    return {};
  }
}

/** Updates checksums in the .checksums.json file. */
function saveNewChecksums(checksums: Record<string, string>) {
  fs.writeFileSync(getChecksumsFilePath(), JSON.stringify(checksums, null, 2));
}

/** Extracts the pre-computed checksum from a generated .tsx file. */
function extractChecksumFromFile(filePath: string): string | null {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/@checksum\s+([a-f0-9]+)/);
  return match ? match[1] : null;
}

/**
 * Gets list of changed icon names by comparing checksums.
 */
export function getChangedIcons(): Array<string> {
  const prevChecksums = getPrevChecksums();
  const newChecksums: Record<string, string> = {};

  const changes: Array<string> = [];

  for (const iconName of getAllIcons()) {
    const filePath = path.join(ICON_DIR, `${iconName}.tsx`);
    const checksum = extractChecksumFromFile(filePath);

    // theoretically, there should always be a checksum as it is added during generation
    if (!checksum) {
      console.warn(
        `No checksum found for icon: ${iconName}. This may indicate a problem with the prebuild process.`,
      );
      changes.push(iconName);
      continue;
    }

    newChecksums[iconName] = checksum;
    if (prevChecksums[iconName] !== checksum) {
      changes.push(iconName);
    }
  }

  saveNewChecksums(newChecksums);
  return changes;
}
