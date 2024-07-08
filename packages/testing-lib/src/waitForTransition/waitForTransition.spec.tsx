// eslint-disable-next-line simple-import-sort/imports
import React, { TransitionEventHandler } from 'react';
import { render, waitFor } from '@testing-library/react';

import { waitForTransition } from '.';

const renderTransitionElement = (
  shouldEnter: boolean,
  onTransitionEnd: TransitionEventHandler,
) => {
  const result = render(
    <div
      data-testid="test-div"
      onTransitionEnd={onTransitionEnd}
      style={{
        transition: 'opacity 10ms linear',
        opacity: shouldEnter ? 1 : 0,
      }}
    >
      {shouldEnter.toString()}
    </div>,
  );

  const rerender = (
    shouldEnter: boolean,
    onTransitionEnd: TransitionEventHandler,
  ) =>
    result.rerender(
      <div
        data-testid="test-div"
        onTransitionEnd={onTransitionEnd}
        style={{
          transition: 'opacity 10ms linear',
          opacity: shouldEnter ? 1 : 0,
        }}
      >
        {shouldEnter.toString()}
      </div>,
    );

  return {
    ...result,
    rerender,
  };
};

describe('packages/testing-lib/waitForTransition', () => {
  describe('triggers css transition handlers', () => {
    test('on enter transition', async () => {
      const onTransition = jest.fn();
      const renderResult = renderTransitionElement(false, onTransition);
      const testDiv = await renderResult.findByTestId('test-div');

      /** ENTER */
      renderResult.rerender(true, onTransition);

      // onEnter will be called immediately
      await waitFor(() => {
        // onEntering will be called after a timeout
        // but onTransition is not called until CSS transitions are finished
        expect(onTransition).not.toHaveBeenCalled();
      });

      await waitForTransition(testDiv);

      // onTransition is finally called after we wait for the transition
      expect(onTransition).toHaveBeenCalledTimes(1);
    });

    test('on exit transition', async () => {
      const onTransition = jest.fn();

      const renderResult = renderTransitionElement(false, onTransition);
      const testDiv = await renderResult.findByTestId('test-div');

      /** ENTER */
      renderResult.rerender(true, onTransition);
      await waitForTransition(testDiv);

      /** EXIT */
      renderResult.rerender(false, onTransition);

      // onExit will be called immediately
      await waitFor(() => {
        // onExiting will be called after a timeout
        // but onExited is not called until CSS transitions are finished
        expect(onTransition).toHaveBeenCalledTimes(1);
      });

      await waitForTransition(testDiv);
      // onTransition is finally called after we wait for the transition
      expect(onTransition).toHaveBeenCalledTimes(2);
    });
  });
});
