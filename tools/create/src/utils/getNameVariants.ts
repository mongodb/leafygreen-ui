import { camelCase, kebabCase, startCase } from 'lodash';

export function getNameVariants(name: string) {
  // Construct all required parameters
  const packageNameKebab = kebabCase(name);
  const packageNameTitle = startCase(name);
  const packageNamePascal = camelCase(name).replace(/^\w/, c =>
    c.toUpperCase(),
  );

  return { packageNameKebab, packageNameTitle, packageNamePascal };
}
