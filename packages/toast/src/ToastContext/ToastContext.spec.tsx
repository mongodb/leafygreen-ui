import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { transitionDuration } from '@leafygreen-ui/tokens';

import { Basic as ContextStory } from './ToastContext.story';
import { ToastProvider } from '.';

async function delay(t: number) {
  return await new Promise(_ => setTimeout(_, t));
}

/**
 * Tests interactivity of ToastContext and ToastContainer
 *
 * For hook specific tests,
 * see `useToast.spec.ts`
 *
 * For individual Toast rendering,m
 * see `InternalToast.spec.tsx` (or `ControlledToast.spec.tsx`)
 *
 */
describe('packages/toast/context-provider', () => {
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

  describe('closing toasts', () => {
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
      const timeout = 100;
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

    test.todo(
      'toast does _NOT_ close after timeout if `variant` is progress, and `progress` is < 1s',
      // async () => {},
    );

    test('toast closes when the dismiss button is clicked', async () => {
      const { getByTestId } = render(<ContextStory timeout={null} />);
      const button = getByTestId('toast-trigger');
      userEvent.click(button);
      const toast = await waitFor(() => getByTestId('lg-toast'));
      const dismiss = getByTestId('lg-toast-dismiss-button');
      userEvent.click(dismiss);
      await waitForElementToBeRemoved(toast);
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
