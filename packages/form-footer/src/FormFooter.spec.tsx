import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
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
      primaryButtonProps: { children: 'Test button' },
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe('rendering', () => {
    //TODO: remove - primaryButton is deprecated
    describe('deprecated', () => {
      test('renders basic primary button', () => {
        const { getByText, queryByText } = renderFooter({
          primaryButton: { text: 'Test button' },
          primaryButtonProps: { children: "I'm new" },
        });
        const ButtonElement = getByText('Test button');
        const ButtonElementNew = queryByText("I'm new");
        expect(ButtonElement).toBeInTheDocument();
        expect(ButtonElementNew).not.toBeInTheDocument();
      });

      test('renders JSX primary button', () => {
        const { getByText, queryByText } = render(
          <FormFooter
            primaryButton={
              <Button data-testid="test-button">Test button</Button>
            }
            primaryButtonProps={{ children: "I'm new" }}
          />,
        );
        const ButtonElement = getByText('Test button');
        const ButtonElementNew = queryByText("I'm new");
        expect(ButtonElement).toBeInTheDocument();
        expect(ButtonElementNew).not.toBeInTheDocument();
      });
    });

    test('renders basic primary button', () => {
      const { getByText } = renderFooter({
        primaryButtonProps: { children: 'Test button' },
      });
      const ButtonElement = getByText('Test button');
      expect(ButtonElement).toBeInTheDocument();
    });

    describe('cancel button', () => {
      test('renders with custom text if cancelButtonProps is defined', () => {
        const cancelButtonText = 'Cancel';
        const { queryByText } = renderFooter({
          primaryButtonProps: { children: 'Test button' },
          cancelButtonProps: {
            children: cancelButtonText,
          },
        });
        const Cancel = queryByText(cancelButtonText);
        expect(Cancel).toBeInTheDocument();
      });

      test('does not render if cancelButtonProps is not defined', () => {
        const { queryByTestId } = renderFooter({
          primaryButtonProps: { children: 'Test button' },
        });
        const Cancel = queryByTestId(testId.cancelButton);
        expect(Cancel).not.toBeInTheDocument();
      });

      describe('left glyph', () => {
        test('does not render if cancelButtonProps is defined and cancelButtonProps.leftGlyph is undefined', () => {
          const { getByTestId } = renderFooter({
            primaryButtonProps: { children: 'Test button' },
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
            primaryButtonProps: { children: 'Test button' },
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
          primaryButtonProps: { children: 'Test button' },
          backButtonProps: {
            children: backButtonText,
          },
        });
        const Back = queryByText(backButtonText);
        expect(Back).toBeInTheDocument();
      });

      test('does not render if backButtonProps is undefined', () => {
        const { queryByTestId } = renderFooter({
          primaryButtonProps: { children: 'Test button' },
        });
        const Back = queryByTestId(testId.backButton);
        expect(Back).not.toBeInTheDocument();
      });

      describe('left glyph', () => {
        test('does not render if backButtonProps is defined and backButtonProps.leftGlyph is undefined', () => {
          const { getByTestId } = renderFooter({
            primaryButtonProps: { children: 'Test button' },
            backButtonProps: {
              children: 'Back',
              leftGlyph: undefined,
            },
          });
          const Back = getByTestId(testId.backButton);
          expect(Back.querySelector('svg')).toBeNull();
        });

        test('renders custom leftGlyph if backButtonProps is defined and backButtonProps.leftGlyph is defined', () => {
          const leftGlyphTestId = 'custom-icon-id';
          const { queryByTestId } = renderFooter({
            primaryButtonProps: { children: 'Test button' },
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
        primaryButtonProps: { children: 'Test button' },
      });

      expect(getByText('Error')).toBeInTheDocument();
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('types behave as expected', () => {
    <>
      <FormFooter primaryButtonProps={{ children: 'Confirm' }} />
      {/* @ts-expect-error - Missing children  */}
      <FormFooter primaryButtonProps={{ variant: 'primary' }} />
      {/* @ts-expect-error - Confirm is not a variant  */}
      <FormFooter primaryButtonProps={{ variant: 'Confirm' }} />

      <FormFooter
        primaryButtonProps={{ children: 'Confirm' }}
        // @ts-expect-error - cancelButtonProps, variant does not exist in CustomCancelButtonProps
        cancelButtonProps={{ variant: 'primary' }}
      />
      <FormFooter
        primaryButtonProps={{ children: 'Confirm' }}
        cancelButtonProps={{ isLoading: true }}
      />

      <FormFooter
        primaryButtonProps={{ children: 'Confirm' }}
        // @ts-expect-error - primary is not a variant
        backButtonProps={{ isLoading: true, variant: 'primary' }}
      />
      <FormFooter
        primaryButtonProps={{ children: 'Confirm' }}
        backButtonProps={{
          isLoading: true,
          variant: 'dangerOutline',
          leftGlyph: <Icon glyph="ArrowLeft" />,
        }}
      />

      <FormFooter
        primaryButtonProps={{ children: 'Confirm' }}
        backButtonProps={{ children: 'Back', variant: 'dangerOutline' }}
        cancelButtonProps={{ onClick: () => {} }}
        errorMessage="that's not very leafy of you"
        contentClassName="contentClassname"
        className="classname"
        darkMode
      />
    </>;
  });
});
