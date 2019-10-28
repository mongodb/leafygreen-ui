import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import LeafyGreenProvider, { UsingKeyboardContext } from '.';
import { NavigationKeyCodes } from './LeafyGreenProvider';

afterAll(cleanup);

describe('packages/leafygreen-provider', () => {
  describe('LeafyGreenProvider', () => {
    const childTestID = 'focus-state';

    function TestContextComponent() {
      const { usingKeyboard } = useContext(UsingKeyboardContext);

      return (
        <div data-testid={childTestID}>
          {usingKeyboard !== undefined ? usingKeyboard.toString() : ''}
        </div>
      );
    }

    const { container, getByTestId } = render(
      <LeafyGreenProvider>
        <TestContextComponent />
      </LeafyGreenProvider>,
    );

    const testChild = getByTestId(childTestID);

    test('only renders children in the DOM', () => {
      expect(container.firstChild).toBe(testChild);
    });

    describe('when initialStates prop is undefined', () => {
      test('usingKeyboard is initialized as false', () => {
        expect(testChild.textContent).toBe('false');
      });

      Object.values(NavigationKeyCodes).forEach(keyCode => {
        test(`usingKeyboard is true after keydown event with keyCode: "${keyCode}" fires`, () => {
          fireEvent.keyDown(document, {
            bubbles: true,
            keyCode: keyCode.toString(),
          });

          expect(testChild.textContent).toBe('true');
        });
      });

      // Partially cleanup, partially ensuring state is reset after each handled keydown event
      test(`usingKeyboard is false after mousedown event fires`, () => {
        fireEvent.mouseDown(document, {
          bubbles: true,
        });

        expect(testChild.textContent).toBe('false');
      });
    });

    describe('when initialStates prop is set', () => {
      test('', () => {});
    });

    test('useShowFocus returns "false" when LeafyGreenProvider is an ancestor', () => {});
  });
});
