import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { expectElementToNotBeRemoved } from '@leafygreen-ui/testing-lib';

import { toastPortalClassName } from '../ToastContainer/ToastContainer';
import { ToastProvider } from '../ToastContext';

import { Toast } from './Toast';

describe('packages/toast/controlled', () => {
  // Clear the portals after each test
  afterEach(() => {
    const portal = document.querySelector('.' + toastPortalClassName);

    if (portal) {
      document.body.removeChild(portal);
    }
  });

  describe('open', () => {
    test('renders when `open` is true', async () => {
      const { findByTestId } = render(
        <ToastProvider>
          <Toast
            open={true}
            title="Test 1"
            onClose={() => {}}
            data-testid="test-toast1"
          />
        </ToastProvider>,
      );

      const toast = await findByTestId('test-toast1');
      expect(toast).toBeInTheDocument();
    });

    test('does not render when `open` is false', async () => {
      const { queryByTestId } = render(
        <ToastProvider>
          <Toast
            open={false}
            title="Test 2"
            onClose={() => {}}
            data-testid="test-toast2"
          />
        </ToastProvider>,
      );

      const toast = await waitFor(() => queryByTestId('test-toast2'));
      expect(toast).not.toBeInTheDocument();
    });

    test('is closed when `open` is set back to false', async () => {
      const { findByTestId, rerender } = render(
        <ToastProvider>
          <Toast
            open={true}
            title="Test 3"
            onClose={() => {}}
            data-testid="test-toast3"
          />
        </ToastProvider>,
      );
      const toast = await findByTestId('test-toast3');

      rerender(
        <ToastProvider>
          <Toast
            open={false}
            title="Test 3"
            onClose={() => {}}
            data-testid="test-toast3"
          />
        </ToastProvider>,
      );

      await waitForElementToBeRemoved(toast);
      expect(toast).not.toBeInTheDocument();
    });

    // eslint-disable-next-line jest/expect-expect
    test('does not close until manually closed', async () => {
      const { findByTestId } = render(
        <ToastProvider>
          <Toast
            open={true}
            title="Title"
            onClose={() => {}}
            data-testid="toast4"
            timeout={100}
          />
        </ToastProvider>,
      );
      const toast = await findByTestId('toast4');

      // TODO: make this test pass
      await expectElementToNotBeRemoved(toast);
    });
  });

  describe('onClose', () => {
    test('`onClose` method is called when the close button is clicked', async () => {
      const handleClose = jest.fn();

      const { findByTestId } = render(
        <ToastProvider>
          <Toast open={true} title="Test 1" onClose={handleClose} />
        </ToastProvider>,
      );

      const closeBtn = await findByTestId('lg-toast-dismiss-button');
      userEvent.click(closeBtn);
      expect(handleClose).toHaveBeenCalled();
    });
    test('`onClose` method is called after timeout', () => {
      const handleClose = jest.fn();

      render(
        <ToastProvider>
          <Toast
            open={true}
            title="Test 1"
            onClose={handleClose}
            timeout={100}
          />
        </ToastProvider>,
      );

      setTimeout(() => {
        expect(handleClose).toHaveBeenCalled();
      }, 101);
    });
  });
});
