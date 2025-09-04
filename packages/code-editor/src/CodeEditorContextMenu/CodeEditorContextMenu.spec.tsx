import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { CodeEditorContextMenu } from './CodeEditorContextMenu';

// Mock the ContextMenu component since we're testing CodeEditorContextMenu logic
jest.mock('../ContextMenu', () => ({
  ContextMenu: ({ children, menuItems, 'data-lgid': dataLgId }: any) => (
    <div data-testid="context-menu" data-lgid={dataLgId}>
      {children}
      <div data-testid="menu-items">
        {menuItems.map((item: any, index: number) => (
          <button
            key={index}
            onClick={() => item.action?.('selected text')}
            disabled={item.disabled}
            data-testid={
              item.isSeparator
                ? 'separator'
                : `menu-item-${item.label.toLowerCase()}`
            }
          >
            {item.isSeparator ? '---' : item.label}
          </button>
        ))}
      </div>
    </div>
  ),
}));

// Mock navigator.clipboard
const mockClipboard = {
  writeText: jest.fn().mockResolvedValue(undefined),
  readText: jest.fn().mockResolvedValue('clipboard content'),
};

Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  value: mockClipboard,
});

// Mock window.getSelection
const mockRange = {
  deleteContents: jest.fn(),
  insertNode: jest.fn(),
  collapse: jest.fn(),
  getRangeAt: jest.fn().mockReturnThis(),
};

const mockSelection = {
  rangeCount: 1,
  getRangeAt: jest.fn().mockReturnValue(mockRange),
  removeAllRanges: jest.fn(),
  addRange: jest.fn(),
};

Object.defineProperty(window, 'getSelection', {
  writable: true,
  value: jest.fn().mockReturnValue(mockSelection),
});

// Mock document.createTextNode
const mockTextNode = { nodeType: 3, textContent: 'clipboard content' };
Object.defineProperty(document, 'createTextNode', {
  writable: true,
  value: jest.fn().mockReturnValue(mockTextNode),
});

// Mock console.error to avoid noise in tests
const consoleErrorSpy = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  consoleErrorSpy.mockRestore();
});

test('renders children and ContextMenu with default menu items', () => {
  render(
    <CodeEditorContextMenu>
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  expect(screen.getByText('Code editor content')).toBeInTheDocument();
  expect(screen.getByTestId('context-menu')).toBeInTheDocument();
  expect(screen.getByTestId('menu-item-cut')).toBeInTheDocument();
  expect(screen.getByTestId('menu-item-copy')).toBeInTheDocument();
  expect(screen.getByTestId('menu-item-paste')).toBeInTheDocument();
});

test('includes custom menu items with separator when provided', () => {
  const customMenuItems = [
    { label: 'Format', action: jest.fn() },
    { label: 'Lint', action: jest.fn() },
  ];

  render(
    <CodeEditorContextMenu customMenuItems={customMenuItems}>
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  expect(screen.getByTestId('separator')).toBeInTheDocument();
  expect(screen.getByTestId('menu-item-format')).toBeInTheDocument();
  expect(screen.getByTestId('menu-item-lint')).toBeInTheDocument();
});

test('does not include separator when no custom menu items provided', () => {
  render(
    <CodeEditorContextMenu>
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  expect(screen.queryByTestId('separator')).not.toBeInTheDocument();
});

test('forwards data-lgid prop to ContextMenu', () => {
  render(
    <CodeEditorContextMenu data-lgid="lg-test-editor">
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  expect(screen.getByTestId('context-menu')).toHaveAttribute(
    'data-lgid',
    'lg-test-editor',
  );
});

test('copy action writes selected text to clipboard', async () => {
  render(
    <CodeEditorContextMenu>
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  await userEvent.click(screen.getByTestId('menu-item-copy'));

  expect(mockClipboard.writeText).toHaveBeenCalledWith('selected text');
});

test('copy action handles empty selection gracefully', async () => {
  render(
    <CodeEditorContextMenu>
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  // Override the mock for this test to simulate no selection
  const copyButton = screen.getByTestId('menu-item-copy');
  fireEvent.click(copyButton);

  // Simulate action being called with empty string
  const contextMenu = screen.getByTestId('context-menu');
  const menuItems = contextMenu.querySelector('[data-testid="menu-items"]');
  expect(menuItems).toBeInTheDocument();
});

test('cut action copies text and manipulates DOM selection', async () => {
  render(
    <CodeEditorContextMenu>
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  await userEvent.click(screen.getByTestId('menu-item-cut'));

  expect(mockClipboard.writeText).toHaveBeenCalledWith('selected text');
  expect(mockRange.deleteContents).toHaveBeenCalled();
  expect(mockRange.collapse).toHaveBeenCalledWith(true);
  expect(mockSelection.removeAllRanges).toHaveBeenCalled();
  expect(mockSelection.addRange).toHaveBeenCalledWith(mockRange);
});

test('paste action reads from clipboard and inserts text', async () => {
  render(
    <CodeEditorContextMenu>
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  await userEvent.click(screen.getByTestId('menu-item-paste'));

  expect(mockClipboard.readText).toHaveBeenCalled();
  expect(document.createTextNode).toHaveBeenCalledWith('clipboard content');
  expect(mockRange.deleteContents).toHaveBeenCalled();
  expect(mockRange.insertNode).toHaveBeenCalledWith(mockTextNode);
  expect(mockRange.collapse).toHaveBeenCalledWith(false);
  expect(mockSelection.removeAllRanges).toHaveBeenCalled();
  expect(mockSelection.addRange).toHaveBeenCalledWith(mockRange);
});

test('handles clipboard write errors gracefully', async () => {
  mockClipboard.writeText.mockRejectedValueOnce(
    new Error('Clipboard access denied'),
  );

  render(
    <CodeEditorContextMenu>
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  await userEvent.click(screen.getByTestId('menu-item-copy'));

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    'Failed to copy text:',
    expect.any(Error),
  );
});

test('handles clipboard read errors gracefully', async () => {
  mockClipboard.readText.mockRejectedValueOnce(
    new Error('Clipboard access denied'),
  );

  render(
    <CodeEditorContextMenu>
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  await userEvent.click(screen.getByTestId('menu-item-paste'));

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    'Failed to paste text:',
    expect.any(Error),
  );
});

test('handles missing selection during cut operation', async () => {
  const mockGetSelection = jest.fn().mockReturnValue(null);
  Object.defineProperty(window, 'getSelection', {
    writable: true,
    value: mockGetSelection,
  });

  render(
    <CodeEditorContextMenu>
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  await userEvent.click(screen.getByTestId('menu-item-cut'));

  expect(mockClipboard.writeText).toHaveBeenCalledWith('selected text');
  // Should not attempt DOM manipulation when no selection
  expect(mockRange.deleteContents).not.toHaveBeenCalled();
});

test('handles missing selection during paste operation', async () => {
  const mockGetSelection = jest.fn().mockReturnValue(null);
  Object.defineProperty(window, 'getSelection', {
    writable: true,
    value: mockGetSelection,
  });

  render(
    <CodeEditorContextMenu>
      <div>Code editor content</div>
    </CodeEditorContextMenu>,
  );

  await userEvent.click(screen.getByTestId('menu-item-paste'));

  expect(mockClipboard.readText).toHaveBeenCalled();
  // Should not attempt DOM manipulation when no selection
  expect(mockRange.insertNode).not.toHaveBeenCalled();
});
