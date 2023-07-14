import { TemplateParameters } from '../../create.types';

export const index = ({ packageNamePascal }: TemplateParameters) =>
  `export { ${packageNamePascal}, ${packageNamePascal}Props } from './${packageNamePascal}';`;
