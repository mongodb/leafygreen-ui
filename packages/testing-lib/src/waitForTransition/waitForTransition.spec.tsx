import React, { createRef } from 'react';
import { Transition } from 'react-transition-group';
import { css } from '@emotion/react';
import { render, waitFor } from '@testing-library/react';

import { waitForTransition } from '.';

const ref = createRef<HTMLElement>();

const callbacks = {
  onEnter: jest.fn(),
  onEntered: jest.fn(),
  onEntering: jest.fn(),
  onExit: jest.fn(),
  onExited: jest.fn(),
  onExiting: jest.fn(),
};

const renderTransitionElement = (in0: boolean) => {
  const result = render(
    <Transition
      nodeRef={ref}
      in={in0}
      timeout={0}
      onEntered={callbacks.onEntered}
      onExited={callbacks.onExited}
    >
      {state => (
        <div
          data-testid="test-div"
          className={css`
            opacity: ${state === 'entered' ? 1 : 0};
          `}
        >
          {state}
        </div>
      )}
    </Transition>,
  );

  const rerender = (in1: boolean) =>
    result.rerender(
      <Transition
        nodeRef={ref}
        in={in1}
        timeout={0}
        onEntered={callbacks.onEntered}
        onExited={callbacks.onExited}
      >
        {state => (
          <div
            data-testid="test-div"
            className={css`
              opacity: ${state === 'entered' ? 1 : 0};
            `}
          >
            {state}
          </div>
        )}
      </Transition>,
    );

  return {
    ...result,
    rerender,
  };
};

describe('packages/testing-lib/waitForTransition', () => {
  afterEach(() => {
    Object.values(callbacks).forEach(cb => cb.mockReset());
  });

  describe('triggers react-transition-group handlers', () => {
    test('onEntered', async () => {
      const renderResult = renderTransitionElement(false);
      const testDiv = await renderResult.findByTestId('test-div');

      /** ENTER */
      renderResult.rerender(true);

      // onEnter will be called immediately
      await waitFor(() => {
        // onEntering will be called after a timeout
        // but onEntered is not called until CSS transitions are finished
        expect(callbacks.onEntered).not.toHaveBeenCalled();
      });

      await waitForTransition(testDiv);

      // onEntered is finally called after we wait for the transition
      expect(callbacks.onEntered).toHaveBeenCalledTimes(1);
    });

    test('onExited', async () => {
      const renderResult = renderTransitionElement(false);
      const testDiv = await renderResult.findByTestId('test-div');

      await waitFor(() => /** ENTER */ renderResult.rerender(true));

      /** EXIT */
      renderResult.rerender(false);

      // onExit will be called immediately
      await waitFor(() => {
        // onExiting will be called after a timeout
        // but onExited is not called until CSS transitions are finished
        expect(callbacks.onExited).not.toHaveBeenCalled();
      });

      await waitForTransition(testDiv);
      // onEntered is finally called after we wait for the transition
      expect(callbacks.onExited).toHaveBeenCalledTimes(1);
    });
  });
});
