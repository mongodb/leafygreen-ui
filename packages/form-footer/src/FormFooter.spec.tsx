import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Button from '@leafygreen-ui/button';
import XIcon from '@leafygreen-ui/icon/dist/X';

import { FormFooterProps } from './FormFooter.types';
import FormFooter from '.';

const testId = {
  backButton: 'lg-form_footer-back_button',
  backButtonIcon: 'lg-form_footer-back_button-icon',
  cancelButton: 'lg-form_footer-cancel_button',
  primaryButton: 'lg-form_footer-primary_button',
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
    test('renders basic primary button', () => {
      const { getByText } = renderFooter({
        primaryButton: { text: 'Test button' },
      });
      const ButtonElement = getByText('Test button');
      expect(ButtonElement).toBeInTheDocument();
    });

    test('renders JSX primary button', () => {
      const { getByText } = render(
        <FormFooter
          primaryButton={<Button data-testid="test-button">Test button</Button>}
        />,
      );
      const ButtonElement = getByText('Test button');
      expect(ButtonElement).toBeInTheDocument();
    });

    // TODO @stephl3: remove once deprecated props are removed
    describe('deprecated cancel button and back button props', () => {
      test('renders cancel button', () => {
        const { getByText } = renderFooter({
          primaryButton: { text: 'Test button' },
        });
        const Cancel = getByText('Cancel');
        expect(Cancel).toBeInTheDocument();
      });

      test('renders cancel button with custom text', () => {
        const { getByText } = renderFooter({
          primaryButton: { text: 'Test button' },
          cancelButtonText: 'CancelText',
        });
        const Cancel = getByText('CancelText');
        expect(Cancel).toBeInTheDocument();
      });

      test('renders back button', () => {
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
            children: cancelButtonText,
          },
        });
        const Cancel = queryByText(cancelButtonText);
        expect(Cancel).toBeInTheDocument();
      });

      test('does not render if cancelButtonProps is not defined', () => {
        const { queryByTestId } = renderFooter({
          primaryButton: { text: 'Test button' },
          cancelButtonText: '', // TODO @stephl3: remove once deprecated props are removed
        });
        const Cancel = queryByTestId(testId.cancelButton);
        expect(Cancel).not.toBeInTheDocument();
      });

      describe('left glyph', () => {
        test('does not render if cancelButtonProps is defined and cancelButtonProps.leftGlyph is undefined', () => {
          const { getByTestId } = renderFooter({
            primaryButton: { text: 'Test button' },
            cancelButtonProps: {
              children: 'Cancel',
            },
          });
          const Cancel = getByTestId(testId.cancelButton);
          expect(Cancel.querySelector('svg')).toBeNull();
        });

        test('renders custom leftGlyph if cancelButtonProps is defined and cancelButtonProps.leftGlyph is defined', () => {
          const leftGlyphTestId = 'custom-icon-id';
          const { queryByTestId } = renderFooter({
            primaryButton: { text: 'Test button' },
            cancelButtonProps: {
              children: 'Cancel',
              leftGlyph: <XIcon data-testid={leftGlyphTestId} />,
            },
          });
          const CancelButtonIcon = queryByTestId(leftGlyphTestId);
          expect(CancelButtonIcon).toBeInTheDocument();
        });
      });
    });

    describe('back button', () => {
      test('renders with custom text if backButtonProps is defined', () => {
        const backButtonText = 'Back';
        const { queryByText } = renderFooter({
          primaryButton: { text: 'Test button' },
          backButtonProps: {
            children: backButtonText,
          },
        });
        const Back = queryByText(backButtonText);
        expect(Back).toBeInTheDocument();
      });

      test('does not render if backButtonProps is undefined', () => {
        const { queryByTestId } = renderFooter({
          primaryButton: { text: 'Test button' },
        });
        const Back = queryByTestId(testId.backButton);
        expect(Back).not.toBeInTheDocument();
      });

      describe('left glyph', () => {
        test('renders ArrowLeftIcon if backButtonProps is undefined and backButtonText is defined', () => {
          const { queryByTestId } = renderFooter({
            primaryButton: { text: 'Test button' },
            backButtonText: 'Back',
          });
          const BackButtonIcon = queryByTestId(testId.backButtonIcon);
          expect(BackButtonIcon).toBeInTheDocument();
        });

        test('does not render if backButtonProps is defined and backButtonProps.leftGlyph is undefined', () => {
          const { getByTestId } = renderFooter({
            primaryButton: { text: 'Test button' },
            backButtonProps: {
              children: 'Back',
            },
          });
          const Back = getByTestId(testId.backButton);
          expect(Back.querySelector('svg')).toBeNull();
        });

        test('renders custom leftGlyph if backButtonProps is defined and backButtonProps.leftGlyph is defined', () => {
          const leftGlyphTestId = 'custom-icon-id';
          const { queryByTestId } = renderFooter({
            primaryButton: { text: 'Test button' },
            backButtonProps: {
              children: 'Back',
              leftGlyph: <XIcon data-testid={leftGlyphTestId} />,
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
