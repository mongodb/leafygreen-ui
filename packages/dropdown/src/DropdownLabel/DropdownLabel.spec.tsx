import React from 'react';
import { render, screen } from '@testing-library/react';

import { Dropdown, DropdownItem, DropdownLabel } from '..';

const labelText = 'Test Label';
const itemText = 'Test Text';

const renderDropdown = () => {
  const utils = render(
    <Dropdown open={true} setOpen={jest.fn()} triggerRef={{ current: null }}>
      <DropdownLabel label={labelText}>
        <DropdownItem>{itemText}</DropdownItem>
      </DropdownLabel>
    </Dropdown>,
  );
  return utils;
};

describe('packages/dropdown/dropdown-label', () => {
  test('it renders a label', () => {
    renderDropdown();
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
  });

  test('it renders its children', () => {
    renderDropdown();
    const item = screen.getByText(itemText);
    expect(item).toBeInTheDocument();
  });

  test('it associates its children to the label accessibly', () => {
    renderDropdown();
    const label = screen.getByText(labelText);
    const group = screen.getByRole('group');

    expect(label.getAttribute('id')).toBe(
      group.getAttribute('aria-labelledby'),
    );
  });
});
