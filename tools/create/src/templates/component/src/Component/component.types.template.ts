import { TemplateParameters } from '../../../../create.types';

export const types = ({
  packageNamePascal,
}: Pick<TemplateParameters, 'packageNamePascal'>) =>
  `import { LgIdProps } from '@leafygreen-ui/lib';

  export interface ${packageNamePascal}Props extends LgIdProps {}`;
