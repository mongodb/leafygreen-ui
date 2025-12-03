/**
 * Parses a semver version string and returns its components
 */
export function parseVersion(version: string): {
  major: number;
  minor: number;
  patch: number;
} | null {
  // Remove any leading ^ or ~ or = characters
  const cleanVersion = version.replace(/^[\^~>=<]+/, '');
  // Match basic semver pattern
  const match = cleanVersion.match(/^(\d+)\.(\d+)\.(\d+)/);

  if (!match) {
    return null;
  }

  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
  };
}

