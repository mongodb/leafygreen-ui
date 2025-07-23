import { TemplateParameters } from '../../../create.types';

export const index = ({
  packageNamePascal,
}: Pick<TemplateParameters, 'packageNamePascal'>) =>
  `export { ${packageNamePascal}, type ${packageNamePascal}Props } from './${packageNamePascal}';`;
