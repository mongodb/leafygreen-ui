import { TemplateParameters } from '../../../create.types';

export const spec = ({
  packageNamePascal,
  packageNameKebab,
}: TemplateParameters) => `
import React from 'react';
import { render } from '@testing-library/react';

import { ${packageNamePascal} } from '.';

describe('packages/${packageNameKebab}', () => {
  test('condition', () => {

  })
})
`;
