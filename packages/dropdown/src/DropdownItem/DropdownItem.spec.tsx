import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

import { Dropdown, DropdownItem, DropdownItemProps } from '..';

const renderDropdownItem = (props?: DropdownItemProps<PolymorphicAs>) => {
  const utils = render(
    <Dropdown open={true} setOpen={jest.fn()} triggerRef={{ current: null }}>
      <DropdownItem {...props}>Test Children</DropdownItem>
    </Dropdown>,
  );
  return utils;
};

describe('packages/dropdown/dropdown-item', () => {
  describe('handles polymorphism', () => {
    test('renders as a "div" by default', () => {
      renderDropdownItem();
      const item = screen.getByRole('option');
      expect(item.tagName).toBe('DIV');
    });

    test('it properly handles the "as" prop', () => {
      renderDropdownItem({ as: 'li' });
      const item = screen.getByRole('option');
      expect(item.tagName).toBe('LI');
    });

    test('renders as an anchor tag when "href" is passed', () => {
      renderDropdownItem({ href: 'string' });
      const item = screen.getByRole('option');
      expect(item.tagName).toBe('A');
    });
  });

  test('renders children', () => {
    renderDropdownItem();
    const item = screen.getByText('Test Children');
    expect(item).toBeInTheDocument();
  });

  test('adds className to the class list', () => {
    renderDropdownItem({ className: 'className' });
    const item = screen.getByRole('option');
    expect(item.closest('.className')).toBeInTheDocument();
  });

  test('fires onClick callback when clicked', () => {
    const onClick = jest.fn();
    renderDropdownItem({ onClick });
    const item = screen.getByRole('option');
    fireEvent.click(item);
    expect(onClick).toHaveBeenCalled();
  });

  test('has the aria-checked attribute when active', () => {
    renderDropdownItem({ active: true });
    const item = screen.getByRole('option');
    expect(item.getAttribute('aria-checked')).toBe('true');
  });

  test('accepts a ref', () => {
    let testRef: React.MutableRefObject<HTMLElement | null>;

    const TestComponent = () => {
      const myRef = React.useRef<HTMLElement | null>(null);
      testRef = myRef;

      return <DropdownItem data-testid="ref" ref={myRef}></DropdownItem>;
    };

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('ref')).toBeInTheDocument();
    expect(getByTestId('ref').tagName.toLowerCase()).toBe('div');
    expect(testRef!).toBeDefined();
    expect(testRef!.current).toBeDefined();
  });
});
