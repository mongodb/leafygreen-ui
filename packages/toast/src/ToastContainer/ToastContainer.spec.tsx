import React from 'react';
import ReactDOM from 'react-dom';
import {
  getByTestId as globalGetByTestId,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import { transitionDuration } from '@leafygreen-ui/tokens';

import { TOAST } from '../constants';
import { InternalToastProps } from '../InternalToast';
import { Basic as ContextStory } from '../ToastContext.story';
import { ToastProvider, useToast } from '../ToastContext';

async function delay(t: number) {
  return await new Promise(_ => setTimeout(_, t));
}

function renderToastContainer(props?: Partial<InternalToastProps>) {
  const result = render(<ContextStory {...props} />);
  const button = result.getByTestId('toast-trigger');

  function triggerToast() {
    userEvent.click(button);
  }

  return {
    triggerToast,
    ...result,
  };
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
  beforeAll(() => {
    // eslint-disable-next-line react/display-name
    ReactDOM.createPortal = node => node as React.ReactPortal;
  });

  describe('opening toasts', () => {
    test('opens toast when triggered', async () => {
      const { getByTestId, triggerToast } = renderToastContainer();
      triggerToast();

      // const { result, rerender } = renderHook(useToast, {
      //   wrapper: ToastProvider,
      // });

      // const { pushToast } = result.current;

      // pushToast({
      //   title: 'Some Toast',
      // });

      // rerender();

      const toast = await waitFor(() => getByTestId('lg-toast'));

      expect(toast).toBeInTheDocument();
    });

    test('opens multiple toasts', async () => {
      const { getAllByTestId, triggerToast } = renderToastContainer();
      triggerToast();
      triggerToast();
      triggerToast();
      const toasts = await waitFor(() => getAllByTestId('lg-toast'));
      expect(toasts.length).toBe(3);
    });
  });

  describe('hovering', () => {
    test('bottom toasts are hidden by default', async () => {
      const { getAllByTestId, triggerToast } = renderToastContainer();
      triggerToast();
      triggerToast();
      triggerToast();
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
      const { getAllByTestId, getByTestId, triggerToast } =
        renderToastContainer();
      triggerToast();
      triggerToast();
      triggerToast();
      const container = getByTestId('lg-toast-region');
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
        const { getByTestId, triggerToast } = renderToastContainer({ timeout });
        triggerToast();
        const toast = await waitFor(() => getByTestId('lg-toast'));
        expect(toast).toBeInTheDocument();
        await waitForElementToBeRemoved(toast);
      });

      test('toast does _NOT_ close after timeout when container is hovered', async () => {
        const timeout = 50;
        const { getByTestId, triggerToast } = renderToastContainer({ timeout });
        triggerToast();
        const container = getByTestId('lg-toast-region');
        const toast = await waitFor(() => getByTestId('lg-toast'));
        expect(toast).toBeInTheDocument();
        userEvent.hover(container);
        await delay(timeout + transitionDuration.slower);
        expect(toast).toBeInTheDocument();
      });

      test('toast does _NOT_ close after timeout if `variant` is progress, and `progress` < 1', async () => {
        const timeout = 50;
        const { getByTestId, triggerToast } = renderToastContainer({
          timeout,
          variant: 'progress',
          progress: 0,
        });
        triggerToast();

        const toast = await waitFor(() => getByTestId('lg-toast'));
        expect(toast).toBeInTheDocument();

        await delay(timeout + transitionDuration.slower);
        expect(toast).toBeInTheDocument();
      });

      test.skip('toast does close after timeout once `progress` == 1', async () => {
        const timeout = 50;
        const { getByTestId, triggerToast } = renderToastContainer({
          timeout,
          variant: 'progress',
          progress: 0,
        });
        triggerToast();

        const toast = await waitFor(() => getByTestId('lg-toast'));
        expect(toast).toBeInTheDocument();

        await delay(timeout + transitionDuration.slower);
        await waitForElementToBeRemoved(toast);
      });
    });

    describe('dismiss', () => {
      test('toast closes when the dismiss button is clicked', async () => {
        const timeout = null;
        const { getByTestId, triggerToast } = renderToastContainer({ timeout });
        triggerToast();
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
        const { triggerToast } = renderToastContainer({
          timeout,
          onClose: closeHandler,
        });
        triggerToast();

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
        const timeout = null;

        const { getByTestId, triggerToast } = renderToastContainer({
          timeout,
          onClose: closeHandler,
        });
        triggerToast();
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
