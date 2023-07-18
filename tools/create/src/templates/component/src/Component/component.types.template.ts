import { TemplateParameters } from '../../../../create.types';

export const types = ({ packageNamePascal }: TemplateParameters) =>
  `export interface ${packageNamePascal}Props {}`;
