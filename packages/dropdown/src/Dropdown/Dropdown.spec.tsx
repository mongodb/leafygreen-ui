import React, { useRef, useState } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { keyMap } from '@leafygreen-ui/lib';

import { Dropdown, DropdownItem, DropdownProps } from '..';

const className = 'testClassName';
const setOpen = jest.fn();
const shouldClose = jest.fn();
const maxWidth = 500;
let testRef: React.MutableRefObject<HTMLElement | null>;

const DropdownExample = (props?: Partial<DropdownProps>) => {
  const [open, setOpen] = useState(true);
  const triggerRef = useRef<HTMLElement>(null);
  const myRef = React.useRef<HTMLElement | null>(null);
  testRef = myRef;

  return (
    <>
      <div data-testid="backdrop" />
      <Dropdown
        open={open}
        setOpen={setOpen}
        triggerRef={triggerRef}
        className={className}
        maxWidth={maxWidth}
        ref={myRef}
        {...props}
      >
        <DropdownItem>Dropdown Item A</DropdownItem>
        <DropdownItem disabled>Dropdown Item B</DropdownItem>
        <DropdownItem>Dropdown Item C</DropdownItem>
      </Dropdown>
    </>
  );
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
        className={className}
        maxWidth={maxWidth}
        {...props}
      >
        <DropdownItem>Dropdown Item A</DropdownItem>
        <DropdownItem disabled>Dropdown Item B</DropdownItem>
        <DropdownItem>Dropdown Item C</DropdownItem>
        <DropdownItem>Dropdown Item D</DropdownItem>
      </Dropdown>
    </>
  );
};

const renderDropdown = (props?: Partial<DropdownProps>) => {
  const utils = render(<DropdownExample {...props} />);
  return utils;
};

const renderTriggerExample = (props?: Partial<DropdownProps>) => {
  const utils = render(<WithTriggerExample {...props} />);
  return utils;
};

describe('packages/dropdown', () => {
  describe('props are applied as expected', () => {
    test('it renders its children', () => {
      renderDropdown();
      const options = screen.getAllByRole('option');
      expect(options[0]).toBeInTheDocument();
      expect(options.length).toBe(3);
    });

    test('it adds the className to the class list', () => {
      renderDropdown();
      const listbox = screen.getByRole('listbox');
      expect(listbox.closest(`.${className}`)).toBeInTheDocument();
    });

    test('it accepts a ref', () => {
      renderDropdown();
      expect(testRef!).toBeDefined();
      expect(testRef!.current).toBeDefined();
    });
  });

  describe('open and close behavior', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    test('it renders the listbox when open is true', () => {
      renderDropdown();
      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();
    });

    test('it does not render the listbox when open is false', () => {
      renderDropdown({ open: false });
      const listbox = screen.queryByRole('listbox');
      expect(listbox).not.toBeInTheDocument();
    });

    test('it fires shouldClose when the open state changes inside of the component - backdrop click', () => {
      renderDropdown({ shouldClose });
      const backdrop = screen.getByTestId('backdrop');
      fireEvent.click(backdrop);
      expect(shouldClose).toHaveBeenCalled();
    });

    test('it fires the setOpen callback when the open state changes inside of the component - backdrop click', () => {
      renderDropdown({ setOpen });
      const backdrop = screen.getByTestId('backdrop');
      fireEvent.click(backdrop);
      expect(setOpen).toHaveBeenCalled();
    });

    test('it does not call setOpen callback when shouldClose evaluates to false', () => {
      renderDropdown({ setOpen, shouldClose: () => false });
      const backdrop = screen.getByTestId('backdrop');
      fireEvent.click(backdrop);
      expect(setOpen).not.toHaveBeenCalled();
    });
  });

  describe('keyboard handling', () => {
    describe(`when highlight behavior is 'focus'`, () => {
      let button: HTMLButtonElement;

      beforeEach(() => {
        renderTriggerExample();
        button = screen.getByRole('button');
        fireEvent.click(button);
      });

      test('the first enabled item is focused when the menu opens', async () => {
        const options = await screen.findAllByRole('option');

        expect(options[0]).toHaveFocus();
      });

      test('disabled items do not receive focus', async () => {
        const listbox = await screen.findByRole('listbox');
        const options = await screen.findAllByRole('option');

        fireEvent.keyDown(listbox, { key: keyMap.ArrowDown });
        expect(options[2]).toHaveFocus();
      });

      test('key up focuses the previous enabled item', async () => {
        const listbox = await screen.findByRole('listbox');
        const options = await screen.findAllByRole('option');

        fireEvent.keyDown(listbox, { key: keyMap.ArrowUp });
        expect(options[3]).toHaveFocus();
      });

      test('key down focuses the next enabled item', async () => {
        const listbox = await screen.findByRole('listbox');
        const options = await screen.findAllByRole('option');

        fireEvent.keyDown(listbox, { key: keyMap.ArrowDown });
        expect(options[2]).toHaveFocus();
      });

      test('closing the menu focuses the triggerRef', async () => {
        const listbox = await screen.findByRole('listbox');

        fireEvent.keyDown(listbox, { key: keyMap.Escape });

        await waitForElementToBeRemoved(listbox);
        expect(button).toHaveFocus();
      });
    });

    describe(`when highlight behavior is 'ariaSelected'`, () => {
      let button: HTMLButtonElement;

      beforeEach(() => {
        renderTriggerExample({ highlightBehavior: 'ariaSelected' });
        button = screen.getByRole('button');
        fireEvent.click(button);
      });

      test('the first enabled item is aria-selected when the menu opens', async () => {
        const options = await screen.findAllByRole('option');

        expect(options[0].getAttribute('aria-selected')).toBe('true');
      });

      test('disabled items are skipped in keyboard navigation', async () => {
        const listbox = await screen.findByRole('listbox');
        const options = await screen.findAllByRole('option');

        fireEvent.keyDown(listbox, { key: keyMap.ArrowDown });
        expect(options[2].getAttribute('aria-selected')).toBe('true');
      });

      test('key up moves aria-focus the previous enabled item', async () => {
        const listbox = await screen.findByRole('listbox');
        const options = await screen.findAllByRole('option');

        fireEvent.keyDown(listbox, { key: keyMap.ArrowUp });
        expect(options[3].getAttribute('aria-selected')).toBe('true');

        fireEvent.keyDown(listbox, { key: keyMap.ArrowUp });
        expect(options[2].getAttribute('aria-selected')).toBe('true');
      });

      test('key down moves aria-focus the next enabled item', async () => {
        const listbox = await screen.findByRole('listbox');
        const options = await screen.findAllByRole('option');

        fireEvent.keyDown(listbox, { key: keyMap.ArrowDown });
        expect(options[2].getAttribute('aria-selected')).toBe('true');
      });

      test('keyboard navigation keeps focus on the triggerRef', async () => {
        const listbox = await screen.findByRole('listbox');

        fireEvent.keyDown(listbox, { key: keyMap.ArrowDown });
        expect(button).toHaveFocus();
      });

      test('closing the menu focuses the triggerRef', async () => {
        const listbox = await screen.findByRole('listbox');

        fireEvent.keyDown(listbox, { key: keyMap.Escape });

        await waitForElementToBeRemoved(listbox);
        expect(button).toHaveFocus();
      });
    });
  });
});
