import React from 'react';
import { render } from '@testing-library/react';
import Button from '@leafygreen-ui/button';
import FormFooter from '.';
import { axe } from 'jest-axe';
import { FormFooterProps } from './FormFooter';

const renderFooter = (props: FormFooterProps) => {
  return render(<FormFooter {...props} />);
};

describe('packages/form-footer', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderFooter({
      primaryButton: { text: 'Test button' },
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe('rendering', () => {
    test('Renders basic primary button', () => {
      const { getByText } = renderFooter({
        primaryButton: { text: 'Test button' },
      });
      const ButtonElement = getByText('Test button');
      expect(ButtonElement).toBeInTheDocument();
    });

    test('Renders JSX primary button', () => {
      const { getByText } = render(
        <FormFooter
          primaryButton={<Button data-testid="test-button">Test button</Button>}
        />,
      );
      const ButtonElement = getByText('Test button');
      expect(ButtonElement).toBeInTheDocument();
    });

    test('Renders cancel button', () => {
      const { getByText } = renderFooter({
        primaryButton: { text: 'Test button' },
      });
      const Cancel = getByText('Cancel');
      expect(Cancel).toBeInTheDocument();
    });

    test('Renders cancel button with custom text', () => {
      const { getByText } = renderFooter({
        primaryButton: { text: 'Test button' },
        cancelButtonText: 'CancelText',
      });
      const Cancel = getByText('CancelText');
      expect(Cancel).toBeInTheDocument();
    });

    test('Renders back button', () => {
      const { getByText } = renderFooter({
        primaryButton: { text: 'Test button' },
        backButtonText: 'Back',
      });
      const Back = getByText('Back');
      expect(Back).toBeInTheDocument();
    });

    test('Renders error message', () => {
      const { getByText } = renderFooter({
        errorMessage: 'Error',
        primaryButton: { text: 'Test button' },
      });

      expect(getByText('Error')).toBeInTheDocument();
    });
  });
});
