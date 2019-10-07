import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Tooltip from '.';

afterAll(cleanup);

describe('packages/Tooltip', () => {
  const buttonText = 'trigger button';

  describe('when uncontrolled', () => {
    const triggerEvent = 'click';

    const { getByText, getByTestId } = render(
      <>
        <div>backdrop content</div>
        <Tooltip
          trigger={<button>{buttonText}</button>}
          triggerEvent={triggerEvent}
        >
          <div data-testid="uncontrolled-tooltip">Uncontrolled tooltip!</div>
        </Tooltip>
      </>,
    );

    const button = getByText(buttonText);
    const tooltip = getByTestId('uncontrolled-tooltip');
    const backdrop = getByText('backdrop content');

    test(`renders a button to the DOM with ${buttonText}`, () => {
      expect(button).toBeInTheDocument();
      expect(button.tagName.toLowerCase()).toBe('button');
    });

    test(`${triggerEvent} triggers opening and closing of tooltip`, () => {
      fireEvent.click(button);
      expect(tooltip).toBeVisible();

      fireEvent.click(button);
      expect(tooltip).not.toBeVisible();
    });

    test('backdrop clicks close the tooltip', () => {
      fireEvent.click(button);
      expect(tooltip).toBeVisible();

      fireEvent.click(backdrop);
      expect(tooltip).not.toBeVisible();
    });

    test('escape click closes tooltip', () => {
      fireEvent.click(button);
      expect(tooltip).toBeVisible();

      fireEvent.keyDown(button, { key: 'Escape', keyCode: 27 });
      expect(tooltip).not.toBeVisible();
    });
  });

  describe('when controlled', () => {
    const open = true;
    const setOpen = jest.fn();

    const { getByTestId } = render(
      <Tooltip
        open={open}
        setOpen={setOpen}
        trigger={<button>{buttonText}</button>}
      >
        <div data-testid="controlled-tooltip">Controlled tooltip!</div>
      </Tooltip>,
    );

    const tooltip = getByTestId('controlled-tooltip');

    test(
      'renders initial state based on open prop',
      expect(tooltip).toBeVisible,
    );
  });
});
