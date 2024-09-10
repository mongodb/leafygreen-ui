import React, { createRef, PropsWithChildren } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import { PopoverContext } from '@leafygreen-ui/leafygreen-provider';

import { PopoverProps } from '../Popover.types';

import { Popover } from './Popover';

function renderPopover(props?: Partial<PopoverProps>) {
  const result = render(
    <Popover {...props} data-testid="popover-test-id">
      Popover Content
    </Popover>,
  );

  const rerenderPopover = (newProps?: Partial<PopoverProps>) => {
    const allProps = { ...props, ...newProps };
    result.rerender(
      <Popover {...allProps} data-testid="popover-test-id">
        Popover Content
      </Popover>,
    );
  };

  return { ...result, rerenderPopover };
}

describe('packages/popover', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container, rerenderPopover } = renderPopover();
      const results = await axe(container);
      expect(results).toHaveNoViolations();

      type AxeResult = Awaited<ReturnType<typeof axe>>;
      let newResults: AxeResult = {} as AxeResult;
      rerenderPopover({ active: true });
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });
  });

  test('accepts a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Popover ref={ref} data-testid="popover-test-id">
        Popover Content
      </Popover>,
    );

    expect(ref.current).toBeDefined();
  });

  test('accepts a portalRef', async () => {
    const portalRef = createRef<HTMLElement>();
    waitFor(() => {
      render(
        <Popover portalRef={portalRef} data-testid="popover-test-id">
          Popover Content
        </Popover>,
      );

      expect(portalRef.current).toBeDefined();
      expect(portalRef.current).toBeInTheDocument();
    });
  });

  test('displays popover when the "active" prop is set', () => {
    const { getByTestId } = renderPopover({ active: true });
    expect(getByTestId('popover-test-id')).toBeInTheDocument();
  });

  test('does not display popover when "active" prop is not set', () => {
    const { container } = renderPopover();
    expect(container.innerHTML.includes('popover-test-id')).toBe(false);
  });

  test('onClick handler is called when popover contents is clicked', () => {
    const clickSpy = jest.fn();
    const { getByText } = renderPopover({ active: true, onClick: clickSpy });

    expect(clickSpy).not.toHaveBeenCalled();
    fireEvent.click(getByText('Popover Content'));
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  test('portals popover content to end of DOM by default', () => {
    const { container, getByTestId } = renderPopover({ active: true });
    expect(container).not.toContain(getByTestId('popover-test-id'));
  });

  test('does not portal popover content to end of DOM when "usePortal" is false', () => {
    const { container } = renderPopover({
      active: true,
      usePortal: false,
    });

    expect(container.innerHTML.includes('popover-test-id')).toBe(true);
  });

  test('applies "portalClassName" to root of portal', () => {
    const { getByTestId } = renderPopover({
      active: true,
      portalClassName: 'test-classname',
    });

    expect(getByTestId('popover-test-id').parentElement?.className).toBe(
      'test-classname',
    );
  });

  test('removes Popover instance on unmount', () => {
    const { container, unmount } = renderPopover();
    unmount();
    expect(container.innerHTML).toBe('');
  });

  test('fires `Transition` lifecycle hooks', async () => {
    const callbacks = {
      onEnter: jest.fn(),
      onEntering: jest.fn(),
      onEntered: jest.fn(),
      onExit: jest.fn(),
      onExiting: jest.fn(),
      onExited: jest.fn(),
    };
    const { rerenderPopover } = renderPopover({
      ...callbacks,
    });

    // Does not call any hooks on initial render
    for (const cb of Object.values(callbacks)) {
      expect(cb).not.toHaveBeenCalled();
    }

    // Calls enter callbacks when active is toggled to true
    rerenderPopover({ active: true });

    expect(callbacks.onEnter).toHaveBeenCalledTimes(1);
    expect(callbacks.onEntering).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(callbacks.onEntered).toHaveBeenCalledTimes(1));

    expect(callbacks.onExit).not.toHaveBeenCalled();
    expect(callbacks.onExiting).not.toHaveBeenCalled();
    expect(callbacks.onExited).not.toHaveBeenCalled();

    // Calls exit callbacks when active is toggled to false
    rerenderPopover({ active: false });

    // Expect the `onEnter*` callbacks to _only_ have been called once (from the previous render)
    expect(callbacks.onEnter).toHaveBeenCalledTimes(1);
    expect(callbacks.onEntering).toHaveBeenCalledTimes(1);
    expect(callbacks.onEntered).toHaveBeenCalledTimes(1);

    expect(callbacks.onExit).toHaveBeenCalledTimes(1);
    expect(callbacks.onExiting).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(callbacks.onExited).toHaveBeenCalledTimes(1));
  });

  describe('within context', () => {
    const setIsPopoverOpenMock = jest.fn();

    function renderPopoverInContext(props?: Partial<PopoverProps>) {
      const MockPopoverProvider = ({ children }: PropsWithChildren<{}>) => {
        return (
          <PopoverContext.Provider
            value={{
              isPopoverOpen: false,
              setIsPopoverOpen: setIsPopoverOpenMock,
            }}
          >
            {children}
          </PopoverContext.Provider>
        );
      };

      const result = render(
        <MockPopoverProvider>
          <Popover {...props} data-testid="popover-test-id">
            Popover Content
          </Popover>
        </MockPopoverProvider>,
      );

      const rerenderPopover = (newProps?: Partial<PopoverProps>) => {
        const allProps = { ...props, ...newProps };
        result.rerender(
          <MockPopoverProvider>
            <Popover {...allProps} data-testid="popover-test-id">
              Popover Content
            </Popover>
          </MockPopoverProvider>,
        );
      };

      return { ...result, rerenderPopover };
    }

    afterEach(() => {
      setIsPopoverOpenMock.mockReset();
    });

    test('toggling `active` calls setIsPopoverOpen', async () => {
      const { rerenderPopover } = renderPopoverInContext();
      expect(setIsPopoverOpenMock).not.toHaveBeenCalled();

      rerenderPopover({ active: true });
      await waitFor(() =>
        expect(setIsPopoverOpenMock).toHaveBeenCalledWith(true),
      );

      rerenderPopover({ active: false });
      expect(setIsPopoverOpenMock).not.toHaveBeenCalledWith(false);
      await waitFor(() =>
        expect(setIsPopoverOpenMock).toHaveBeenCalledWith(false),
      );
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types', () => {
    test('requires children', () => {
      // @ts-expect-error
      <Popover></Popover>;
    });

    test('Requires only children', () => {
      <Popover>Popover Content</Popover>;
    });

    test('does not allow specifying "portalClassName", when "usePortal" is false', () => {
      // @ts-expect-error
      <Popover active usePortal={false} portalClassName="test-classname">
        Popover Content
      </Popover>;
    });

    test('accepts transition lifecycle props', () => {
      <Popover onEnter={() => {}}>test</Popover>;
      <Popover onEntering={() => {}}>test</Popover>;
      <Popover onEntered={() => {}}>test</Popover>;
      <Popover onExit={() => {}}>test</Popover>;
      <Popover onExiting={() => {}}>test</Popover>;
      <Popover onExited={() => {}}>test</Popover>;
    });

    test('accepts `div` props', () => {
      <Popover
        id="some-id"
        data-testid="popover-test-id"
        className="some-classname"
        onClick={() => {}}
        onMouseEnter={() => {}}
        onTransitionEnd={() => {}}
      >
        Popover Content
      </Popover>;
    });
  });
});
