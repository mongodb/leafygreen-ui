import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Icon } from '@leafygreen-ui/icon';
import XIcon from '@leafygreen-ui/icon/dist/X';

import FormFooter from './FormFooter';
import { FormFooterProps } from './FormFooter.types';
import { getLgIds } from './utils';

const testIds = getLgIds();
const testMenuItems = [
  <span key="1">Option 1</span>,
  <span key="2">Option 2</span>,
];

const renderFooter = (props: Partial<FormFooterProps> = {}) => {
  return render(
    <FormFooter primaryButtonProps={{ children: 'Test button' }} {...props} />,
  );
};

describe('packages/form-footer', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderFooter();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('backButtonProps', () => {
    test('renders as Button instance with custom text if backButtonProps is defined', () => {
      const backButtonText = 'Back';
      renderFooter({
        backButtonProps: {
          children: backButtonText,
        },
      });
      const backButton = screen.getByTestId(testIds.backButton);
      expect(backButton).toBeVisible();
      expect(backButton).toHaveTextContent(backButtonText);
    });

    test('renders as SplitButton instance if menuItems is defined', () => {
      renderFooter({
        backButtonProps: {
          label: 'Back',
          menuItems: testMenuItems,
        },
      });
      const backSplitButton = screen.getByTestId(testIds.backSplitButton);
      expect(backSplitButton).toBeVisible();
    });

    test('does not render if backButtonProps is undefined', () => {
      renderFooter();
      const backButton = screen.queryByTestId(testIds.backButton);
      expect(backButton).not.toBeInTheDocument();
    });

    describe('left glyph', () => {
      test('does not render if backButtonProps is defined and backButtonProps.leftGlyph is undefined', () => {
        renderFooter({
          backButtonProps: {
            children: 'Back',
            leftGlyph: undefined,
          },
        });
        const backButtonIcon = screen.queryByTestId(testIds.backButtonIcon);
        expect(backButtonIcon).toBeNull();
      });

      test('renders custom leftGlyph if backButtonProps is defined and backButtonProps.leftGlyph is defined', () => {
        const leftGlyphTestId = 'custom-icon-id';
        renderFooter({
          backButtonProps: {
            children: 'Back',
            leftGlyph: <XIcon data-testid={leftGlyphTestId} />,
          },
        });
        const backButtonIcon = screen.getByTestId(leftGlyphTestId);
        expect(backButtonIcon).toBeVisible();
      });
    });
  });

  describe('cancelButtonProps', () => {
    test('renders as Button instance with custom text if cancelButtonProps is defined', () => {
      const cancelButtonText = 'Cancel';
      renderFooter({
        cancelButtonProps: {
          children: cancelButtonText,
        },
      });
      const cancelButton = screen.getByTestId(testIds.cancelButton);
      expect(cancelButton).toBeVisible();
      expect(cancelButton).toHaveTextContent(cancelButtonText);
    });

    test('renders as SplitButton instance if menuItems is defined', () => {
      renderFooter({
        cancelButtonProps: {
          label: 'Cancel',
          menuItems: testMenuItems,
        },
      });
      const cancelButton = screen.getByTestId(testIds.cancelSplitButton);
      expect(cancelButton).toBeVisible();
    });

    test('does not render if cancelButtonProps is not defined', () => {
      renderFooter();
      const cancelButton = screen.queryByTestId(testIds.cancelButton);
      expect(cancelButton).toBeNull();
    });

    describe('left glyph', () => {
      test('does not render if cancelButtonProps is defined and cancelButtonProps.leftGlyph is undefined', () => {
        renderFooter({
          cancelButtonProps: {
            children: 'Cancel',
            leftGlyph: undefined,
          },
        });
        const cancelButton = screen.getByTestId(testIds.cancelButton);
        expect(cancelButton.querySelector('svg')).toBeNull();
      });

      test('renders custom leftGlyph if cancelButtonProps is defined and cancelButtonProps.leftGlyph is defined', () => {
        const leftGlyphTestId = 'custom-icon-id';
        renderFooter({
          cancelButtonProps: {
            children: 'Cancel',
            leftGlyph: <XIcon data-testid={leftGlyphTestId} />,
          },
        });
        const cancelButtonIcon = screen.getByTestId(leftGlyphTestId);
        expect(cancelButtonIcon).toBeVisible();
      });
    });
  });

  describe('primaryButtonProps', () => {
    test('renders as Button instance with custom text if menuItems is undefined', () => {
      const primaryButtonText = 'Primary';
      renderFooter({
        primaryButtonProps: {
          children: primaryButtonText,
        },
      });
      const primaryButton = screen.getByTestId(testIds.primaryButton);
      expect(primaryButton).toBeVisible();
      expect(primaryButton).toHaveTextContent(primaryButtonText);
    });

    test('renders as SplitButton instance if menuItems is defined', () => {
      renderFooter({
        primaryButtonProps: {
          label: 'Test button',
          menuItems: testMenuItems,
        },
      });
      const primarySplitButton = screen.getByTestId(testIds.primarySplitButton);
      expect(primarySplitButton).toBeVisible();
    });
  });

  test('renders error message', () => {
    renderFooter({
      errorMessage: 'Error',
    });
    const errorMessage = screen.getByText('Error');
    expect(errorMessage).toBeVisible();
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

      <FormFooter
        primaryButtonProps={{ children: 'Confirm' }}
        backButtonProps={{ label: 'Back', menuItems: testMenuItems }}
        cancelButtonProps={{ children: 'Cancel' }}
      />
      <FormFooter
        primaryButtonProps={{ label: 'Confirm', menuItems: testMenuItems }}
        backButtonProps={{ children: 'Back' }}
        cancelButtonProps={{ children: 'Cancel' }}
      />
      <FormFooter
        primaryButtonProps={{ children: 'Confirm' }}
        backButtonProps={{ children: 'Back' }}
        cancelButtonProps={{ label: 'Cancel', menuItems: testMenuItems }}
      />
    </>;
  });
});
