import { TemplateParameters } from '../../../../create.types';

export const component = ({
  packageNamePascal,
}: Pick<TemplateParameters, 'packageNamePascal'>) => `
import React from 'react';

// TODO: forwardRef
export function ${packageNamePascal}({}) {
  return <div>your content here</div>;
}

${packageNamePascal}.displayName = '${packageNamePascal}';
`;
