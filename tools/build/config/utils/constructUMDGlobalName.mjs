/**
 * Constructs a UMD global name from a package name.
 * E.g., '@leafygreen-ui/button' becomes 'leafyGreen_Button'
 *
 * @param {string} packageName - The name of the package (e.g., '@leafygreen-ui/button').
 * @param {string} [suffix] - An optional suffix to append to the global name (e.g., 'Icon').
 * @returns {string} - The constructed UMD global name (e.g., 'leafyGreenIconBeaker').
 */
export const constructUMDGlobalName = (packageName, suffix = '') => {
  const name = packageName.split('/').pop();
  const prefix = 'leafyGreen';
  const sentenceCasePackageName = toPascalCase(name);
  const sentenceCaseSuffix = toPascalCase(suffix);
  return `${prefix}${sentenceCasePackageName}${sentenceCaseSuffix}`;
};

const toPascalCase = str => {
  return str
    .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^[a-z]/, letter => letter.toUpperCase());
};
