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
import { InternalToastProps } from '../InternalToast';
import { ToastProvider } from '../ToastContext';
import { Basic as ContextStory } from '../ToastContext.story';
import {
  ToastProviderProps,
  ToastStack,
} from '../ToastContext/ToastContext.types';
import { makeToast, makeToastStack } from '../ToastContext/utils/makeToast';

async function delay(t: number) {
  return await new Promise(_ => setTimeout(_, t));
}

function renderToastContainer(
  props?: Partial<InternalToastProps>,
  initialValue?: ToastProviderProps['initialValue'],
) {
  const result = render(
    <ToastProvider initialValue={initialValue}>
      <ContextStory {...props} />
    </ToastProvider>,
  );
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
  describe('opening toasts', () => {
    test('opens toast when triggered', async () => {
      const { findByTestId, triggerToast } = renderToastContainer();
      triggerToast();

      const toast = await findByTestId('lg-toast');

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
        const { findByTestId, triggerToast } = renderToastContainer({
          timeout,
        });
        triggerToast();
        const toast = await findByTestId('lg-toast');
        expect(toast).toBeInTheDocument();
        await waitForElementToBeRemoved(toast);
      });

      test('toast does _NOT_ close after timeout when container is hovered', async () => {
        const timeout = 50;
        const { getByTestId, findByTestId, triggerToast } =
          renderToastContainer({ timeout });
        triggerToast();
        const container = getByTestId('lg-toast-region');
        const toast = await findByTestId('lg-toast');
        expect(toast).toBeInTheDocument();
        userEvent.hover(container);
        await delay(timeout + transitionDuration.slower);
        expect(toast).toBeInTheDocument();
      });

      test('toast does _NOT_ close after timeout if `variant` is progress, and `progress` < 1', async () => {
        const timeout = 50;
        const { findByTestId, triggerToast } = renderToastContainer({
          timeout,
          variant: 'progress',
          progress: 0,
        });
        triggerToast();

        const toast = await findByTestId('lg-toast');
        expect(toast).toBeInTheDocument();

        await delay(timeout + transitionDuration.slower);
        expect(toast).toBeInTheDocument();
      });

      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('toast does close after timeout once `progress` == 1', async () => {
        const timeout = 50;
        const { findByTestId, triggerToast } = renderToastContainer({
          timeout,
          variant: 'progress',
          progress: 0,
        });
        triggerToast();

        const toast = await findByTestId('lg-toast');
        expect(toast).toBeInTheDocument();

        await delay(timeout + transitionDuration.slower);
        await waitForElementToBeRemoved(toast);
      });
    });

    describe('dismiss', () => {
      test('toast closes when the dismiss button is clicked', async () => {
        const timeout = null;
        const { getByTestId, findByTestId, triggerToast } =
          renderToastContainer({ timeout });
        triggerToast();
        const toast = await findByTestId('lg-toast');
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

  describe('initial state', () => {
    test('renders nothing initially', async () => {
      const { queryByTestId } = renderToastContainer();
      const toast = await waitFor(() => queryByTestId('lg-toast'));
      expect(toast).not.toBeInTheDocument();
    });

    test('renders initial stack', async () => {
      const initialValue: ToastStack = makeToastStack([
        makeToast({ title: 'test' }),
      ]);
      const { findByTestId } = renderToastContainer({}, initialValue);

      const toast = await findByTestId('lg-toast');
      expect(toast).toBeInTheDocument();
    });
  });
});
