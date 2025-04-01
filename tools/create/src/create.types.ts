export interface CreatePackageOptions {
  directory?: string;
  scope?: string;
  parent?: string;
  dry?: boolean;
  verbose?: boolean;
}

export interface TemplateParameters {
  scope: string;
  packageNameKebab: string;
  packageNameTitle: string;
  packageNamePascal: string;
}
