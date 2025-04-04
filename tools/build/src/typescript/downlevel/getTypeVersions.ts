/**
 * Extracts TypeScript versions from the typesVersions field in package.json
 * and returns an array of version numbers without the 'ts' prefix.
 * @returns
 */
const getTypeVersions = (typesVersions?: {
  [target: string]: {
    [files: string]: string[];
  };
}): Array<string> | undefined => {
  if (!typesVersions || typeof typesVersions !== 'object') return;

  const versions: Array<string> = [];

  Object.entries(typesVersions).forEach(([_versionRange, pathMappings]) => {
    // Get the output directory from the path mappings
    // Typical format is { '*': ['ts3.4/*'] }
    if (!pathMappings || typeof pathMappings !== 'object') return;

    const wildcardMapping = pathMappings['*'];
    if (!Array.isArray(wildcardMapping) || wildcardMapping.length === 0) return;

    // Extract outputDir from format like 'ts3.4/*'
    const outputDirMatch = wildcardMapping[0].match(/^ts([\d.]+)\/\*/);
    if (!outputDirMatch || !outputDirMatch[1]) return;

    // Get just the version number without the 'ts' prefix
    const versionNumber = outputDirMatch[1];
    versions.push(versionNumber);
  });

  return versions;
};
