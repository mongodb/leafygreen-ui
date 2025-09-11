import React from 'react';

import { ContextMenu } from '../ContextMenu';
import { type MenuItem } from '../ContextMenuPopup';

import { CodeEditorContextMenuProps } from './CodeEditorContextMenu.types';

/**
 * A context menu specifically designed for code editors with standard text editing operations.
 *
 * Provides Cut, Copy, and Paste functionality via right-click context menu.
 * Automatically handles selected text detection. Custom menu items can be added
 * below the standard items.
 *
 * @example
 * ```tsx
 * <CodeEditorContextMenu>
 *   <textarea>Your code editor content</textarea>
 * </CodeEditorContextMenu>
 * ```
 *
 * @example
 * ```tsx
 * <CodeEditorContextMenu
 *   customMenuItems={[
 *     { label: 'Custom Action', action: () => customAction() },
 *   ]}
 * >
 *   <div contentEditable>
 *     Some editable code content
 *   </div>
 * </CodeEditorContextMenu>
 * ```
 */
export const CodeEditorContextMenu = ({
  children,
  customMenuItems = [],
  'data-lgid': dataLgId,
}: CodeEditorContextMenuProps) => {
  const handleCopy = async (selectedText: string) => {
    if (selectedText) {
      try {
        await navigator.clipboard.writeText(selectedText);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  const handleCut = async (selectedText: string) => {
    if (selectedText) {
      try {
        // Copy the selected text to clipboard
        await navigator.clipboard.writeText(selectedText);

        // Delete the selected text from the DOM and maintain cursor position
        const selection = window.getSelection();

        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          // Collapse the range to the start position (where text was cut)
          range.collapse(true);
          // Clear all selections and re-add the collapsed range to position cursor
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } catch (err) {
        console.error('Failed to cut text:', err);
      }
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();

      if (clipboardText) {
        const selection = window.getSelection();

        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(clipboardText));
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    } catch (err) {
      console.error('Failed to paste text:', err);
    }
  };

  const menuItems: Array<MenuItem> = [
    { label: 'Cut', action: handleCut },
    { label: 'Copy', action: handleCopy },
    { label: 'Paste', action: handlePaste },
  ];

  if (customMenuItems.length > 0) {
    menuItems.push({ label: '', isSeparator: true });
    menuItems.push(...customMenuItems);
  }

  return (
    <ContextMenu menuItems={menuItems} data-lgid={dataLgId}>
      {children}
    </ContextMenu>
  );
};
