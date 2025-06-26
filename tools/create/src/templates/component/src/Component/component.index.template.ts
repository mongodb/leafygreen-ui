import { TemplateParameters } from '../../../../create.types';

export const componentIndex = ({
  packageNamePascal,
}: Pick<TemplateParameters, 'packageNamePascal'>) => `
export  { ${packageNamePascal} } from './${packageNamePascal}';
export { type ${packageNamePascal}Props } from './${packageNamePascal}.types';
`;
