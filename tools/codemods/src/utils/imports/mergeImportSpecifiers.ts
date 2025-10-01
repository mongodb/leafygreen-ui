import type { ASTPath, ImportDeclaration, JSCodeshift } from 'jscodeshift';

/**
 * Merges default and named imports from the same package
 */
export function mergeImportSpecifiers(
  j: JSCodeshift,
  importDeclaration: ASTPath<ImportDeclaration>,
  componentName: string,
  alias?: string,
) {
  const existingSpecifiers = importDeclaration.node.specifiers || [];

  // Remove default import
  const filteredSpecifiers = existingSpecifiers.filter(
    spec => spec.type !== 'ImportDefaultSpecifier',
  );

  // Add named import at the beginning to maintain consistent order
  const namedImport = j.importSpecifier(
    j.identifier(componentName),
    alias ? j.identifier(alias) : j.identifier(componentName),
  );

  importDeclaration.node.specifiers = [namedImport, ...filteredSpecifiers];
}
