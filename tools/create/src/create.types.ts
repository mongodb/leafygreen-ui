export interface CreatePackageOptions {
  directory?: string;
  scope?: string;
}

export interface TemplateParameters {
  scope: string;
  packageNameKebab: string;
  packageNameTitle: string;
  packageNamePascal: string;
}
