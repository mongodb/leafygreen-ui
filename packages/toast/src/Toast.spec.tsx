import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Toast, { ToastProps, ToastVariants } from './Toast';

function renderToast(props: ToastProps) {
  return render(<Toast {...props} />);
}

describe('packages/toast', () => {
  describe(`when 'open' prop is`, () => {
    test(`undefined, Toast doesn't render`, () => {
      const { queryByRole } = renderToast({
        body: 'hello world',
        variant: ToastVariants.success,
      });
      const toast = queryByRole('status');
      expect(toast).not.toBeInTheDocument();
    });

    test(`false, Toast doesn't render`, () => {
      const { queryByRole } = renderToast({
        body: 'hello world',
        variant: ToastVariants.success,
        open: false,
      });

      const toast = queryByRole('status');
      expect(toast).not.toBeInTheDocument();
    });

    test('true, Toast is visible', () => {
      const { queryByRole } = renderToast({
        body: 'hello world',
        variant: ToastVariants.success,
        open: true,
      });

      const toast = queryByRole('status');
      expect(toast).toBeInTheDocument();
      expect(toast).toBeVisible();
    });
  });

  describe(`when 'close' prop is`, () => {
    test('undefined, Modal is closed', () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: ToastVariants.success,
      });

      const toast = queryByRole('button');
      expect(toast).not.toBeInTheDocument();
    });

    test('a function, Modal is closed', () => {
      const mockFn = jest.fn();
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: ToastVariants.success,
        close: mockFn,
      });

      const closeButton = queryByRole('button');
      expect(closeButton).toBeInTheDocument();
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
        variant: ToastVariants.progress,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toBeVisible();
    });

    test(`when 'progress' is '0'`, () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: ToastVariants.progress,
        progress: 0,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toBeVisible();
    });

    test(`when 'progress' is '0.5'`, () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: ToastVariants.progress,
        progress: 0,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toBeVisible();
    });
  });

  describe(`when 'variant' is not 'progress', the progress bar does not render`, () => {
    test(`when 'progress' is undefined`, () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: ToastVariants.success,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).not.toBeInTheDocument();
    });

    test(`when 'progress' is '0'`, () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: ToastVariants.success,
        progress: 0,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).not.toBeInTheDocument();
    });

    test(`when 'progress' is '0.5'`, () => {
      const { queryByRole } = renderToast({
        open: true,
        body: 'hello world',
        variant: ToastVariants.success,
        progress: 0,
      });

      const progressBar = queryByRole('progressbar');
      expect(progressBar).not.toBeInTheDocument();
    });
  });

  describe(`when 'title' prop is`, () => {
    test('undefined, the title element does not render', () => {
      const { queryByTestId } = renderToast({
        open: true,
        body: 'hello world',
        variant: ToastVariants.success,
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
        variant: ToastVariants.success,
      });

      const body = queryByText(titleText);
      expect(body).toBeInTheDocument();
    });

    test('a JSX element, the title element renders', () => {
      const titleText = 'this is the title';
      const titleElement = <span>{titleText}</span>;
      const { queryByText } = renderToast({
        open: true,
        body: 'hello world',
        title: titleElement,
        variant: ToastVariants.success,
      });

      const titleSpan = queryByText(titleText);
      expect(titleSpan).toBeInTheDocument();
    });
  });

  describe(`when 'body' prop is`, () => {
    test('a string, the title element renders', () => {
      const bodyText = 'this is the title';
      const { queryByText } = renderToast({
        open: true,
        body: bodyText,
        variant: ToastVariants.success,
      });

      const body = queryByText(bodyText);
      expect(body).toBeInTheDocument();
    });

    test('a JSX element, the body element renders', () => {
      const bodyText = 'this is the body';
      const bodyElement = <span>{bodyText}</span>;
      const { queryByText } = renderToast({
        open: true,
        body: bodyElement,
        variant: ToastVariants.success,
      });

      const bodySpan = queryByText(bodyText);
      expect(bodySpan).toBeInTheDocument();
    });
  });
});
