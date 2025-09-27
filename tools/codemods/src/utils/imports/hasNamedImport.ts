import type { Collection, JSCodeshift } from 'jscodeshift';

/**
 * Checks if a named import already exists for the component
 */
export function hasNamedImport(
  j: JSCodeshift,
  source: Collection<any>,
  packageName: string,
  componentName: string,
): boolean {
  const importDeclarations = source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === packageName);

  return importDeclarations
    .find(j.ImportSpecifier)
    .some(path => path.node.imported.name === componentName);
}
