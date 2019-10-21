import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Tooltip from '.';

afterAll(cleanup);

interface ButtonTestProps {
  [key: string]: any;
}

describe('packages/Tooltip', () => {
  const buttonText = 'trigger button';

  describe('when uncontrolled', () => {
    const triggerEvent = 'click';
    const onClick = jest.fn();

    const { getByText, getByTestId } = render(
      <>
        <div>backdrop content</div>
        <Tooltip
          trigger={<button onClick={onClick}>{buttonText}</button>}
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
      expect(onClick).toHaveBeenCalledTimes(1);

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

    // test('clicking content inside of tooltip does not force tooltip to close', () => {
    //   fireEvent.click(button);
    //   expect(tooltip).toBeVisible();

    //   fireEvent.click(tooltip);
    //   expect(tooltip).toBeVisible();
    // });
  });

  describe('when controlled', () => {
    const open = true;
    const setOpen = jest.fn();
    const onClick = jest.fn();

    const Button = ({ children, ...rest }: ButtonTestProps) => {
      return (
        <button {...rest} data-testid="controlled-button">
          controlled button{children}
        </button>
      );
    };

    const { getByTestId } = render(
      <Tooltip
        open={open}
        setOpen={setOpen}
        trigger={<Button onClick={onClick} />}
        triggerEvent="click"
      >
        <div data-testid="controlled-tooltip">Controlled tooltip!</div>
      </Tooltip>,
    );

    const tooltip = getByTestId('controlled-tooltip');
    const button = getByTestId('controlled-button');

    test('renders initial state based on open prop', () => {
      expect(tooltip).toBeVisible();
    });

    test('Button components onClick fires when trigger is clicked', () => {
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('when trigger is a class-based component', () => {
    const onClick = jest.fn();
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

    const { getByTestId } = render(
      <Tooltip trigger={<Button onClick={onClick} />} triggerEvent="click">
        <div data-testid="class-triggered-tooltip">Tooltip!</div>
      </Tooltip>,
    );

    const button = getByTestId('class-controlled-trigger');

    test('renders a button to the DOM', () => {
      expect(button).toBeVisible();
    });

    test('component triggers opening and closing of tooltip', () => {
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);

      const tooltip = getByTestId('class-triggered-tooltip');
      expect(tooltip).toBeVisible();

      fireEvent.click(button);
      expect(tooltip).not.toBeVisible();
    });
  });

  describe('when trigger is an inline function', () => {
    const buttonText = 'tooltrip trigger';
    const triggerEvent = 'click';

    const { getByText, getByTestId } = render(
      <Tooltip
        trigger={({ children, ...rest }: ButtonTestProps) => (
          <button {...rest}>
            {buttonText}
            {children}
          </button>
        )}
        triggerEvent={triggerEvent}
      >
        <div data-testid="functional-trigger">Tooltip!</div>
      </Tooltip>,
    );

    const button = getByText(buttonText);

    test(`renders a button to the DOM with ${buttonText}`, () => {
      expect(button).toBeInTheDocument();
      expect(button.tagName.toLowerCase()).toBe('button');
    });

    test(`${triggerEvent} triggers opening and closing of tooltip`, () => {
      fireEvent.click(button);
      const tooltip = getByTestId('functional-trigger');
      expect(tooltip).toBeVisible();

      fireEvent.click(button);
      expect(tooltip).not.toBeVisible();
    });
  });
});
