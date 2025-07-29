import { useRef } from 'react';
import React from 'react';
import { act, render } from '@testing-library/react';

import { useResizeObserver } from './useResizeObserver';

function MockComponent({
  usesControlledRef = false,
  disabled = false,
  onResize,
}: {
  usesControlledRef?: boolean;
  disabled?: boolean;
  onResize: jest.Mock;
}) {
  const controlledRef = useRef<HTMLDivElement>(null);

  const { ref, size } = useResizeObserver({
    target: usesControlledRef ? controlledRef : undefined,
    callback: onResize,
    disabled,
  });

  return (
    <div
      data-testid="mock-element"
      ref={usesControlledRef ? controlledRef : ref}
    >
      My little div of {size?.width} x {size?.height} pixels
    </div>
  );
}

describe('useResizeObserver', () => {
  const observeMock = jest.fn();
  const unobserveMock = jest.fn();
  const disconnectMock = jest.fn();

  let resizeCallback: ResizeObserverCallback;

  beforeAll(() => {
    // override global ResizeObserver class
    global.ResizeObserver = jest.fn(callback => {
      resizeCallback = callback;
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: disconnectMock,
      };
    });
  });

  beforeEach(() => {
    observeMock.mockClear();
    unobserveMock.mockClear();
    disconnectMock.mockClear();
  });

  const testCases = [
    {
      desc: 'with internal ref (created in hook)',
      usesControlledRef: false,
    },
    {
      desc: 'with controlled ref (created by consumer)',
      usesControlledRef: true,
    },
  ];

  testCases.forEach(({ desc, usesControlledRef }) => {
    describe(desc, () => {
      test('observes the target element', () => {
        const { getByTestId } = render(
          <MockComponent
            onResize={jest.fn()}
            usesControlledRef={usesControlledRef}
          />,
        );
        const targetElem = getByTestId('mock-element');
        expect(observeMock).toHaveBeenCalledWith(targetElem);
      });

      test('calls the provided callback when a size change is observed', () => {
        const onResize = jest.fn();
        const { getByTestId } = render(
          <MockComponent
            onResize={onResize}
            usesControlledRef={usesControlledRef}
          />,
        );

        const resizeObserverEntry = {
          contentRect: { width: 100, height: 200 },
        } as ResizeObserverEntry;

        act(() => {
          resizeCallback([resizeObserverEntry], new ResizeObserver(() => {}));
        });

        expect(onResize).toHaveBeenCalled();

        const targetElem = getByTestId('mock-element');
        expect(targetElem.textContent).toBe(
          'My little div of 100 x 200 pixels',
        );
      });

      test('disconnects observer on unmount', () => {
        const { unmount } = render(
          <MockComponent
            onResize={jest.fn()}
            usesControlledRef={usesControlledRef}
          />,
        );

        unmount();
        expect(disconnectMock).toHaveBeenCalled();
      });

      test('does not observe or disconnect if disabled', () => {
        render(
          <MockComponent
            disabled
            onResize={jest.fn()}
            usesControlledRef={usesControlledRef}
          />,
        );

        expect(observeMock).not.toHaveBeenCalled();
        expect(disconnectMock).not.toHaveBeenCalled();
      });
    });
  });
});
