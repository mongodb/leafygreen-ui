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
        onClose: () => {},

        open: true,
        title: 'hello world',
        variant: Variant.Success,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe(`when 'open' prop is`, () => {
    test(`false, Toast doesn't render`, () => {
      const { queryByRole } = renderToast({
        title: 'hello world',
        variant: Variant.Success,
        open: false,
        onClose: () => {},
      });

      const toast = queryByRole('status');
      expect(toast).toBeVisible();
      expect(toast).toBeEmptyDOMElement();
    });

    test('true, Toast is visible', () => {
      const { queryByRole } = renderToast({
        title: 'hello world',
        variant: Variant.Success,
        open: true,
        onClose: () => {},
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
        onClose: () => {},

        title: 'hello world',
        variant: Variant.Success,
      });

      const toast = queryByRole('button');
      expect(toast).not.toBeInTheDocument();
    });

    test('a function, Modal is closed', () => {
      const mockFn = jest.fn();
      const { queryByRole } = renderToast({
        open: true,
        onClose: mockFn,
        title: 'hello world',
        variant: Variant.Success,
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
        onClose: () => {},
        title: 'hello world',
        variant: Variant.Progress,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).toBeVisible();
    });

    test(`when 'progress' is '0'`, () => {
      const { queryByRole } = renderToast({
        open: true,
        onClose: () => {},
        title: 'hello world',
        variant: Variant.Progress,
        progress: 0,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).toBeVisible();
    });

    test(`when 'progress' is '0.5'`, () => {
      const { queryByRole } = renderToast({
        open: true,
        onClose: () => {},
        title: 'hello world',
        variant: Variant.Progress,
        progress: 0.5,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).toBeVisible();
    });
  });

  describe(`when 'variant' is not 'progress', the progress bar does not render`, () => {
    test(`when 'progress' is undefined`, () => {
      const { queryByRole } = renderToast({
        open: true,
        onClose: () => {},
        title: 'hello world',
        variant: Variant.Success,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).not.toBeInTheDocument();
    });

    test(`when 'progress' is set`, () => {
      const { queryByRole } = renderToast({
        open: true,
        onClose: () => {},
        title: 'hello world',
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
          onClose: () => {},
          title: 'hello world',
          variant,
        });

        expect(getByLabelText(expectedVariantIcons[variant])).toBeVisible();
      },
    );
  });

  describe(`when 'title' prop is`, () => {
    test('a string, the title element renders', () => {
      const titleText = 'this is the title';
      const { queryByText } = renderToast({
        open: true,
        onClose: () => {},

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
        onClose: () => {},

        title: titleElement,
        variant: Variant.Success,
      });

      const titleSpan = queryByText(titleText);
      expect(titleSpan).toBeVisible();
    });
  });

  describe(`when 'description' prop is`, () => {
    test('a string, the title element renders', () => {
      const bodyText = 'this is the title';
      const { queryByText } = renderToast({
        open: true,
        onClose: () => {},

        title: 'hello world',
        description: bodyText,
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
        onClose: () => {},
        title: 'hello world',
        description: bodyElement,
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
      {/* @ts-expect-error - title, open & onClose are required */}
      <Toast />
      {/* @ts-expect-error - open is required */}
      <Toast title="string" onClose={() => {}} />
      {/* @ts-expect-error - title is required */}
      <Toast open={false} onClose={() => {}} />
      ``
      {/* @ts-expect-error - onClose is required */}
      <Toast title="string" open={false} />
      <Toast title="string" open={false} onClose={() => {}} />
    </>,
  );

  const requiredProps = {
    title: 'string',
    open: false,
    onClose: () => {},
  } as ToastProps;

  render(
    <>
      {/*TODO: @ts-expect-error - timeout cannot be null while dismissible is false */}
      <Toast {...requiredProps} timeout={null} dismissible={false} />

      <Toast {...requiredProps} dismissible={true} />

      <Toast {...requiredProps} dismissible={false} />
      <Toast {...requiredProps} timeout={null} />

      <Toast {...requiredProps} timeout={5000} />
      <Toast {...requiredProps} timeout={5000} dismissible={true} />
      <Toast {...requiredProps} timeout={5000} dismissible={false} />
      <Toast {...requiredProps} timeout={null} dismissible={true} />
    </>,
  );
});
