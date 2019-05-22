import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Dropdown, { DropdownItem, DropdownGroup } from './index';

afterAll(cleanup);

describe('packages/Dropdown', () => {
  const onSelect = jest.fn();
  const className = 'test-className';

  const { getByTestId, getByText, getByRole } = render(
    <Dropdown active data-testid="test-dropdown">
      <DropdownGroup>
        <DropdownItem className={className} onSelect={onSelect}>
          Item A
        </DropdownItem>
        <DropdownItem href="http://mongodb.design">Item B</DropdownItem>
      </DropdownGroup>
    </Dropdown>,
  );

  test('Appears on DOM when active prop is set', () => {
    const dropdown = getByTestId('test-dropdown');
    expect(dropdown).toBeVisible();
  });

  test('Renders children to the DOM', () => {
    const dropdownItem = getByText('Item A');
    expect(dropdownItem).toBeInTheDocument();
  });

  describe('packages/DropdownGroup', () => {
    test('Creates a dropdown group div with role menu', () => {
      const dropdownGroup = getByRole('menu');
      const dropdownItem = getByText('Item A');
      expect(dropdownGroup).toContainElement(dropdownItem);
    });
  });

  describe('packages/DropdownItem', () => {
    test('Fires onSelect callback, when clicked', () => {
      const dropdownItem = getByText('Item A');
      fireEvent.click(dropdownItem);
      expect(onSelect.mock.calls.length).toBe(1);
    });
  });

  test(`renders "${className}" in the DropdownItem container's classList`, () => {
    const dropdownItem = getByText('Item A').parentElement;
    dropdownItem &&
      expect(dropdownItem.classList.contains(className)).toBe(true);
  });

  test('Renders inside of an `a` instead of a `span` tag, when `href` prop is supplied', () => {
    const dropdownItem = getByText('Item B');
    expect(dropdownItem.tagName.toLowerCase()).toBe('a');
  });
});
