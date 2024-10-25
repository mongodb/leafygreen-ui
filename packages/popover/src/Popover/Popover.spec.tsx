import React, { createRef, PropsWithChildren, useRef, useState } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import Button from '@leafygreen-ui/button';
import { ModalPopoverContext } from '@leafygreen-ui/leafygreen-provider';

import { Popover } from './Popover';
import { DismissMode, PopoverProps, RenderMode } from './Popover.types';

type RTLInlinePopoverProps = Partial<
  Omit<
    PopoverProps,
    | 'dismissMode'
    | 'onToggle'
    | 'portalClassName'
    | 'portalContainer'
    | 'portalRef'
    | 'renderMode'
    | 'scrollContainer'
    | 'usePortal'
  >
>;

type RTLPortalPopoverProps = Partial<
  Omit<PopoverProps, 'dismissMode' | 'onToggle' | 'renderMode' | 'usePortal'>
>;

type RTLTopLayerPopoverProps = Partial<
  Omit<
    PopoverProps,
    | 'portalClassName'
    | 'portalContainer'
    | 'portalRef'
    | 'renderMode'
    | 'scrollContainer'
    | 'usePortal'
  >
>;

function TopLayerPopoverWithReference(props?: RTLTopLayerPopoverProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState(props?.active ?? false);

  return (
    <>
      <Button
        data-testid="popover-reference-element"
        onClick={() => setActive(active => !active)}
        ref={buttonRef}
      >
        Open Popover
      </Button>
      <Popover
        {...props}
        active={active}
        data-testid="popover-test-id"
        refEl={buttonRef}
        renderMode={RenderMode.TopLayer}
      >
        Popover Content
      </Popover>
    </>
  );
}

function renderTopLayerPopover(props?: RTLTopLayerPopoverProps) {
  const result = render(
    <>
      <TopLayerPopoverWithReference {...props} />
    </>,
  );

  const button = result.getByTestId('popover-reference-element');

  const rerenderPopover = (newProps?: RTLTopLayerPopoverProps) => {
    const allProps = { ...props, ...newProps };
    result.rerender(
      <Popover
        {...allProps}
        data-testid="popover-test-id"
        renderMode={RenderMode.TopLayer}
      >
        Popover Content
      </Popover>,
    );
  };

  return { button, ...result, rerenderPopover };
}

