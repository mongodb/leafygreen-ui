/**
 * Returns a _very_ rough approximation of a regex pattern,
 * given a glob pattern.
 *
 * e.g. `globToRegex('@leafygreen-ui/*') // /@leafygreen-ui\/.+/`
 *
 * @internal
 */
export const globToRegex = (globPattern: string): RegExp => {
  const regexPattern = globPattern.replace('*', '.+').replace('/', '\\/');
  const regEx = new RegExp(regexPattern);
  return regEx;
};
