import { useRef } from 'react';
import React from 'react';
import { act, render } from '@testing-library/react';

import { useResizeObserver } from './useResizeObserver';

function MockComponent({
  disabled = false,
  onResize,
}: {
  disabled?: boolean;
  onResize: jest.Mock;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useResizeObserver(ref, onResize, disabled);

  return (
    <div data-testid="mock-element" ref={ref}>
      My little div
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

  test('observes the target element', () => {
    const { getByTestId } = render(<MockComponent onResize={jest.fn()} />);

    const targetElem = getByTestId('mock-element');
    expect(observeMock).toHaveBeenCalledWith(targetElem);
  });

  test('calls the provided callback when a size change is observed', () => {
    const onResize = jest.fn();
    render(<MockComponent onResize={onResize} />);

    const resizeObserverEntry = {
      contentRect: { width: 100, height: 200 },
    } as ResizeObserverEntry;

    // simulate ResizeObserver triggering callback
    act(() => {
      resizeCallback([resizeObserverEntry], new ResizeObserver(() => {}));
    });

    expect(onResize).toHaveBeenCalled();
  });

  test('disconnects observer on unmount', () => {
    const { unmount } = render(<MockComponent onResize={jest.fn()} />);

    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });

  test('does not observe if disabled', () => {
    render(<MockComponent disabled={true} onResize={jest.fn()} />);

    expect(observeMock).not.toHaveBeenCalled();
    expect(disconnectMock).not.toHaveBeenCalled();
  });
});
