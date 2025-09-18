import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { CodeEditorContextMenu } from './CodeEditorContextMenu';
import { CodeEditorContextMenuProps } from './CodeEditorContextMenu.types';

/**
 * Create a stateful clipboard mock that remembers what was written to it.
 * This is useful in the 'paste' test so that we can cut some text and then
 * paste it and validate that works as expected.
 */
let clipboardText = '';
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn((text: string) => {
      clipboardText = text;
      return Promise.resolve();
    }),
    readText: jest.fn(() => Promise.resolve(clipboardText)),
  },
});

/** Reset clipboard state between tests */
beforeEach(() => {
  clipboardText = '';
  jest.clearAllMocks();
});

function renderEditableContentWithContextMenu(
  props?: Partial<CodeEditorContextMenuProps>,
) {
  /**
   * The CodeEditor is not an input or textarea, so the implementation is
   * slightly different than what would be needed for that. Therefore, we need
   * to use a div with contentEditable instead, to more accurately test its
   * functionality.
   */
  render(
    <CodeEditorContextMenu {...props}>
      <div
        data-testid="code-editor-content"
        contentEditable
        suppressContentEditableWarning={true}
      >
        content
      </div>
    </CodeEditorContextMenu>,
  );
  return screen.getByTestId('code-editor-content') as HTMLDivElement;
}

/**
 * Utils to select text such as tripleClick and selectAll don't seem to be
 * available on our version of userEvent. This manually makes a text selection.
 */
function selectAllText(element: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

describe('CodeEditorContextMenu', () => {
  test('renders default menu items in menu on right click', () => {
    render(
      <CodeEditorContextMenu>
        <div data-testid="code-editor-content">content</div>
      </CodeEditorContextMenu>,
    );

    userEvent.click(screen.getByTestId('code-editor-content'), { button: 2 });
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Paste' })).toBeInTheDocument();
  });

  test('renders custom menu items in menu on right click', () => {
    renderEditableContentWithContextMenu({
      customMenuItems: [{ label: 'Custom Action', action: () => {} }],
    });
    userEvent.click(screen.getByTestId('code-editor-content'), { button: 2 });
    expect(
      screen.getByRole('menuitem', { name: 'Custom Action' }),
    ).toBeInTheDocument();
  });

  test('calls writeText() with the selected text when copy is clicked', () => {
    const element = renderEditableContentWithContextMenu();
    selectAllText(element);
    userEvent.click(screen.getByTestId('code-editor-content'), { button: 2 });
    userEvent.click(screen.getByRole('menuitem', { name: 'Copy' }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('content');
  });

  test('calls writeText() with the selected text when cut is clicked', () => {
    const element = renderEditableContentWithContextMenu();
    selectAllText(element);
    userEvent.click(screen.getByTestId('code-editor-content'), { button: 2 });
    userEvent.click(screen.getByRole('menuitem', { name: 'Cut' }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('content');
  });

  test('removes selected text when cut is clicked', async () => {
    const element = renderEditableContentWithContextMenu();
    selectAllText(element);
    userEvent.click(screen.getByTestId('code-editor-content'), { button: 2 });
    await userEvent.click(screen.getByRole('menuitem', { name: 'Cut' }));
    expect(element.textContent).toBe('');
  });

  test('pastes text when paste is clicked', async () => {
    const element = renderEditableContentWithContextMenu();
    selectAllText(element);
    userEvent.click(screen.getByTestId('code-editor-content'), { button: 2 });
    await userEvent.click(screen.getByRole('menuitem', { name: 'Cut' }));
    expect(element.textContent).toBe('');
    userEvent.click(screen.getByTestId('code-editor-content'), { button: 2 });
    await userEvent.click(screen.getByRole('menuitem', { name: 'Paste' }));
    expect(element.textContent).toBe('content');
  });
});
