import { TemplateParameters } from '../../../../create.types';

export const types = ({
  packageNamePascal,
}: Pick<TemplateParameters, 'packageNamePascal'>) =>
  `export interface ${packageNamePascal}Props {}`;
