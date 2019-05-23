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
        <DropdownItem className={className} onClick={onSelect} title="Item A" />
        <DropdownItem href="http://mongodb.design" title="Item B" />
      </DropdownGroup>
    </Dropdown>,
  );

  const dropdown = getByTestId('test-dropdown');

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
    const itemA = dropdown.firstChild.firstChild;
    itemA && expect(itemA.classList.contains(className)).toBe(true);
  });

  test('Renders inside of an `a` instead of a `span` tag, when `href` prop is supplied', () => {
    const itemB = dropdown.firstChild.children[1].firstChild;
    expect(itemB.tagName.toLowerCase()).toBe('a');
  });
});
