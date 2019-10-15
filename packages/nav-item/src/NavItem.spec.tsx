import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import NavItem from '.';

afterAll(cleanup);

describe('packages/navItem', () => {
  const onClick = jest.fn();
  const className = 'test-className';

  const { getByTestId } = render(
    <div>
      <NavItem className={className} onClick={onClick} data-testid="first-item">
        Item A
      </NavItem>
      <NavItem href="http://mongodb.design" data-testid="second-item">
        Item B
      </NavItem>
    </div>,
  );

  const firstItem = getByTestId('first-item');
  const secondItem = getByTestId('second-item');

  test('fires onClick callback, when clicked', () => {
    fireEvent.click(firstItem);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test(`renders "${className}" in the NavItem container's classList`, () => {
    expect(firstItem.classList.contains(className)).toBe(true);
  });

  test('renders inside of an `a` instead of a `span` tag, when `href` prop is supplied', () => {
    expect(secondItem.tagName.toLowerCase()).toBe('a');
  });
});
