import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RoundedButton } from '.';

expect.extend({ toHaveNoViolations });

describe('packages/rounded-button', () => {
  test('renders with given children', () => {
    render(<RoundedButton>Click me</RoundedButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('applies custom className and other props', () => {
    render(
      <RoundedButton
        className="my-custom-class"
        id="test-button"
        type="submit"
        data-testid="rounded-btn"
      >
        Submit
      </RoundedButton>,
    );
    const button = screen.getByTestId('rounded-btn');
    expect(button).toHaveClass('my-custom-class');
    expect(button).toHaveAttribute('id', 'test-button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<RoundedButton onClick={handleClick}>Press</RoundedButton>);
    const button = screen.getByRole('button', { name: /press/i });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <RoundedButton disabled onClick={handleClick}>
        Disabled
      </RoundedButton>,
    );
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('supports keyboard activation via "Enter" and "Space"', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<RoundedButton onClick={handleClick}>KeyTest</RoundedButton>);
    const button = screen.getByRole('button', { name: /keytest/i });
    button.focus();
    expect(button).toHaveFocus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test('forwards ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<RoundedButton ref={ref}>WithRef</RoundedButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe('WithRef');
  });

  test('has no accessibility violations', async () => {
    const { container } = render(<RoundedButton>Accessible</RoundedButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
