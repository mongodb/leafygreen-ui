/* eslint-disable no-console */
import chalk from 'chalk';

/**
 * Extracts TypeScript versions from the typesVersions field in package.json
 * and returns an array of version numbers without the 'ts' prefix.
 * @returns
 */
export const getTypeVersions = (typesVersions?: {
  [target: string]: {
    [files: string]: Array<string>;
  };
}): Array<`${number}.${number}`> | undefined => {
  if (!typesVersions || typeof typesVersions !== 'object') return;

  const versions: Array<`${number}.${number}`> = [];

  Object.entries(typesVersions).forEach(([_versionRange, pathMappings]) => {
    // Get the output directory from the path mappings
    // Typical format is { '*': ['ts3.4/*'] }
    if (!pathMappings || typeof pathMappings !== 'object') return;

    const wildcardMapping = pathMappings['*'];
    if (!Array.isArray(wildcardMapping) || wildcardMapping.length === 0) return;

    // Extract outputDir from format like 'ts3.4/*'
    const outputDirMatch = wildcardMapping[0].match(/^dist\/ts([\d.]+)\/\*/);
    if (!outputDirMatch || !outputDirMatch[1]) return;

    // Get just the version number without the 'ts' prefix
    const versionNumber = outputDirMatch[1] as `${number}.${number}`;

    // Check if the version number is valid
    if (!/^\d+\.\d+$/.test(versionNumber)) {
      console.log(
        chalk.red(
          `Invalid TS version number format in directory${outputDirMatch[0]}. Expected format is 'dist/tsX.Y/*'`,
        ),
      );
      return;
    }

    // check if the version number is already in the array
    if (versions.includes(versionNumber)) return;

    // Add the version number to the array
    versions.push(versionNumber);
  });

  return versions;
};
