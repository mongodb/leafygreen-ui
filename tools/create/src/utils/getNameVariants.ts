import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import snakeCase from 'lodash/snakeCase';
import startCase from 'lodash/startCase';

export function getNameVariants(name: string) {
  const component = name.split('/')[1] ?? name;

  // Construct all required parameters
  const packageNameKebab = kebabCase(component);
  const packageNameTitle = startCase(component);
  const packageNamePascal = camelCase(component).replace(/^\w/, c =>
    c.toUpperCase(),
  );
  const packageNameSnake = snakeCase(component);

  return {
    packageNameKebab,
    packageNameTitle,
    packageNamePascal,
    packageNameSnake,
  };
}
