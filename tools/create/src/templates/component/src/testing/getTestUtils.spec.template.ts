import { TemplateParameters } from '../../../../create.types';

export const testingSpec = ({
  packageNamePascal,
  packageNameKebab,
}: Pick<
  TemplateParameters,
  'packageNamePascal' | 'packageNameKebab'
>) => `import React from 'react';
import { render } from '@testing-library/react';

import { ${packageNamePascal} } from '.';

describe('packages/${packageNameKebab}/getTestUtils', () => {
  test('condition', () => {

  })
})
`;
