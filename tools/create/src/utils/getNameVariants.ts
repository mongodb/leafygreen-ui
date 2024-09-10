import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';

export function getNameVariants(name: string) {
  // Construct all required parameters
  const packageNameKebab = kebabCase(name);
  const packageNameTitle = startCase(name);
  const packageNamePascal = camelCase(name).replace(/^\w/, c =>
    c.toUpperCase(),
  );

  return { packageNameKebab, packageNameTitle, packageNamePascal };
}
