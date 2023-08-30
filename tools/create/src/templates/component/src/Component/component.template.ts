import { TemplateParameters } from '../../../../create.types';

export const component = ({
  packageNamePascal,
}: Pick<TemplateParameters, 'packageNamePascal'>) => `import React from 'react';
import { ${packageNamePascal}Props } from './${packageNamePascal}.types';

// TODO: forwardRef
export function ${packageNamePascal}({}: ${packageNamePascal}Props) {
  return <div>your content here</div>;
}

${packageNamePascal}.displayName = '${packageNamePascal}';
`;
