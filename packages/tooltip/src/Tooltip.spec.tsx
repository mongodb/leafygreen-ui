import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Tooltip from '.';

const buttonText = 'trigger button';
const tooltipTestId = 'tooltip-test-id';
const onClick = jest.fn();

interface ButtonTestProps {
  [key: string]: any;
}

function renderTooltip(props = {}) {
  const utils = render(
    <>
      <div data-testid="backdrop" />
      <Tooltip
        trigger={<button onClick={onClick}>{buttonText}</button>}
        {...props}
      >
        <div data-testid={tooltipTestId}>Tooltip Contents!</div>
      </Tooltip>
    </>,
  );
  const button = utils.getByText(buttonText);
  const backdrop = utils.getByTestId('backdrop');
  return { ...utils, button, backdrop };
}

describe('packages/tooltip', () => {
  describe('when uncontrolled', () => {
    test(`renders a button to the DOM with ${buttonText}`, () => {
      const { getByText } = renderTooltip();
      expect(getByText(buttonText)).toBeInTheDocument();
    });

    test('when "triggerEvent" is set to click, clicking trigger opens and closes the tooltip', () => {
      const { button, getByTestId } = renderTooltip({
        triggerEvent: 'click',
      });

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);

      const tooltip = getByTestId(tooltipTestId);

      // checking that in the Document, because in the document before opacity hits 1
      expect(tooltip).toBeInTheDocument();

      // checking for visibility, because opacity changes before tooltip transitions out of the DOM
      fireEvent.click(button);
      expect(tooltip).not.toBeVisible();
    });

    test('backdrop clicks close the tooltip', () => {
      const { getByTestId, button, backdrop } = renderTooltip({
        triggerEvent: 'click',
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      expect(tooltip).toBeInTheDocument();

      fireEvent.click(backdrop);
      expect(tooltip).not.toBeVisible();
    });

    test('escape click closes tooltip', () => {
      const { getByTestId, button } = renderTooltip({
        triggerEvent: 'click',
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      expect(tooltip).toBeInTheDocument();

      fireEvent.keyDown(button, {
        key: 'Escape',
        keyCode: 27,
      });
      expect(tooltip).not.toBeVisible();
    });

    test('when "shouldClose" prop is returns true', () => {
      const { getByTestId, backdrop, button } = renderTooltip({
        triggerEvent: 'click',
        shouldClose: () => true,
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      expect(tooltip).toBeInTheDocument();

      fireEvent.click(backdrop);
      expect(tooltip).not.toBeVisible();
    });

    test('when "shouldClose" prop is returns false', () => {
      const { getByTestId, backdrop, button } = renderTooltip({
        triggerEvent: 'click',
        shouldClose: () => false,
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      expect(tooltip).toBeInTheDocument();

      fireEvent.click(backdrop);
      expect(tooltip).toBeInTheDocument();
    });
  });

  describe('when controlled', () => {
    const setOpen = jest.fn();

    test('renders initial state based on "open" prop', () => {
      const { getByTestId } = renderTooltip({
        open: true,
        setOpen,
      });
      expect(getByTestId(tooltipTestId)).toBeVisible();
    });

    test(' onClick fires when trigger is clicked', () => {
      const { button } = renderTooltip({
        open: true,
        setOpen,
      });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
    });

    test('clicking content inside of tooltip does not force tooltip to close', () => {
      const { button, getByTestId } = renderTooltip({
        open: true,
        setOpen,
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      expect(tooltip).toBeVisible();

      fireEvent.click(tooltip);
      expect(tooltip).toBeVisible();
    });
  });

  describe('when trigger is a class-based component', () => {
    class Button extends React.Component<ButtonTestProps> {
      render() {
        const { children } = this.props;
        return (
          <button {...this.props} data-testid="class-controlled-trigger">
            trigger {children}
          </button>
        );
      }
    }

    function renderClassTrigger(props = {}) {
      const utils = render(
        <>
          <div data-testid="backdrop" />
          <Tooltip trigger={<Button onClick={onClick} />} {...props}>
            <div data-testid={tooltipTestId}>Tooltip Contents!</div>
          </Tooltip>
        </>,
      );
      const button = utils.getByTestId('class-controlled-trigger');
      const backdrop = utils.getByTestId('backdrop');
      return { ...utils, button, backdrop };
    }

    test('renders a button to the DOM', () => {
      const { button } = renderClassTrigger();
      expect(button).toBeVisible();
    });

    test('component triggers opening and closing of tooltip', () => {
      const { button, getByTestId } = renderClassTrigger({
        triggerEvent: 'click',
      });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();

      const tooltip = getByTestId(tooltipTestId);
      expect(tooltip).toBeInTheDocument();
      fireEvent.click(button);
      expect(tooltip).not.toBeVisible();
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

    test(`when "triggerEvent" is click, clicking triggers opening and closing of tooltip`, () => {
      const { button, getByTestId } = renderInlineTrigger({
        triggerEvent: 'click',
      });

      fireEvent.click(button);
      const tooltip = getByTestId(tooltipTestId);
      expect(tooltip).toBeInTheDocument();

      fireEvent.click(button);
      expect(tooltip).not.toBeVisible();
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
});
