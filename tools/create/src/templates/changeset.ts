import { TemplateParameters } from '../create.types';

export const changeset = ({
  scope,
  packageNameKebab,
  packageNamePascal,
}: Pick<
  TemplateParameters,
  'scope' | 'packageNameKebab' | 'packageNamePascal'
>) => `---
'${scope}/${packageNameKebab}': minor
---

Initial release of \`${packageNamePascal}\`
`;
