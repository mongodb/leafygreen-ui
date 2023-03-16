import React from 'react';
import {
  getByTestId as globalGetByTestId,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { transitionDuration } from '@leafygreen-ui/tokens';

import { TOAST } from '../constants';
import { ToastProvider } from '../ToastContext';
import { Basic as ContextStory } from '../ToastContext.story';

async function delay(t: number) {
  return await new Promise(_ => setTimeout(_, t));
}

/**
 * Tests interactivity of ToastContext and ToastContainer
 *
 * For hook specific tests,
 * see `useToast.spec` and `useToastReducer.spec`
 *
 * For individual Toast rendering,
 * see `InternalToast.spec` (or `ControlledToast.spec`)
 *
 */
describe('packages/toast/container', () => {
  test('renders children', () => {
    const { getByTestId } = render(
      <ToastProvider>
        <div data-testid="div" />
      </ToastProvider>,
    );

    const div = getByTestId('div');
    expect(div).toBeInTheDocument();
  });

  describe('opening toasts', () => {
    test('opens toast when triggered', async () => {
      const { getByTestId } = render(<ContextStory />);
      const button = getByTestId('toast-trigger');
      userEvent.click(button);
      const toast = await waitFor(() => getByTestId('lg-toast'));
      expect(toast).toBeInTheDocument();
    });

    test('opens multiple toasts', async () => {
      const { getByTestId, getAllByTestId } = render(<ContextStory />);
      const button = getByTestId('toast-trigger');
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      const toasts = await waitFor(() => getAllByTestId('lg-toast'));
      expect(toasts.length).toBe(3);
    });
  });

  describe('hovering', () => {
    test('bottom toasts are hidden by default', async () => {
      const { getByTestId, getAllByTestId } = render(
        <ContextStory timeout={null} />,
      );
      const button = getByTestId('toast-trigger');
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      const toasts = await waitFor(() => getAllByTestId('lg-toast'));
      toasts.forEach((toast, i) => {
        expect(toast).toBeVisible();
        const content = globalGetByTestId(toast, 'lg-toast-content');
        expect(content).toHaveAttribute(
          'aria-hidden',
          i === 0 ? 'false' : 'true',
        );
      });
    });

    test(`shows the top ${TOAST.shortStackCount} toasts`, async () => {
      const { getByTestId, getAllByTestId } = render(
        <ContextStory timeout={null} />,
      );
      const container = getByTestId('lg-toast-region');
      const button = getByTestId('toast-trigger');
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      userEvent.hover(container);
      const toasts = await waitFor(() => getAllByTestId('lg-toast'));
      toasts.forEach(toast => {
        expect(toast).toBeVisible();
        const content = globalGetByTestId(toast, 'lg-toast-content');
        expect(content).toBeVisible();
        expect(content).toHaveAttribute('aria-hidden', 'false');
      });
    });
  });

  describe('closing toasts', () => {
    describe('timeout', () => {
      test('toast closes after timeout', async () => {
        const timeout = 50;
        const { getByTestId } = render(<ContextStory timeout={timeout} />);
        const button = getByTestId('toast-trigger');
        userEvent.click(button);
        const toast = await waitFor(() => getByTestId('lg-toast'));
        expect(toast).toBeInTheDocument();
        await waitForElementToBeRemoved(toast);
      });

      test('toast does _NOT_ close after timeout when container is hovered', async () => {
        const timeout = 50;
        const { getByTestId } = render(<ContextStory timeout={timeout} />);
        const button = getByTestId('toast-trigger');
        userEvent.click(button);
        const container = getByTestId('lg-toast-region');
        const toast = await waitFor(() => getByTestId('lg-toast'));
        expect(toast).toBeInTheDocument();
        userEvent.hover(container);
        await delay(timeout + transitionDuration.slower);
        expect(toast).toBeInTheDocument();
      });

      test.skip('toast does _NOT_ close after timeout if `variant` is progress, and `progress` is < 1', async () => {
        const timeout = 50;
        const { getByTestId } = render(<ContextStory timeout={timeout} />);
        const button = getByTestId('toast-trigger');
        userEvent.click(button);

        const container = getByTestId('lg-toast-region');
        const toast = await waitFor(() => getByTestId('lg-toast'));
        expect(toast).toBeInTheDocument();

        await delay(timeout + transitionDuration.slower);
        expect(toast).toBeInTheDocument();
      });
    });

    describe('dismiss', () => {
      test('toast closes when the dismiss button is clicked', async () => {
        const { getByTestId } = render(<ContextStory timeout={null} />);
        const button = getByTestId('toast-trigger');
        userEvent.click(button);
        const toast = await waitFor(() => getByTestId('lg-toast'));
        const dismiss = getByTestId('lg-toast-dismiss-button');
        userEvent.click(dismiss);
        await waitForElementToBeRemoved(toast);
      });

      test.todo('dismissing the top-most toast collapses the rest');
    });
  });

  describe('onClose', () => {
    describe('is called with different arguments for timeout vs dismiss', () => {
      test('timeout', async () => {
        const closeHandler = jest.fn();
        const timeout = 50;
        const { getByTestId } = render(
          <ContextStory timeout={timeout} onClose={closeHandler} />,
        );
        const button = getByTestId('toast-trigger');
        userEvent.click(button);
        await waitFor(() => {
          expect(closeHandler).toHaveBeenCalledWith(
            expect.objectContaining({
              type: 'timeout',
            }),
          );
        });
      });
      test('dismiss button', async () => {
        const closeHandler = jest.fn();
        const { getByTestId } = render(
          <ContextStory timeout={null} onClose={closeHandler} />,
        );
        const button = getByTestId('toast-trigger');
        userEvent.click(button);
        const dismiss = getByTestId('lg-toast-dismiss-button');
        userEvent.click(dismiss);
        await waitFor(() => {
          expect(closeHandler).toHaveBeenCalledWith(
            expect.objectContaining({
              type: 'click',
            }),
          );
        });
      });
    });
  });
});
