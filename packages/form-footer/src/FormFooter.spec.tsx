import React from 'react';
import { render, getByText } from '@testing-library/react';
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

  describe('rendering', () => {
    test.todo('Renders basic primary button');

    test.todo('Renders JSX primary button');

    test.todo('Renders cancel button');

    test.todo('Renders back button');

    test('Renders error message', () => {
      const { container } = renderFooter({
        errorMessage: 'Error',
      });

      expect(getByText(container, 'Error')).toBeVisible();
    });
  });
});
