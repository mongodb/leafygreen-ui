import React, { ReactElement } from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import Icon from '@leafygreen-ui/icon';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import { HTMLElementProps, OneOf } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

import Tooltip from './Tooltip';
import { TooltipProps } from './Tooltip.types';

const buttonText = 'trigger button';
const tooltipTestId = 'tooltip-test-id';
const onClick = jest.fn();

function waitForTimeout(timeout = 500) {
  return new Promise(res => setTimeout(res, timeout));
}

interface ButtonTestProps {
  [key: string]: any;
}

class ClassTrigger extends React.Component<ButtonTestProps> {
  render() {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    return (
      <button {...this.props} data-testid="class-trigger">
        trigger {children}
      </button>
    );
  }
}

const FunctionTrigger = ({ children, ...rest }: HTMLElementProps<'div'>) => (
  <div {...rest} data-testid="function-trigger">
    {buttonText}
    {children}
  </div>
);

const triggerTypes = [
  {
    type: 'class',
    Trigger: ClassTrigger,
  },
  {
    type: 'function',
    Trigger: FunctionTrigger,
  },
];

function renderTooltip(
  props: Omit<TooltipProps, 'children' | 'trigger'> &
    OneOf<
      { usePortal?: true; portalClassName?: string },
      { usePortal: false }
    > = {},
) {
  const utils = render(
    <>
      <div data-testid="backdrop" />
      <Tooltip
        trigger={<button onClick={onClick}>{buttonText}</button>}
        data-testid={tooltipTestId}
        {...props}
      >
        <div>Tooltip Contents!</div>
      </Tooltip>
    </>,
  );

  const button = utils.getByText(buttonText);
  const backdrop = utils.getByTestId('backdrop');

  return { ...utils, button, backdrop };
}

beforeEach(() => {
  onClick.mockReset();
});

