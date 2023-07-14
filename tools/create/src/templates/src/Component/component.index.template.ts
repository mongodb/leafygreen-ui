import { TemplateParameters } from '../../../create.types';

export const componentIndex = ({ packageNamePascal }: TemplateParameters) => `
export  { ${packageNamePascal} } from './${packageNamePascal}';
export { ${packageNamePascal}Props } from './${packageNamePascal}.types';
`;
