import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { MenuItem } from '../ContextMenuPopup';

import { ContextMenu } from './ContextMenu';

/**
 * Note: We prefer userEvent for most interactions, but use fireEvent for:
 * - contextMenu events (userEvent.rightClick doesn't exist in this version)
 * - preventDefault testing (requires direct fireEvent access to spy on preventDefault)
 */

// Mock the ContextMenuPopup since we're focusing on ContextMenu logic
jest.mock('../ContextMenuPopup', () => ({
  ContextMenuPopup: ({ state, hideMenu, 'data-lgid': dataLgId }: any) => {
    if (!state.isVisible) return null;
    const lgIds = {
      contextMenuPopup: dataLgId
        ? `${dataLgId}-context_menu_popup`
        : 'lg-context_menu_popup',
    };
    return (
      <div
        data-testid="context-menu-popup"
        data-lgid={lgIds.contextMenuPopup}
        style={{
          position: 'absolute',
          left: state.position.x,
          top: state.position.y,
        }}
      >
        {state.items.map((item: MenuItem, index: number) => (
          <button
            key={index}
            onClick={() => {
              if (!item.disabled && item.action) {
                item.action(state.selectedText);
              }
              hideMenu();
            }}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  },
}));

// Mock window.getSelection
const mockGetSelection = jest.fn();
Object.defineProperty(window, 'getSelection', {
  writable: true,
  value: mockGetSelection,
});

const mockAction1 = jest.fn();
const mockAction2 = jest.fn();

const defaultMenuItems: Array<MenuItem> = [
  { label: 'Copy', action: mockAction1 },
  { label: 'Paste', action: mockAction2 },
];

beforeEach(() => {
  jest.clearAllMocks();
  mockGetSelection.mockReturnValue({ toString: () => '' });
});

test('renders children without context menu initially', () => {
  render(
    <ContextMenu menuItems={defaultMenuItems}>
      <div>Test content</div>
    </ContextMenu>,
  );

  expect(screen.getByText('Test content')).toBeInTheDocument();
  expect(screen.queryByTestId('context-menu-popup')).not.toBeInTheDocument();
});

test('shows context menu on right-click', async () => {
  render(
    <ContextMenu menuItems={defaultMenuItems}>
      <div>Test content</div>
    </ContextMenu>,
  );

  const container = screen.getByText('Test content').parentElement;
  fireEvent.contextMenu(container!);

  expect(screen.getByTestId('context-menu-popup')).toBeInTheDocument();
  expect(screen.getByText('Copy')).toBeInTheDocument();
  expect(screen.getByText('Paste')).toBeInTheDocument();
});

test('captures selected text on right-click', async () => {
  mockGetSelection.mockReturnValue({ toString: () => 'selected text' });

  render(
    <ContextMenu menuItems={defaultMenuItems}>
      <div>Test content</div>
    </ContextMenu>,
  );

  const container = screen.getByText('Test content').parentElement;
  fireEvent.contextMenu(container!);

  const copyButton = screen.getByText('Copy');
  await userEvent.click(copyButton);

  expect(mockAction1).toHaveBeenCalledWith('selected text');
});

test('does not show context menu when disabled', async () => {
  render(
    <ContextMenu menuItems={defaultMenuItems} disabled>
      <div>Test content</div>
    </ContextMenu>,
  );

  const container = screen.getByText('Test content').parentElement;
  fireEvent.contextMenu(container!);

  expect(screen.queryByTestId('context-menu-popup')).not.toBeInTheDocument();
});

test('does not show context menu when no menu items provided', async () => {
  render(
    <ContextMenu menuItems={[]}>
      <div>Test content</div>
    </ContextMenu>,
  );

  const container = screen.getByText('Test content').parentElement;
  fireEvent.contextMenu(container!);

  expect(screen.queryByTestId('context-menu-popup')).not.toBeInTheDocument();
});

test('allows default context menu for elements with data-no-context-menu attribute', () => {
  const preventDefaultSpy = jest.fn();

  render(
    <ContextMenu menuItems={defaultMenuItems}>
      <div>
        <span>Regular content</span>
        <button data-no-context-menu="true">Toolbar button</button>
      </div>
    </ContextMenu>,
  );

  const toolbarButton = screen.getByText('Toolbar button');
  const event = new MouseEvent('contextmenu', {
    bubbles: true,
    clientX: 100,
    clientY: 200,
  });
  event.preventDefault = preventDefaultSpy;

  fireEvent(toolbarButton, event);

  expect(screen.queryByTestId('context-menu-popup')).not.toBeInTheDocument();
  expect(preventDefaultSpy).not.toHaveBeenCalled();
});

test('prevents default context menu by default', () => {
  const preventDefaultSpy = jest.fn();

  render(
    <ContextMenu menuItems={defaultMenuItems}>
      <div>Test content</div>
    </ContextMenu>,
  );

  const container = screen.getByText('Test content').parentElement;
  const event = new MouseEvent('contextmenu', {
    bubbles: true,
    clientX: 100,
    clientY: 200,
  });
  event.preventDefault = preventDefaultSpy;

  fireEvent(container!, event);

  expect(preventDefaultSpy).toHaveBeenCalled();
});

test('does not prevent default context menu when preventDefaultContextMenu is false', () => {
  const preventDefaultSpy = jest.fn();

  render(
    <ContextMenu menuItems={defaultMenuItems} preventDefaultContextMenu={false}>
      <div>Test content</div>
    </ContextMenu>,
  );

  const container = screen.getByText('Test content').parentElement;
  const event = new MouseEvent('contextmenu', {
    bubbles: true,
    clientX: 100,
    clientY: 200,
  });
  event.preventDefault = preventDefaultSpy;

  fireEvent(container!, event);

  expect(preventDefaultSpy).not.toHaveBeenCalled();
  expect(screen.getByTestId('context-menu-popup')).toBeInTheDocument();
});

test('hides menu on outside click', async () => {
  render(
    <div>
      <ContextMenu menuItems={defaultMenuItems}>
        <div>Test content</div>
      </ContextMenu>
      <div>Outside content</div>
    </div>,
  );

  const container = screen.getByText('Test content').parentElement;
  fireEvent.contextMenu(container!);

  expect(screen.getByTestId('context-menu-popup')).toBeInTheDocument();

  const outsideElement = screen.getByText('Outside content');
  await userEvent.click(outsideElement);

  expect(screen.queryByTestId('context-menu-popup')).not.toBeInTheDocument();
});

test('hides menu on escape key', async () => {
  render(
    <ContextMenu menuItems={defaultMenuItems}>
      <div>Test content</div>
    </ContextMenu>,
  );

  const container = screen.getByText('Test content').parentElement;
  fireEvent.contextMenu(container!);

  expect(screen.getByTestId('context-menu-popup')).toBeInTheDocument();

  await userEvent.keyboard('{Escape}');

  expect(screen.queryByTestId('context-menu-popup')).not.toBeInTheDocument();
});

test('does not hide menu when clicking inside menu popup', async () => {
  render(
    <ContextMenu menuItems={defaultMenuItems} data-lgid="lg-test-editor">
      <div>Test content</div>
    </ContextMenu>,
  );

  const container = screen.getByText('Test content').parentElement;
  fireEvent.contextMenu(container!);

  const menuPopup = screen.getByTestId('context-menu-popup');
  expect(menuPopup).toBeInTheDocument();

  await userEvent.click(menuPopup);

  expect(screen.getByTestId('context-menu-popup')).toBeInTheDocument();
});

test('positions menu at cursor location', async () => {
  render(
    <ContextMenu menuItems={defaultMenuItems}>
      <div>Test content</div>
    </ContextMenu>,
  );

  const container = screen.getByText('Test content').parentElement;
  fireEvent.contextMenu(container!);

  const menuPopup = screen.getByTestId('context-menu-popup');
  expect(menuPopup).toHaveStyle({
    position: 'absolute',
  });
});

test('sets correct lgid attributes', async () => {
  render(
    <ContextMenu menuItems={defaultMenuItems} data-lgid="lg-custom-editor">
      <div>Test content</div>
    </ContextMenu>,
  );

  const contextMenuContainer = screen.getByText('Test content').parentElement;
  expect(contextMenuContainer).toHaveAttribute(
    'data-lgid',
    'lg-custom-editor-context_menu',
  );

  fireEvent.contextMenu(contextMenuContainer!);

  const menuPopup = screen.getByTestId('context-menu-popup');
  expect(menuPopup).toHaveAttribute(
    'data-lgid',
    'lg-custom-editor-context_menu_popup',
  );
});
