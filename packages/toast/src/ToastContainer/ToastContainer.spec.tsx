import React from 'react';
import { act } from 'react-dom/test-utils';
import { composeStory, ReactRenderer } from '@storybook/react';
import { ComponentAnnotations } from '@storybook/types';
import {
  cleanup,
  getByTestId as globalGetByTestId,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import defaults from 'lodash/defaults';
import range from 'lodash/range';

import { transitionDuration } from '@leafygreen-ui/tokens';

import { TOAST_CONSTANTS } from '../constants';
import { InternalToastProps } from '../InternalToast';
import Meta, { Basic } from '../Toast.stories';
import { makeToast, makeToastStack } from '../ToastContext/utils/makeToast';
import { ToastProvider, ToastProviderProps, ToastStack } from '..';

const ContextStory = composeStory(
  Basic,
  Meta as ComponentAnnotations<ReactRenderer>,
);

async function delay(t: number): Promise<void> {
  return await new Promise(_ => setTimeout(_, t));
}

function renderToastContainer(
  _props?: Partial<InternalToastProps>,
  initialValue?: ToastProviderProps['initialValue'],
) {
  const result = render(
    <ToastProvider initialValue={initialValue}>
      <ContextStory {...defaults(_props, { title: 'test' })} />
    </ToastProvider>,
  );

  const rerenderWithProps = (_newProps: Partial<InternalToastProps>) =>
    result.rerender(
      <ToastProvider initialValue={initialValue}>
        <ContextStory {...defaults(_newProps, _props, { title: 'test' })} />
      </ToastProvider>,
    );

  const button = result.getByTestId('toast-trigger');

  function triggerToast() {
    userEvent.click(button);
  }

  return {
    triggerToast,
    rerenderWithProps,
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
  afterEach(cleanup);

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
      act(() => triggerToast());
      act(() => triggerToast());
      act(() => triggerToast());
      const toasts = await waitFor(() => getAllByTestId('lg-toast'));
      toasts.forEach((toast, i) => {
        expect(toast).toBeInTheDocument();
        const content = globalGetByTestId(toast, 'lg-toast-content');
        expect(content).toHaveAttribute(
          'aria-hidden',
          i === 0 ? 'false' : 'true',
        );
      });
    });

    // TODO: Chromatic
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip(`shows the top ${TOAST_CONSTANTS.shortStackCount} toasts`, async () => {
      const { getAllByTestId, getByTestId, triggerToast } =
        renderToastContainer();
      act(() => triggerToast());
      act(() => triggerToast());
      act(() => triggerToast());
      const container = getByTestId('lg-toast-region');
      userEvent.hover(container);
      const toasts = await waitFor(() => getAllByTestId('lg-toast'));

      toasts.forEach(toast => {
        expect(toast).toBeInTheDocument();
        const content = globalGetByTestId(toast, 'lg-toast-content');

        // This test fails on SSR
        if (process.env['JEST_ENV'] === 'client') {
          expect(content).toBeVisible();
          expect(content).toHaveAttribute('aria-hidden', 'false');
        }
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
        const { getAllByTestId, findByTestId, triggerToast } =
          renderToastContainer({ timeout });
        triggerToast();
        const container = getAllByTestId('lg-toast-scroll-container')[0];
        const toast = await findByTestId('lg-toast');
        expect(toast).toBeInTheDocument();
        userEvent.hover(container);
        await act(() => delay(timeout + transitionDuration.slower));
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

        await act(() => delay(timeout + transitionDuration.slower));
        expect(toast).toBeInTheDocument();
      });

      // Skipping since `rerender` is not working as expected
      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('toast _does_ close after timeout once `progress === 1`', async () => {
        const timeout = 50;

        const { rerenderWithProps, triggerToast, findByTestId } =
          renderToastContainer({
            title: 'test',
            progress: 0,
            variant: 'progress',
            timeout,
          });
        triggerToast();

        rerenderWithProps({
          title: 'test',
          progress: 1,
          variant: 'progress',
          timeout,
        });

        const toast = await findByTestId('lg-toast');

        // TODO: Chromatic
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

      test('dismissing the top-most toast collapses the rest', async () => {
        const timeout = null;
        const { getAllByTestId, findAllByTestId, triggerToast } =
          renderToastContainer(
            { timeout },
            makeToastStack(
              range(3).map(i => makeToast({ title: `Toast ${i}` })),
            ),
          );
        triggerToast();
        const toasts = await findAllByTestId('lg-toast');
        const dismissButtons = getAllByTestId('lg-toast-dismiss-button');
        const topToastButton = dismissButtons[0];
        userEvent.click(topToastButton);

        const bottomToast = toasts[2];
        const bottomToastContent = globalGetByTestId(
          bottomToast,
          'lg-toast-content',
        );

        // TODO: Chromatic
        await waitFor(() => {
          expect(bottomToastContent).toHaveAttribute('aria-hidden', 'true');
        });
      });

      test('dismissing an inner toast does not collapse the stack', async () => {
        const timeout = null;
        const { getAllByTestId, findAllByTestId, triggerToast } =
          renderToastContainer(
            { timeout },
            makeToastStack(
              range(3).map(i => makeToast({ title: `Toast ${i}` })),
            ),
          );
        triggerToast();
        const toasts = await findAllByTestId('lg-toast');
        const dismissButtons = getAllByTestId('lg-toast-dismiss-button');
        const middleToastButton = dismissButtons[1];
        userEvent.click(middleToastButton);

        const topToast = toasts[2];
        const topToastContent = globalGetByTestId(topToast, 'lg-toast-content');
        const bottomToast = toasts[2];
        const bottomToastContent = globalGetByTestId(
          bottomToast,
          'lg-toast-content',
        );

        // TODO: Chromatic
        await waitFor(() => {
          expect(topToastContent).toHaveAttribute('aria-hidden', 'false');
          expect(bottomToastContent).toHaveAttribute('aria-hidden', 'false');
        });
      });
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
