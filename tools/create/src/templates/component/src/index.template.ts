import { TemplateParameters } from '../../../create.types';

export const index = ({
  packageNamePascal,
}: Pick<TemplateParameters, 'packageNamePascal'>) =>
  `export { ${packageNamePascal}, ${packageNamePascal}Props } from './${packageNamePascal}';`;
