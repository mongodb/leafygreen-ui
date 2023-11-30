import React, { useRef, useState } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { keyMap } from '@leafygreen-ui/lib';
import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

import { HighlightBehavior } from '../Dropdown/Dropdown.types';
import {
  Dropdown,
  DropdownGroup,
  DropdownGroupProps,
  DropdownItem,
  DropdownProps,
} from '..';

const title = 'Title';
const testId = 'dropdown-group';
const itemTestId = 'item-id';

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

const WithTriggerExample = ({
  hasAction,
  onClick,
  ...props
}: Partial<DropdownProps> & { hasAction?: boolean }) => {
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
        <DropdownGroup
          data-testid={testId}
          hasAction={hasAction}
          onClick={onClick}
        >
          <DropdownItem data-testid={itemTestId}>Item A</DropdownItem>
        </DropdownGroup>
      </Dropdown>
    </>
  );
};

const renderTestKeyboardExample = (
  props: Partial<DropdownProps> & { hasAction?: boolean },
) => {
  const utils = render(<WithTriggerExample {...props} />);
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

  describe('handles click behavior', () => {
    test('clicking the chevron opens the menu group without closing the menu or firing onClick', () => {
      const onClick = jest.fn();
      renderTestKeyboardExample({ onClick });
      const button = screen.getByRole('button');
      fireEvent.click(button);

      const group = screen.getByTestId(testId);
      expect(group).toBeInTheDocument();

      const iconButton = screen.getAllByRole('button')[1];
      fireEvent.click(iconButton);
      const subMenuItem = screen.queryByTestId(itemTestId);
      expect(subMenuItem).toBeInTheDocument();
      expect(onClick).not.toHaveBeenCalled();
    });

    test('clicking the chevron closes the menu group without closing the menu or firing onClick', async () => {
      const onClick = jest.fn();
      renderTestKeyboardExample({ onClick });
      const button = screen.getByRole('button');
      fireEvent.click(button);

      const group = screen.getByTestId(testId);
      expect(group).toBeInTheDocument();

      const iconButton = screen.getAllByRole('button')[1];
      fireEvent.click(iconButton);
      const subMenuItem = screen.queryByTestId(itemTestId);
      expect(subMenuItem).toBeInTheDocument();
      expect(onClick).not.toHaveBeenCalled();

      fireEvent.click(iconButton);
      await waitForElementToBeRemoved(subMenuItem);
      expect(subMenuItem).not.toBeInTheDocument();
    });

    describe('clicking the menugroup', () => {
      test('fires onClick callback and does not close the menu', () => {
        const onClick = jest.fn();
        renderTestKeyboardExample({ onClick });
        const button = screen.getByRole('button');
        fireEvent.click(button);

        const group = screen.getByTestId(testId);

        fireEvent.click(group);
        expect(onClick).toHaveBeenCalled();
        expect(group).toBeInTheDocument();
      });

      test('when "hasAction" is true, clicking menugroup does not toggle its open/close state', () => {
        renderTestKeyboardExample({ hasAction: true });
        const button = screen.getByRole('button');
        fireEvent.click(button);

        const group = screen.getByTestId(testId);
        fireEvent.click(group);
        const subMenuItem = screen.queryByTestId(itemTestId);
        expect(subMenuItem).not.toBeInTheDocument();
      });

      test('when "hasAction" is false, clicking the menugroup toggles its open/close state', () => {
        renderTestKeyboardExample({});
        const button = screen.getByRole('button');
        fireEvent.click(button);

        const group = screen.getByTestId(testId);
        fireEvent.click(group);
        const subMenuItem = screen.queryByTestId(itemTestId);
        expect(subMenuItem).toBeInTheDocument();
      });
    });
  });

  describe('handles keyboard navigation', () => {
    describe('when highlight behavior is focus', () => {
      test('right arrow key opens the menu and arrow down moves focus', async () => {
        renderTestKeyboardExample({});
        const button = screen.getByRole('button');
        fireEvent.click(button);

        const group = screen.getByTestId(testId);
        expect(group).toHaveFocus();

        fireEvent.keyDown(group, { key: keyMap.ArrowRight });
        const subMenuItem = await screen.findByTestId(itemTestId);
        expect(subMenuItem).toBeInTheDocument();

        fireEvent.keyDown(group, { key: keyMap.ArrowDown });
        expect(subMenuItem).toHaveFocus();
      });

      test('left arrow key closes the menu', async () => {
        renderTestKeyboardExample({});
        const button = screen.getByRole('button');
        fireEvent.click(button);

        const group = screen.getByTestId(testId);
        expect(group).toHaveFocus();

        fireEvent.keyDown(group, { key: keyMap.ArrowRight });
        const subMenuItem = await screen.findByTestId(itemTestId);
        expect(subMenuItem).toBeInTheDocument();

        fireEvent.keyDown(group, { key: keyMap.ArrowLeft });
        await waitForElementToBeRemoved(subMenuItem);
        expect(subMenuItem).not.toBeInTheDocument();
      });

      describe('and "hasAction" is true', () => {
        test('space key triggers onClick', async () => {
          const onClick = jest.fn();
          renderTestKeyboardExample({ onClick, hasAction: true });

          const button = screen.getByRole('button');
          fireEvent.click(button);

          const group = screen.getByTestId(testId);
          expect(group).toHaveFocus();

          userEvent.keyboard('[Space]');
          expect(onClick).toHaveBeenCalled();
        });

        test('enter key triggers onClick', async () => {
          const onClick = jest.fn();
          renderTestKeyboardExample({ onClick, hasAction: true });

          const button = screen.getByRole('button');
          fireEvent.click(button);

          const group = screen.getByTestId(testId);
          expect(group).toHaveFocus();

          userEvent.keyboard('[Enter]');
          expect(onClick).toHaveBeenCalled();
        });
      });
    });

    describe('when highlight behavior is ariaSelected', () => {
      test('right arrow key opens the menu and arrow down moves aria-selected', async () => {
        renderTestKeyboardExample({
          highlightBehavior: HighlightBehavior.AriaSelected,
        });
        const button = screen.getByRole('button');
        fireEvent.click(button);

        const group = screen.getByTestId(testId);
        expect(group.getAttribute('aria-selected')).toBe('true');

        fireEvent.keyDown(group, { key: keyMap.ArrowRight });
        const subMenuItem = await screen.findByTestId(itemTestId);
        expect(subMenuItem).toBeInTheDocument();

        fireEvent.keyDown(group, { key: keyMap.ArrowDown });
        expect(subMenuItem.getAttribute('aria-selected')).toBe('true');
      });

      describe('and "hasAction" is true', () => {
        test('space key triggers onClick', async () => {
          const onClick = jest.fn();
          renderTestKeyboardExample({
            highlightBehavior: HighlightBehavior.AriaSelected,
            onClick,
            hasAction: true,
          });

          const button = screen.getByRole('button');
          fireEvent.click(button);

          const group = screen.getByTestId(testId);
          expect(group.getAttribute('aria-selected')).toBe('true');

          userEvent.keyboard('[Space]');
          expect(onClick).toHaveBeenCalled();
        });

        test('enter key triggers onClick', async () => {
          const onClick = jest.fn();
          renderTestKeyboardExample({
            highlightBehavior: HighlightBehavior.AriaSelected,
            onClick,
            hasAction: true,
          });

          const button = screen.getByRole('button');
          fireEvent.click(button);

          const group = screen.getByTestId(testId);
          expect(group.getAttribute('aria-selected')).toBe('true');

          userEvent.keyboard('[Enter]');
          expect(onClick).toHaveBeenCalled();
        });
      });
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
