import React, { useRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

import {
  Dropdown,
  DropdownGroup,
  DropdownGroupProps,
  DropdownItem,
  DropdownProps,
} from '..';

const title = 'Title';
const testId = 'dropdown-group';

const renderDropdownGroup = (props?: DropdownGroupProps<PolymorphicAs>) => {
  const utils = render(
    <Dropdown open={true} setOpen={jest.fn()} triggerRef={{ current: null }}>
      <DropdownGroup data-testid={testId} title={title} {...props}>
        <DropdownItem>Item A</DropdownItem>
        <DropdownItem>Item B</DropdownItem>
      </DropdownGroup>
    </Dropdown>,
  );

  return utils;
};

const WithTriggerExample = (props?: Partial<DropdownProps>) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={triggerRef} onClick={() => setOpen(curr => !curr)}>
        Trigger
      </button>
      <Dropdown
        open={open}
        setOpen={setOpen}
        triggerRef={triggerRef}
        {...props}
      >
        <DropdownGroup data-testid={testId}>
          <DropdownItem>Dropdown Item A</DropdownItem>
        </DropdownGroup>
      </Dropdown>
    </>
  );
};

const testFocus = () => {
  const utils = render(<WithTriggerExample />);
  return utils;
};

describe('packages/dropdown/dropdown-group', () => {
  describe('handles polymorphism', () => {
    test('renders as a "div" by default', () => {
      renderDropdownGroup();
      const group = screen.getByTestId(testId);
      expect(group.tagName).toBe('DIV');
    });

    test('it properly handles the "as" prop', () => {
      renderDropdownGroup({ as: 'li' });
      const group = screen.getByTestId(testId);
      expect(group.tagName).toBe('LI');
    });

    test('renders as an anchor tag when "href" is passed', () => {
      renderDropdownGroup({ href: 'string' });
      const group = screen.getByTestId(testId);
      expect(group.tagName).toBe('A');
    });
  });

  describe('handles keyboard navigation', () => {
    describe('when highlight behavior is focus', () => {});
    describe('when highlight behavior is ariaSelected', () => {});
  });

  describe('handles click behavior', () => {
    test('fires onClick callback when clicked', () => {
      const onClick = jest.fn();
      renderDropdownGroup({ onClick });
      const group = screen.getByTestId(testId);
      fireEvent.click(group);
      expect(onClick).toHaveBeenCalled();
    });

    test('opens the submenu when chevron is clicked', () => {
      renderDropdownGroup();
      const chevron = screen.getByRole('button');
      fireEvent.click(chevron);

      const subMenuItem = screen.getByText('Item A');
      expect(subMenuItem).toBeInTheDocument();
    });
  });

  test('does not show children when closed', () => {
    renderDropdownGroup();
    const group = screen.getByTestId(testId);
    const item = screen.queryByText('Item A');
    expect(group).toBeInTheDocument();
    expect(item).not.toBeInTheDocument();
  });

  test('renders title', () => {
    renderDropdownGroup();
    const group = screen.getByText(title);
    expect(group).toBeInTheDocument();
  });

  test('renders description', () => {
    const description = 'description';
    renderDropdownGroup({ description });
    const group = screen.getByText(description);
    expect(group).toBeInTheDocument();
  });

  test('adds className to the class list', () => {
    renderDropdownGroup({ className: 'className' });
    const group = screen.getByTestId(testId);
    expect(group.closest('.className')).toBeInTheDocument();
  });

  test('has the aria-checked attribute when active', () => {
    renderDropdownGroup({ active: true });
    const group = screen.getByTestId(testId);
    expect(group.getAttribute('aria-checked')).toBe('true');
  });

  test('accepts a ref', () => {
    let testRef: React.MutableRefObject<HTMLElement | null>;

    const TestComponent = () => {
      const myRef = React.useRef<HTMLElement | null>(null);
      testRef = myRef;

      return <DropdownGroup data-testid="ref" ref={myRef}></DropdownGroup>;
    };

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('ref')).toBeInTheDocument();
    expect(getByTestId('ref').tagName.toLowerCase()).toBe('div');
    expect(testRef!).toBeDefined();
    expect(testRef!.current).toBeDefined();
  });
});
