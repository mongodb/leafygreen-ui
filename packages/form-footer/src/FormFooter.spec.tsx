import React from 'react';
import { render } from '@testing-library/react';
import FormFooter from '.';
import { axe } from 'jest-axe';
import { FormFooterProps } from './FormFooter';

const renderFooter = (
  props: FormFooterProps = {
    primaryButton: { text: 'Test button' },
  },
) => {
  return render(<FormFooter {...props} />);
};

describe('packages/form-footer', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderFooter();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
