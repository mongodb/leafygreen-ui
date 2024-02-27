import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Button from '@leafygreen-ui/button';
import X from '@leafygreen-ui/icon/dist/X';

import { FormFooterProps } from './FormFooter';
import FormFooter from '.';

const buttonTestId = {
  back: 'lg-form_footer-back-button',
  cancel: 'lg-form_footer-cancel-button',
  primary: 'lg-form_footer-primary-button',
};

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

    // remove once deprecated props are removed
    describe('deprecated cancel button and back button props', () => {
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
    });

    describe('cancel button', () => {
      test('renders with custom text if cancelButtonProps is defined', () => {
        const cancelButtonText = 'Cancel';
        const { queryByText } = renderFooter({
          primaryButton: { text: 'Test button' },
          cancelButtonProps: {
            text: cancelButtonText,
          },
        });
        const Cancel = queryByText(cancelButtonText);
        expect(Cancel).toBeInTheDocument();
      });

      test('does not render if cancelButtonProps is not defined', () => {
        const { queryByTestId } = renderFooter({
          primaryButton: { text: 'Test button' },
          cancelButtonText: '', // remove once deprecated props are removed
        });
        const Cancel = queryByTestId(buttonTestId.cancel);
        expect(Cancel).not.toBeInTheDocument();
      });
    });

    describe('back button', () => {
      test('renders with custom text if backButtonProps is defined', () => {
        const backButtonText = 'Back';
        const { queryByText } = renderFooter({
          primaryButton: { text: 'Test button' },
          backButtonProps: {
            text: backButtonText,
          },
        });
        const Back = queryByText(backButtonText);
        expect(Back).toBeInTheDocument();
      });

      test('does not render', () => {
        const { queryByTestId } = renderFooter({
          primaryButton: { text: 'Test button' },
        });
        const Back = queryByTestId(buttonTestId.back);
        expect(Back).not.toBeInTheDocument();
      });

      describe('Back button left glyph', () => {
        test('Renders ArrowLeftIcon if leftGlyph is undefined', () => {
          const { queryByTestId } = renderFooter({
            primaryButton: { text: 'Test button' },
            backButtonProps: {
              text: 'Back',
              leftGlyph: undefined,
            },
          });
          const BackButtonIcon = queryByTestId(
            'lg-form_footer-back-button-icon',
          );
          expect(BackButtonIcon).toBeInTheDocument();
        });

        test('Does not render if leftGlyph is null', () => {
          const { getByTestId } = renderFooter({
            primaryButton: { text: 'Test button' },
            backButtonProps: {
              text: 'Back',
              leftGlyph: null,
            },
          });
          const Back = getByTestId(buttonTestId.back);
          expect(Back.querySelector('svg')).toBeNull();
        });

        test('Renders custom leftGlyph icon if leftGlyph is ReactElement', () => {
          const leftGlyphTestId = 'custom-icon-id';
          const { queryByTestId } = renderFooter({
            primaryButton: { text: 'Test button' },
            backButtonProps: {
              text: 'Back',
              leftGlyph: <X data-testid={leftGlyphTestId} />,
            },
          });
          const BackButtonIcon = queryByTestId(leftGlyphTestId);
          expect(BackButtonIcon).toBeInTheDocument();
        });
      });
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
