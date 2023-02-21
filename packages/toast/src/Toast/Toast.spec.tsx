import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
        title: 'hello world',
        variant: Variant.Success,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe(`'open' prop`, () => {
    test(`undefined, Toast doesn't render`, () => {
      const { queryByRole } = renderToast({
        title: 'hello world',
        variant: Variant.Success,
      });

      const toast = queryByRole('status');
      expect(toast).toBeVisible();
      expect(toast).toBeEmptyDOMElement();
    });

    test(`false, Toast doesn't render`, () => {
      const { queryByRole } = renderToast({
        title: 'hello world',
        variant: Variant.Success,
        open: false,
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
      });

      const toast = queryByRole('status');
      expect(toast).toBeVisible();
      expect(toast).not.toBeEmptyDOMElement();
    });
  });

  describe(`'dismissible' prop`, () => {
    test('when `true`, renders the close button', () => {
      const { queryByRole } = renderToast({
        open: true,
        title: 'hello world',
        variant: Variant.Success,
        dismissible: true,
      });
      const closeButton = queryByRole('button');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toBeVisible();
    });

    test('close button is not rendered when false', () => {
      const { queryByRole } = renderToast({
        open: true,
        title: 'hello world',
        variant: Variant.Success,
        dismissible: false,
      });
      const closeButton = queryByRole('button');
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe(`'onClose' prop`, () => {
    test('when undefined, Toast is closed', () => {
      const { queryByRole } = renderToast({
        open: true,
        title: 'hello world',
        variant: Variant.Success,
      });

      const toast = queryByRole('button');
      expect(toast).not.toBeInTheDocument();
    });

    test('does not render close button if `dismissible` is not set', () => {
      const mockFn = jest.fn();
      const { queryByRole } = renderToast({
        open: true,
        title: 'hello world',
        variant: Variant.Success,
        onClose: mockFn,
      });
      const closeButton = queryByRole('button');
      expect(closeButton).not.toBeInTheDocument();
    });

    test('when a function, Toast is closed', () => {
      const mockFn = jest.fn();
      const { queryByRole } = renderToast({
        open: true,
        title: 'hello world',
        variant: Variant.Success,
        dismissible: true,
        onClose: mockFn,
      });

      const closeButton = queryByRole('button');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toBeVisible();

      userEvent.click(closeButton!);

      expect(mockFn.mock.instances.length).toBe(1);
    });
  });

  describe(`when 'variant' is 'progress', the progress bar renders`, () => {
    test(`when 'progress' is undefined`, () => {
      const { queryByRole } = renderToast({
        open: true,
        title: 'hello world',
        variant: Variant.Progress,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).toBeVisible();
    });

    test(`when 'progress' is '0'`, () => {
      const { queryByRole } = renderToast({
        open: true,
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
        title: 'hello world',
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
        title: 'hello world',
        variant: Variant.Success,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).not.toBeInTheDocument();
    });

    test(`when 'progress' is '0'`, () => {
      const { queryByRole } = renderToast({
        open: true,
        title: 'hello world',
        variant: Variant.Success,
        progress: 0,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).not.toBeInTheDocument();
    });

    test(`when 'progress' is '0.5'`, () => {
      const { queryByRole } = renderToast({
        open: true,
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
          title: 'hello world',
          variant,
        });

        expect(getByLabelText(expectedVariantIcons[variant])).toBeVisible();
      },
    );
  });

  describe(`'description' prop`, () => {
    test('undefined, the description element does not render', () => {
      const { queryByTestId } = renderToast({
        open: true,
        title: 'hello world',
        variant: Variant.Success,
      });

      const description = queryByTestId('toast-description');
      expect(description).not.toBeInTheDocument();
    });

    test('a string, the title element renders', () => {
      const descriptionText = 'this is the description';
      const { queryByTestId } = renderToast({
        open: true,
        title: 'hello world',
        description: descriptionText,
        variant: Variant.Success,
      });

      const description = queryByTestId('toast-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent(descriptionText);
    });

    test('a JSX element, the title element renders', () => {
      const descriptionText = 'this is the description';
      const descriptionElement = <span>{descriptionText}</span>;
      const { queryByTestId } = renderToast({
        open: true,
        title: 'hello world',
        description: descriptionElement,
        variant: Variant.Success,
      });

      const description = queryByTestId('toast-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent(descriptionText);
    });
  });

  describe(`'title' prop`, () => {
    test('a string, the title element renders', () => {
      const titleText = 'this is the title';
      const { queryByTestId } = renderToast({
        open: true,
        title: titleText,
        variant: Variant.Success,
      });

      const title = queryByTestId('toast-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent(titleText);
    });

    test('a JSX element, the title element renders', () => {
      const titleText = 'this is the title';
      const titleElement = <span>{titleText}</span>;
      const { queryByTestId } = renderToast({
        open: true,
        title: titleElement,
        variant: Variant.Success,
      });

      const title = queryByTestId('toast-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent(titleText);
    });
  });
});

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('TS types', () => {
  render(
    <>
      <Toast title="string" />
      {/* @ts-expect-error - title is required */}
      <Toast />
      {/* @ts-expect-error - title is required */}
      <Toast description="string" />
      {/* @ts-expect-error - title is required */}
      <Toast body="string" />
      {/* @ts-expect-error - `body` prop no longer valid */}
      <Toast title="string" body="string" />

      <Toast title="string" description="string" />
      <Toast title="string" description="string" onClose={() => {}} />
      <Toast
        title="string"
        description="string"
        onClose={() => {}}
        dismissible={true}
      />
    </>,
  );
});
