import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';

export function getNameVariants(name: string) {
  // eslint-disable-next-line prefer-const
  let [_scope, component] = name.split('/');

  if (!component) {
    component = name;
  }

  // Construct all required parameters
  const packageNameKebab = kebabCase(component);
  const packageNameTitle = startCase(component);
  const packageNamePascal = camelCase(component).replace(/^\w/, c =>
    c.toUpperCase(),
  );

  return { packageNameKebab, packageNameTitle, packageNamePascal };
}