describe('packages/tooltip', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderTooltip({ triggerEvent: 'click' });
      const results = await axe(container);
      expect(results).toHaveNoViolations();

      let newResults = null as any;
      act(() => void fireEvent.click(screen.getByText(buttonText)));
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });
  });
  describe('when uncontrolled', () => {
    test(`renders a button to the DOM with ${buttonText}`, () => {
      const { getByText } = renderTooltip();
      expect(getByText(buttonText)).toBeInTheDocument();
    });

    test('when "triggerEvent" is set to click, clicking trigger opens and closes the tooltip', async () => {
      const { button, getByTestId } = renderTooltip({
        triggerEvent: 'click',
      });

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);

      const tooltip = getByTestId(tooltipTestId);

      // checking that in the Document, because in the document before opacity hits 1
      await waitFor(() => tooltip);
      // Wait for tooltip delay
      await act(async () => {
        await waitForTimeout(transitionDuration.slowest);
      });
      expect(tooltip).toBeVisible();

      // checking for visibility, because opacity changes before tooltip transitions out of the DOM
      fireEvent.click(button);
      await waitForElementToBeRemoved(tooltip);
    });

    test('when "triggerEvent" is set to "hover", hovering on and off the trigger opens and closes the tooltip', async () => {
      const { getByTestId, queryByTestId, button } = renderTooltip({
        triggerEvent: 'hover',
      });

      fireEvent.mouseEnter(button);

      await waitFor(() => getByTestId(tooltipTestId), { timeout: 500 });

      expect(getByTestId(tooltipTestId)).toBeInTheDocument();

      fireEvent.mouseLeave(button);

      await waitForElementToBeRemoved(getByTestId(tooltipTestId), {
        timeout: 500,
      });

      expect(queryByTestId(tooltipTestId)).not.toBeInTheDocument();
    });

    const fireEventMap = {
      hover: {
        on: fireEvent.mouseEnter,
        off: fireEvent.mouseLeave,
      },
      click: {
        on: fireEvent.click,
        off: fireEvent.click,
      },
    };

    async function testTriggerEventWhenDisabled(
      triggerEvent: 'hover' | 'click',
    ) {
      test(`when triggerEvent is "${triggerEvent}"`, async () => {
        const { queryByTestId, button } = renderTooltip({
          triggerEvent,
          enabled: false,
        });

        // Wait for 200ms to ensure enough time in case the element erroneously appears
        await act(async () => {
          fireEventMap[triggerEvent].on(button);
          await waitForTimeout(200);
        });

        expect(queryByTestId(tooltipTestId)).not.toBeInTheDocument();

        // The following test is largely here to ensure we don't somehow end up in a strange state where the element becomes visible once the mouse leaves.
        await act(async () => {
          fireEventMap[triggerEvent].off(button);
          await waitForTimeout(200);
        });

        expect(queryByTestId(tooltipTestId)).not.toBeInTheDocument();
      });
    }

    describe('tooltip does not open when enabled is "false"', () => {
      testTriggerEventWhenDisabled('hover');
      testTriggerEventWhenDisabled('click');
    });

    test('tooltip closes when enabled is set to "false"', async () => {
      const { getByTestId, button, container } = renderTooltip({
        triggerEvent: 'click',
        enabled: true,
      });

      fireEvent.click(button);

      const tooltip = await waitFor(() => {
        const tooltip = getByTestId(tooltipTestId);
        expect(tooltip).toBeVisible();
        return tooltip;
      });

      render(
        <>
          <div data-testid="backdrop" />

          <Tooltip
            trigger={<button onClick={onClick}>{buttonText}</button>}
            data-testid={tooltipTestId}
            triggerEvent="click"
            enabled={false}
          >
            <div>Tooltip Contents!</div>
          </Tooltip>
        </>,
        { container },
      );

      await waitFor(() => {
        expect(tooltip).not.toBeInTheDocument();
      });
    });

    test('backdrop clicks close the tooltip', async () => {
      const { getByTestId, button, backdrop } = renderTooltip({
        triggerEvent: 'click',
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      expect(tooltip).toBeInTheDocument();

      fireEvent.click(backdrop);
      await waitForElementToBeRemoved(tooltip);
    });

    test('escape click closes tooltip', async () => {
      const { getByTestId, button } = renderTooltip({
        triggerEvent: 'click',
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      await act(async () => {
        await waitForTimeout(transitionDuration.slowest);
      });
      await act(() => waitFor(() => expect(tooltip).toBeVisible()));

      fireEvent.keyDown(button, {
        key: 'Escape',
        keyCode: 27,
      });
      await waitForElementToBeRemoved(tooltip);
    });

    test('when "shouldClose" prop is returns true', async () => {
      const { getByTestId, backdrop, button } = renderTooltip({
        triggerEvent: 'click',
        shouldClose: () => true,
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      await act(async () => {
        await waitForTimeout(transitionDuration.slowest);
      });
      await act(() => waitFor(() => expect(tooltip).toBeVisible()));

      fireEvent.click(backdrop);
      await waitForElementToBeRemoved(tooltip);
    });

    test('when "shouldClose" prop is returns false', async () => {
      const { getByTestId, backdrop, button } = renderTooltip({
        triggerEvent: 'click',
        shouldClose: () => false,
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      await act(async () => {
        await waitForTimeout(transitionDuration.slowest);
      });
      await act(() => waitFor(() => expect(tooltip).toBeVisible()));

      fireEvent.click(backdrop);
      expect(tooltip).toBeVisible();
    });
  });

  describe('when controlled', () => {
    const setOpen = jest.fn();

    test('renders initial state based on "open" prop', async () => {
      const { getByTestId } = renderTooltip({
        open: true,
        setOpen,
      });

      await waitFor(() => expect(getByTestId(tooltipTestId)).toBeVisible());
    });

    test('onClick fires when trigger is clicked', () => {
      const { button } = renderTooltip({
        open: true,
        setOpen,
      });

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
    });

    describe('clicking content inside of tooltip does not force tooltip to close', () => {
      function testCase(name: string, usePortal: boolean): void {
        test(`${name}`, async () => {
          const { button, getByTestId } = renderTooltip({
            open: true,
            setOpen,
            usePortal,
          });

          fireEvent.click(button);

          const tooltip = getByTestId(tooltipTestId);
          await waitFor(() => expect(tooltip).toBeVisible());

          onClick.mockClear();

          let clickTarget: HTMLElement = tooltip;

          while (![document.body, button].includes(clickTarget)) {
            fireEvent.click(clickTarget);

            expect(tooltip).toBeVisible();
            expect(onClick).not.toHaveBeenCalled();

            clickTarget = clickTarget.parentElement!;
          }
        });
      }

      testCase('with portal', true);
      testCase('without portal', false);
    });
  });

  describe.each(triggerTypes)(`when trigger is`, ({ type, Trigger }) => {
    describe(`a ${type} component`, () => {
      function renderTrigger(props = {}) {
        const utils = render(
          <>
            <div data-testid="backdrop" />
            <Tooltip trigger={<Trigger>{buttonText}</Trigger>} {...props}>
              <div data-testid={tooltipTestId}>Tooltip Contents!</div>
            </Tooltip>
          </>,
        );
        const button = utils.getByTestId(`${type}-trigger`);
        const backdrop = utils.getByTestId('backdrop');
        return { ...utils, button, backdrop };
      }

      test('renders a button to the DOM with text', () => {
        const { button } = renderTrigger();
        expect(button).toBeVisible();
        expect(button).toHaveTextContent(buttonText);
      });

      describe('triggerEvent is `click`', () => {
        test('click event triggers opening and closing of tooltip', () => {
          const { button, getByTestId } = renderTrigger({
            triggerEvent: 'click',
          });
          userEvent.click(button);
          const tooltip = getByTestId(tooltipTestId);
          expect(tooltip).toBeInTheDocument();
          userEvent.click(button);
          waitForElementToBeRemoved(tooltip);
        });

        test('clicking the backdrop closes the tooltip', () => {
          const { button, getByTestId } = renderTrigger({
            triggerEvent: 'click',
          });
          userEvent.click(button);
          const tooltip = getByTestId(tooltipTestId);
          const backdrop = getByTestId('backdrop');
          userEvent.click(backdrop);
          waitForElementToBeRemoved(tooltip);
        });
      });

      describe('triggerEvent is `hover`', () => {
        test('hover event triggers opening and closing of tooltip', () => {
          const { button, getByTestId } = renderTrigger({
            triggerEvent: 'hover',
          });
          userEvent.hover(button);
          waitFor(() => {
            const tooltip = getByTestId(tooltipTestId);
            expect(tooltip).toBeInTheDocument();
            userEvent.unhover(button);
            waitForElementToBeRemoved(tooltip);
          });
        });

        test('clicking the backdrop does not close the tooltip', () => {
          const { button, getByTestId } = renderTrigger({
            triggerEvent: 'hover',
          });
          userEvent.hover(button);
          waitFor(() => {
            const tooltip = getByTestId(tooltipTestId);
            const backdrop = getByTestId('backdrop');
            userEvent.click(backdrop);
            expect(tooltip).toBeInTheDocument();
          });
        });
      });
    });
  });

  describe('when trigger is an inline function', () => {
    function renderInlineTrigger(props = {}) {
      const utils = render(
        <>
          <div data-testid="backdrop" />
          <Tooltip
            trigger={({ children, ...rest }: ButtonTestProps) => (
              <button {...rest} data-testid="inline-trigger">
                {buttonText}
                {children}
              </button>
            )}
            {...props}
          >
            <div data-testid={tooltipTestId}>Tooltip Contents!</div>
          </Tooltip>
        </>,
      );
      const button = utils.getByTestId('inline-trigger');
      const backdrop = utils.getByTestId('backdrop');
      return { ...utils, button, backdrop };
    }

    test(`renders a button to the DOM with ${buttonText}`, () => {
      const { button } = renderInlineTrigger();
      expect(button).toBeInTheDocument();
    });

    test(`when "triggerEvent" is click, clicking triggers opening and closing of tooltip`, async () => {
      const { button, getByTestId } = renderInlineTrigger({
        triggerEvent: 'click',
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      expect(tooltip).toBeInTheDocument();

      fireEvent.click(button);
      await waitForElementToBeRemoved(tooltip);
    });
  });

  describe('when trigger contains nested children', () => {
    interface ButtonProps {
      children: React.ReactNode;
    }

    function Button({ children, ...props }: ButtonProps) {
      return (
        <button {...props} data-testid="nested-trigger">
          trigger {children}
        </button>
      );
    }

    function renderNestedTrigger(props = {}) {
      const utils = render(
        <Tooltip
          {...props}
          trigger={
            <Button>
              <span>trigger</span>
            </Button>
          }
        >
          <div>Tooltip!</div>
        </Tooltip>,
      );

      const button = utils.getByTestId('nested-trigger');
      return { ...utils, button };
    }

    test('renders trigger in document', () => {
      const { button } = renderNestedTrigger();
      expect(button).toBeInTheDocument();
    });
  });

  test('portals popover content to end of DOM, when "usePortal" is not set', () => {
    const { container, getByTestId } = renderTooltip({
      open: true,
    });
    expect(container).not.toContain(getByTestId(tooltipTestId));
  });

  test('does not portal popover content to end of DOM when "usePortal" is false', () => {
    const { container } = renderTooltip({
      open: true,
      usePortal: false,
    });

    expect(container.innerHTML.includes(tooltipTestId)).toBe(true);
  });

  test('applies "portalClassName" to root of portal', () => {
    const { getByTestId } = renderTooltip({
      open: true,
      portalClassName: 'test-classname',
    });

    const matchedElements = document.querySelectorAll('body > .test-classname');
    expect(matchedElements).toHaveLength(1);

    const portalRoot = matchedElements.item(0);
    expect(portalRoot).toContainElement(getByTestId(tooltipTestId));
  });

  // eslint-disable-next-line jest/expect-expect
  test('does not allow specifying "portalClassName", when "usePortal" is false', () => {
    renderTooltip({
      open: true,
      usePortal: false,
      // @ts-expect-error
      portalClassName: 'test-classname',
    });
  });

  describe('Renders warning when', () => {
    const expectedWarnMsg =
      'Using a LeafyGreenUI Icon or Glyph component as a trigger will not render a Tooltip,' +
      ' as these components do not render their children.' +
      ' To use, please wrap your trigger element in another HTML tag.';
    let warn: jest.SpyInstance;
    beforeEach(() => {
      warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      warn.mockClear();
      warn.mockRestore();
    });

    test('LeafyGreen UI Glyph is passed to trigger', () => {
      render(<Tooltip trigger={<CloudIcon />}>TooltipContent</Tooltip>);

      waitFor(() => {
        expect(warn).toHaveBeenCalledTimes(1);
        expect(warn).toHaveBeenCalledWith(expectedWarnMsg);
      });
    });

    test('LeafyGreen UI Icon is passed to trigger', () => {
      render(
        <Tooltip trigger={<Icon glyph="Cloud" />}>TooltipContent</Tooltip>,
      );

      waitFor(() => {
        expect(warn).toHaveBeenCalledTimes(1);
        expect(warn).toHaveBeenCalledWith(expectedWarnMsg);
      });
    });

    test('No warning for default props', () => {
      const defaultProps: TooltipProps = {
        children: 'Tooltip content',
        trigger: <button>hi</button>,
      };

      render(<Tooltip {...defaultProps} />);

      waitFor(() => {
        expect(warn).not.toHaveBeenCalled();
      });
    });
  });

  describe('when an interactive element is rendered inside of the Tooltip', () => {
    test('click events fire from inside of the tooltip', () => {
      const clickHandler = jest.fn();

      render(
        <Tooltip
          triggerEvent="click"
          trigger={<button onClick={onClick}>{buttonText}</button>}
        >
          <button onClick={clickHandler}>Button inside of Tooltip</button>
        </Tooltip>,
      );

      fireEvent.click(screen.getByText(buttonText));

      const tooltipButton = screen.getByText('Button inside of Tooltip');
      fireEvent.click(tooltipButton);

      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the trigger has an event handler', () => {
    const renderTooltipWithTrigger = (
      event: 'hover' | 'click',
      element: ReactElement,
    ) => {
      const result = render(
        <Tooltip
          triggerEvent={event}
          trigger={element}
          data-testid={tooltipTestId}
        >
          <div>Tooltip Contents!</div>
        </Tooltip>,
      );
      const trigger = screen.getByText(buttonText);
      return { ...result, trigger };
    };

    test('onClick events should fire', () => {
      const clickHandler = jest.fn();
      const { trigger } = renderTooltipWithTrigger(
        'click',
        <button onClick={clickHandler}>{buttonText}</button>,
      );
      fireEvent.click(trigger);
      expect(clickHandler).toHaveBeenCalled();
    });

    test('onFocus events should fire', () => {
      const focusHandler = jest.fn();
      const { trigger } = renderTooltipWithTrigger(
        'hover',
        <button onFocus={focusHandler}>{buttonText}</button>,
      );
      fireEvent.focus(trigger);
      expect(focusHandler).toHaveBeenCalled();
    });

    test('onBlur events should fire', () => {
      const blurHandler = jest.fn();
      const { trigger } = renderTooltipWithTrigger(
        'hover',
        <button onBlur={blurHandler}>{buttonText}</button>,
      );
      fireEvent.blur(trigger);
      expect(blurHandler).toHaveBeenCalled();
    });

    test('onMouseEnter events should fire', async () => {
      const mouseEnterHandler = jest.fn();
      const { trigger } = renderTooltipWithTrigger(
        'hover',
        <button onMouseEnter={mouseEnterHandler}>{buttonText}</button>,
      );
      act(() => {
        fireEvent.mouseEnter(trigger);
      });
      await waitFor(() => {
        expect(mouseEnterHandler).toHaveBeenCalled();
      });
    });

    test('onMouseLeave events should fire', async () => {
      const mouseLeaveHandler = jest.fn();
      const { trigger } = renderTooltipWithTrigger(
        'hover',
        <button onMouseLeave={mouseLeaveHandler}>{buttonText}</button>,
      );
      act(() => {
        fireEvent.mouseLeave(trigger);
      });
      await waitFor(() => {
        expect(mouseLeaveHandler).toHaveBeenCalled();
      });
    });

    test('"onClose" callback is triggered when the tooltip is closed internally', async () => {
      const onClose = jest.fn();
      const { getByTestId, button } = renderTooltip({
        triggerEvent: 'click',
        onClose,
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      await act(async () => {
        await waitForTimeout(transitionDuration.slowest);
      });
      await act(() => waitFor(() => expect(tooltip).toBeVisible()));

      fireEvent.keyDown(button, {
        key: 'Escape',
        keyCode: 27,
      });
      expect(onClose).toHaveBeenCalledTimes(1);
      await waitForElementToBeRemoved(tooltip);
    });
  });
});
