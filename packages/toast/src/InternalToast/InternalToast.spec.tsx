import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Variant } from '../Toast.types';

import { InternalToast } from './InternalToast';
import { InternalToastProps } from './InternalToast.types';

/**
 * This suite checks the rendering of a toast.
 *
 * Does not test interactivity
 * (see `ToastContext.spec.tsx`)
 *
 * Does not check controlled rendering
 * (see `ControlledToast.spec`)
 */
describe('packages/toast/internal-toast', () => {
  afterEach(cleanup);

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(
        <InternalToast title="hello world" variant={Variant.Success} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('`variant` prop', () => {
    describe(`when 'variant' is 'progress', the progress bar renders`, () => {
      test(`when 'progress' is undefined`, () => {
        const { queryByRole } = render(
          <InternalToast title="hello world" variant={Variant.Progress} />,
        );

        const progressBar = queryByRole('progressbar');
        expect(progressBar).toBeVisible();
      });

      test(`when 'progress' is '0'`, () => {
        const { queryByRole } = render(
          <InternalToast
            title="hello world"
            variant={Variant.Progress}
            progress={0}
          />,
        );

        const progressBar = queryByRole('progressbar');
        expect(progressBar).toBeVisible();
      });

      test(`when 'progress' is '0.5'`, () => {
        const { queryByRole } = render(
          <InternalToast
            title="hello world"
            variant={Variant.Progress}
            progress={0.5}
          />,
        );

        const progressBar = queryByRole('progressbar');
        expect(progressBar).toBeVisible();
      });
    });

    describe(`when 'variant' is not 'progress', the progress bar does not render`, () => {
      test(`when 'progress' is undefined`, () => {
        const { queryByRole } = render(
          <InternalToast title="hello world" variant={Variant.Success} />,
        );

        const progressBar = queryByRole('progressbar');
        expect(progressBar).not.toBeInTheDocument();
      });

      test(`when 'progress' is set`, () => {
        const { queryByRole } = render(
          <InternalToast
            title="hello world"
            variant={Variant.Success}
            progress={0}
          />,
        );

        const progressBar = queryByRole('progressbar');
        expect(progressBar).not.toBeInTheDocument();
      });
    });

    describe('the correct icon is rendered', () => {
      const expectedVariantIcons: Record<Variant, string> = {
        [Variant.Success]: 'Checkmark With Circle Icon',
        [Variant.Note]: 'Info With Circle Icon',
        [Variant.Warning]: 'Warning Icon',
        [Variant.Important]: 'Important With Circle Icon',
        [Variant.Progress]: 'Refresh Icon',
      };

      test.each(Object.values(Variant) as Array<Variant>)(
        `when 'variant' is '%s'`,
        variant => {
          const { getByLabelText } = render(
            <InternalToast title="hello world" variant={variant} />,
          );

          expect(getByLabelText(expectedVariantIcons[variant])).toBeVisible();
        },
      );
    });
  });

  describe('`title` prop', () => {
    test('a string, the title element renders', () => {
      const titleText = 'this is the title';
      const { queryByText } = render(
        <InternalToast title={titleText} variant={Variant.Success} />,
      );

      const body = queryByText(titleText);
      expect(body).toBeVisible();
    });

    test('a JSX element, the title element renders', () => {
      const titleText = 'this is the title';
      const titleElement = <span data-testid="test-span">{titleText}</span>;
      const { queryByTestId } = render(
        <InternalToast title={titleElement} variant={Variant.Success} />,
      );

      const titleSpan = queryByTestId('test-span');
      expect(titleSpan).toBeVisible();
    });
  });

  describe('`description` prop', () => {
    test('a string, the title element renders', () => {
      const bodyText = 'this is the title';
      const { queryByText } = render(
        <InternalToast
          title="hello"
          description={bodyText}
          variant={Variant.Success}
        />,
      );

      const body = queryByText(bodyText);
      expect(body).toBeVisible();
    });

    test('a JSX element, the body element renders', () => {
      const bodyText = 'this is the body';
      const bodyElement = <span data-testid="test-span">{bodyText}</span>;
      const { queryByTestId } = render(
        <InternalToast
          title="hello"
          description={bodyElement}
          variant={Variant.Success}
        />,
      );

      const bodySpan = queryByTestId('test-span');
      expect(bodySpan).toBeVisible();
    });
  });

  describe('`actionElement` prop', () => {
    test('Renders `actionElement` when `variant === progress`', () => {
      const { queryByTestId } = render(
        <InternalToast
          title="hello world"
          variant={Variant.Progress}
          actionElement={<button data-testid="action">action</button>}
        />,
      );
      const actionButton = queryByTestId('action');
      expect(actionButton).toBeInTheDocument();
    });

    test('`actionElement` not rendered when `variant !== progress`', () => {
      const { queryByTestId } = render(
        <InternalToast
          title="hello world"
          variant={Variant.Success}
          actionElement={<button data-testid="action">action</button>}
        />,
      );
      const actionButton = queryByTestId('action');
      expect(actionButton).not.toBeInTheDocument();
    });
  });
});

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('TS types behave as expected', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('Requires props', () => {
    <>
      {/* @ts-expect-error - title, open & onClose={are required */}
      <InternalToast />
      {/* @ts-expect-error - title is required */}
      <InternalToast open={false} onClose={() => {}} />
      {/* @ts-expect-error - `open` is not a valid prop on internal toast */}
      <InternalToast title="string" open={false} />

      <InternalToast title="string" onClose={() => {}} />
    </>;
  });

  const requiredProps = {
    title: 'string',
  } as InternalToastProps;

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('has correct props', () => {
    <>
      <InternalToast {...requiredProps} dismissible={true} />

      <InternalToast {...requiredProps} dismissible={false} />
      <InternalToast {...requiredProps} timeout={null} />

      <InternalToast {...requiredProps} timeout={5000} />
      <InternalToast {...requiredProps} timeout={5000} dismissible={true} />
      <InternalToast {...requiredProps} timeout={5000} dismissible={false} />
      <InternalToast {...requiredProps} timeout={null} dismissible={true} />
    </>;
  });
});