describe('packages/popover', () => {
  describe(`renderMode=${RenderMode.Inline}`, () => {
    function renderInlinePopover(props?: RTLInlinePopoverProps) {
      const result = render(
        <Popover
          {...props}
          data-testid="popover-test-id"
          renderMode={RenderMode.Inline}
          usePortal={false}
        >
          Popover Content
        </Popover>,
      );

      const rerenderPopover = (newProps?: RTLInlinePopoverProps) => {
        const allProps = { ...props, ...newProps };
        result.rerender(
          <Popover
            {...allProps}
            data-testid="popover-test-id"
            renderMode={RenderMode.Inline}
            usePortal={false}
          >
            Popover Content
          </Popover>,
        );
      };

      return { ...result, rerenderPopover };
    }

    describe('a11y', () => {
      test('does not have basic accessibility issues', async () => {
        const { container, rerenderPopover } = renderInlinePopover();
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

    test('displays popover inline when the `active` prop is `true`', () => {
      const { container, getByTestId } = renderInlinePopover({ active: true });
      expect(getByTestId('popover-test-id')).toBeInTheDocument();
      expect(container.innerHTML.includes('popover-test-id')).toBeTruthy();
    });

    test('does NOT display popover when the `active` prop is `false`', () => {
      const { queryByTestId } = renderInlinePopover({ active: false });
      expect(queryByTestId('popover-test-id')).toBeNull();
    });
  });

  describe(`renderMode=${RenderMode.Portal}`, () => {
    function renderPortalPopover(props?: RTLPortalPopoverProps) {
      const result = render(
        <Popover
          {...props}
          data-testid="popover-test-id"
          renderMode={RenderMode.Portal}
          usePortal={true}
        >
          Popover Content
        </Popover>,
      );

      const rerenderPopover = (newProps?: RTLPortalPopoverProps) => {
        const allProps = { ...props, ...newProps };
        result.rerender(
          <Popover
            {...allProps}
            data-testid="popover-test-id"
            renderMode={RenderMode.Portal}
            usePortal={true}
          >
            Popover Content
          </Popover>,
        );
      };

      return { ...result, rerenderPopover };
    }

    describe('a11y', () => {
      test('does not have basic accessibility issues', async () => {
        const { container, rerenderPopover } = renderPortalPopover();
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

    test('displays popover when the `active` prop is `true`', () => {
      const { getByTestId } = renderPortalPopover({ active: true });
      expect(getByTestId('popover-test-id')).toBeInTheDocument();
    });

    test('portals popover content to end of DOM by default', () => {
      const { container, getByTestId } = renderPortalPopover({ active: true });
      expect(container).not.toContain(getByTestId('popover-test-id'));
    });

    test('does NOT display popover when the `active` prop is `false`', () => {
      const { queryByTestId } = renderPortalPopover({ active: false });
      expect(queryByTestId('popover-test-id')).toBeNull();
    });

    test('accepts a `portalRef`', async () => {
      const portalRef = createRef<HTMLElement>();
      renderPortalPopover({ active: true, portalRef });

      waitFor(() => {
        expect(portalRef.current).toBeDefined();
        expect(portalRef.current).toBeInTheDocument();
      });
    });

    test('applies `portalClassName` to portal element', () => {
      const { getByTestId } = renderPortalPopover({
        active: true,
        portalClassName: 'test-classname',
      });
      expect(getByTestId('popover-test-id').parentElement?.className).toBe(
        'test-classname',
      );
    });
  });

  describe(`renderMode=${RenderMode.TopLayer}`, () => {
    describe('a11y', () => {
      test('does not have basic accessibility issues', async () => {
        const { container, rerenderPopover } = renderTopLayerPopover();
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

    describe(`when dismissMode=${DismissMode.Auto}`, () => {
      // skip until JSDOM supports Popover API
      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('dismisses popover when outside of popover is clicked', async () => {
        const { getByTestId } = renderTopLayerPopover({
          active: true,
          dismissMode: DismissMode.Auto,
        });
        const popover = getByTestId('popover-test-id');

        await waitFor(() => expect(popover).toBeVisible());

        userEvent.click(document.body);

        await waitFor(() => expect(popover).not.toBeVisible());
      });

      // skip until JSDOM supports Popover API
      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('dismisses popover when `Escape` key is pressed', async () => {
        const { getByTestId } = renderTopLayerPopover({
          active: true,
          dismissMode: DismissMode.Auto,
        });
        const popover = getByTestId('popover-test-id');

        await waitFor(() => expect(popover).toBeVisible());

        userEvent.keyboard('{escape}');

        await waitFor(() => expect(popover).not.toBeVisible());
      });
    });

    describe(`when dismissMode=${DismissMode.Manual}`, () => {
      // skip until JSDOM supports Popover API
      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('does not dismiss popover when outside of popover is clicked', async () => {
        const { getByTestId } = renderTopLayerPopover({
          active: true,
          dismissMode: DismissMode.Manual,
        });
        const popover = getByTestId('popover-test-id');

        await waitFor(() => expect(popover).toBeVisible());

        userEvent.click(document.body);

        await waitFor(() => expect(popover).toBeVisible());
      });

      // skip until JSDOM supports Popover API
      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('does not dismiss popover when `Escape` key is pressed', async () => {
        const { getByTestId } = renderTopLayerPopover({
          active: true,
          dismissMode: DismissMode.Manual,
        });
        const popover = getByTestId('popover-test-id');

        await waitFor(() => expect(popover).toBeVisible());

        userEvent.keyboard('{escape}');

        await waitFor(() => expect(popover).toBeVisible());
      });
    });

    test('displays popover in top layer when the `active` prop is `true`', async () => {
      const { getByTestId } = renderTopLayerPopover({
        active: true,
      });
      const popover = getByTestId('popover-test-id');

      expect(popover).toBeInTheDocument();
      await waitFor(() => expect(popover).toBeVisible());
    });

    test('does NOT display popover when the `active` prop is `false`', () => {
      const { queryByTestId } = renderTopLayerPopover({ active: false });
      expect(queryByTestId('popover-test-id')).toBeNull();
    });

    describe('onToggle', () => {
      const toggleEvent = new Event('toggle');
      test('is called when popover is opened', () => {
        const onToggleSpy = jest.fn();
        const { button, getByTestId } = renderTopLayerPopover({
          active: false,
          dismissMode: DismissMode.Auto,
          onToggle: onToggleSpy,
        });

        userEvent.click(button);

        const popover = getByTestId('popover-test-id');
        popover.dispatchEvent(toggleEvent);

        expect(onToggleSpy).toHaveBeenCalledTimes(1);
      });

      test('is called when popover is closed', () => {
        const onToggleSpy = jest.fn();
        const { button, getByTestId } = renderTopLayerPopover({
          active: true,
          onToggle: onToggleSpy,
        });

        expect(onToggleSpy).not.toHaveBeenCalled();

        const popover = getByTestId('popover-test-id');
        popover.dispatchEvent(toggleEvent);
        userEvent.click(button);

        expect(onToggleSpy).toHaveBeenCalledTimes(1);
      });
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

  test('onClick handler is called when popover contents is clicked', () => {
    const clickSpy = jest.fn();
    const { getByText } = renderTopLayerPopover({
      active: true,
      onClick: clickSpy,
    });

    expect(clickSpy).not.toHaveBeenCalled();
    fireEvent.click(getByText('Popover Content'));
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  test('removes Popover instance on unmount', () => {
    const { container, unmount } = renderTopLayerPopover();
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
    const { button } = renderTopLayerPopover({
      ...callbacks,
    });

    // Does not call any hooks on initial render
    for (const cb of Object.values(callbacks)) {
      expect(cb).not.toHaveBeenCalled();
    }

    // Calls enter callbacks when active is toggled to true
    userEvent.click(button);

    expect(callbacks.onEnter).toHaveBeenCalledTimes(1);
    expect(callbacks.onEntering).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(callbacks.onEntered).toHaveBeenCalledTimes(1));

    expect(callbacks.onExit).not.toHaveBeenCalled();
    expect(callbacks.onExiting).not.toHaveBeenCalled();
    expect(callbacks.onExited).not.toHaveBeenCalled();

    // Calls exit callbacks when active is toggled to false
    userEvent.click(button);

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

    function renderPopoverInContext(props?: RTLTopLayerPopoverProps) {
      const MockModalPopoverProvider = ({
        children,
      }: PropsWithChildren<{}>) => {
        return (
          <ModalPopoverContext.Provider
            value={{
              isPopoverOpen: false,
              setIsPopoverOpen: setIsPopoverOpenMock,
            }}
          >
            {children}
          </ModalPopoverContext.Provider>
        );
      };

      const result = render(
        <MockModalPopoverProvider>
          <TopLayerPopoverWithReference {...props} />
        </MockModalPopoverProvider>,
      );

      const button = result.getByTestId('popover-reference-element');

      return { button, ...result };
    }

    afterEach(() => {
      setIsPopoverOpenMock.mockReset();
    });

    test('toggling `active` calls setIsPopoverOpen', async () => {
      const { button } = renderPopoverInContext();
      expect(setIsPopoverOpenMock).not.toHaveBeenCalled();

      userEvent.click(button);
      await waitFor(() => {
        expect(setIsPopoverOpenMock).toHaveBeenCalledWith(true);
        expect(setIsPopoverOpenMock).toHaveBeenCalledTimes(1);
      });

      userEvent.click(button);
      await waitFor(() => {
        expect(setIsPopoverOpenMock).toHaveBeenCalledWith(false);
        expect(setIsPopoverOpenMock).toHaveBeenCalledTimes(2);
      });
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types', () => {
    test('requires children', () => {
      // @ts-expect-error
      <Popover></Popover>;
    });

    test('only requires children', () => {
      <Popover>Popover Content</Popover>;
    });

    test(`does not allow specifying portal props, when renderMode is not ${RenderMode.Portal}`, () => {
      const scrollContainer = document.createElement('div');

      // @ts-expect-error
      <Popover
        active
        renderMode={RenderMode.Inline}
        portalClassName="test-classname"
        portalRef={{ current: null }}
      >
        Popover Content
      </Popover>;

      //@ts-expect-error
      <Popover
        active
        renderMode={RenderMode.Inline}
        portalContainer={scrollContainer}
        scrollContainer={scrollContainer}
      >
        Popover Content
      </Popover>;

      // @ts-expect-error
      <Popover
        active
        renderMode={RenderMode.TopLayer}
        portalClassName="test-classname"
        portalRef={{ current: null }}
      >
        Popover Content
      </Popover>;

      //@ts-expect-error
      <Popover
        active
        renderMode={RenderMode.TopLayer}
        portalContainer={scrollContainer}
        scrollContainer={scrollContainer}
      >
        Popover Content
      </Popover>;
    });

    test(`does not allow specifying dismissMode or onToggle, when renderMode is not ${RenderMode.TopLayer}`, () => {
      // @ts-expect-error
      <Popover
        active
        renderMode={RenderMode.Inline}
        dismissMode="auto"
        onToggle={() => {}}
      >
        Popover Content
      </Popover>;

      // @ts-expect-error
      <Popover
        active
        renderMode={RenderMode.Portal}
        dismissMode="manual"
        onToggle={() => {}}
      >
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
