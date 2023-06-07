import React from 'react';
import {
  cleanup,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { toastPortalClassName, ToastProvider } from '../ToastContext';

import { ControlledToast as Toast } from './ControlledToast';

async function expectElementToNotBeRemoved(element: HTMLElement) {
  try {
    await waitForElementToBeRemoved(element);
    throw new Error('Expected to catch error.');
  } catch (error) {
    // eslint-disable-next-line jest/no-try-expect
    if (error instanceof Error) {
      expect(error.toString()).toMatch(
        'Timed out in waitForElementToBeRemoved.',
      );
    }
  }
}
/**
 * This suite checks rendering specific to the controlled behavior.
 * i.e. `open` and `onClose` props.
 *
 * Other individual toast behavior is tested in `InternalToast.spec`
 * and multi-toast behavior is tested in `ToastContainer.spec`
 */
describe('packages/toast/controlled', () => {
  // Clear the portals after each test
  afterEach(() => {
    cleanup();
    const portal = document.querySelector('.' + toastPortalClassName);

    if (portal) {
      document.body.removeChild(portal);
    }
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(
        <Toast open={true} onClose={() => {}} title={'hello world'} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('`open` prop', () => {
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

    test('does not render when `open` is true and component is unmounted', async () => {
      const { queryByTestId } = render(
        <ToastProvider>
          {false && (
            <Toast
              open={true}
              title="Test 1"
              onClose={() => {}}
              data-testid="test-toast1b"
            />
          )}
        </ToastProvider>,
      );

      const toast = await waitFor(() => queryByTestId('test-toast1b'));
      expect(toast).not.toBeInTheDocument();
    });

    test('unmounts when `open` is true and component render is toggled to false', async () => {
      let shouldRender = true;
      const { findByTestId, rerender } = render(
        <ToastProvider>
          {shouldRender && (
            <Toast
              open={true}
              title="Test 1"
              onClose={() => {}}
              data-testid="test-toast1"
            />
          )}
        </ToastProvider>,
      );
      const toast = await findByTestId('test-toast1');
      expect(toast).toBeInTheDocument();

      shouldRender = false;
      rerender(
        <ToastProvider>
          {shouldRender && (
            <Toast
              open={true}
              title="Test 1"
              onClose={() => {}}
              data-testid="test-toast1"
            />
          )}
        </ToastProvider>,
      );

      await waitForElementToBeRemoved(toast);
      expect(toast).not.toBeInTheDocument();
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
