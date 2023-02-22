import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Toast from './Toast';
import { ToastProps, Variant } from './Toast.types';

function renderToast(props: ToastProps) {
  return render(<Toast {...props} />);
}

describe('packages/toast', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderToast({
        open: true,
        body: 'hello world',
        variant: Variant.Success,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe(`when 'open' prop is`, () => {
    test(`undefined, Toast doesn't render`, () => {
      const { queryByRole } = renderToast({
        body: 'hello world',
        variant: Variant.Success,
      });

      const toast = queryByRole('status');
      expect(toast).toBeVisible();
      expect(toast).toBeEmptyDOMElement();
    });

    test(`false, Toast doesn't render`, () => {
      const { queryByRole } = renderToast({
        body: 'hello world',
        variant: Variant.Success,
        open: false,
      });

      const toast = queryByRole('status');
      expect(toast).toBeVisible();
      expect(toast).toBeEmptyDOMElement();
    });

    test('true, Toast is visible', () => {
      const { queryByRole } = renderToast({
        body: 'hello world',
        variant: Variant.Success,
        open: true,
      });

      const toast = queryByRole('status');
      expect(toast).toBeVisible();
      expect(toast).not.toBeEmptyDOMElement();
    });
  });

  describe(`when 'close' prop is`, () => {
    test('undefined, Modal is closed', () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: Variant.Success,
      });

      const toast = queryByRole('button');
      expect(toast).not.toBeInTheDocument();
    });

    test('a function, Modal is closed', () => {
      const mockFn = jest.fn();
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: Variant.Success,
        close: mockFn,
      });

      const closeButton = queryByRole('button');
      expect(closeButton).toBeVisible();

      if (!closeButton) {
        // Prevents TS from seeing closeButton as Element | null when passed to click method below.
        throw new ReferenceError('`closeButton` is not defined.');
      }

      fireEvent.click(closeButton);

      expect(mockFn.mock.instances.length).toBe(1);
    });
  });

  describe(`when 'variant' is 'progress', the progress bar renders`, () => {
    test(`when 'progress' is undefined`, () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: Variant.Progress,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).toBeVisible();
    });

    test(`when 'progress' is '0'`, () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: Variant.Progress,
        progress: 0,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).toBeVisible();
    });

    test(`when 'progress' is '0.5'`, () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: Variant.Progress,
        progress: 0,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).toBeVisible();
    });
  });

  describe(`when 'variant' is not 'progress', the progress bar does not render`, () => {
    test(`when 'progress' is undefined`, () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: Variant.Success,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).not.toBeInTheDocument();
    });

    test(`when 'progress' is '0'`, () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: Variant.Success,
        progress: 0,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).not.toBeInTheDocument();
    });

    test(`when 'progress' is '0.5'`, () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: Variant.Success,
        progress: 0,
      });

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
        const { getByLabelText } = renderToast({
          open: true,
          body: 'hello world',
          variant,
        });

        expect(getByLabelText(expectedVariantIcons[variant])).toBeVisible();
      },
    );
  });

  describe(`when 'title' prop is`, () => {
    test('undefined, the title element does not render', () => {
      const { queryByTestId } = renderToast({
        open: true,
        body: 'hello world',
        variant: Variant.Success,
      });

      const body = queryByTestId('toast-title');
      expect(body).not.toBeInTheDocument();
    });

    test('a string, the title element renders', () => {
      const titleText = 'this is the title';
      const { queryByText } = renderToast({
        open: true,
        body: 'hello world',
        title: titleText,
        variant: Variant.Success,
      });

      const body = queryByText(titleText);
      expect(body).toBeVisible();
    });

    test('a JSX element, the title element renders', () => {
      const titleText = 'this is the title';
      const titleElement = <span>{titleText}</span>;
      const { queryByText } = renderToast({
        open: true,
        body: 'hello world',
        title: titleElement,
        variant: Variant.Success,
      });

      const titleSpan = queryByText(titleText);
      expect(titleSpan).toBeVisible();
    });
  });

  describe(`when 'body' prop is`, () => {
    test('a string, the title element renders', () => {
      const bodyText = 'this is the title';
      const { queryByText } = renderToast({
        open: true,
        body: bodyText,
        variant: Variant.Success,
      });

      const body = queryByText(bodyText);
      expect(body).toBeVisible();
    });

    test('a JSX element, the body element renders', () => {
      const bodyText = 'this is the body';
      const bodyElement = <span>{bodyText}</span>;
      const { queryByText } = renderToast({
        open: true,
        body: bodyElement,
        variant: Variant.Success,
      });

      const bodySpan = queryByText(bodyText);
      expect(bodySpan).toBeVisible();
    });
  });
});

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('TS types', () => {
  render(
    <>
      <Toast body="string" />
      {/* @ts-expect-error - body is required */}
      <Toast />
      {/* @ts-expect-error - title is required */}
      <Toast title="string" />

      <Toast title="string" body="string" />
      <Toast title="string" body="string" close={() => {}} />
      <Toast title="string" body="string" close={() => {}} />
    </>,
  );
});
