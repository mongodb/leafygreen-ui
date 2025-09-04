import React from 'react';

import { ContextMenu } from '../ContextMenu';

/**
 * A context menu specifically designed for code editors with standard text editing operations.
 *
 * Provides Cut, Copy, and Paste functionality via right-click context menu.
 * Automatically handles clipboard permissions and selected text detection.
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
 * <CodeEditorContextMenu>
 *   <div contentEditable>
 *     Some editable code content
 *   </div>
 * </CodeEditorContextMenu>
 * ```
 */
export const CodeEditorContextMenu = ({
  children,
}: {
  /** The content to provide context menu functionality to */
  children: React.ReactNode;
}) => {
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

        // Delete the selected text from the DOM
        const selection = window.getSelection();

        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
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

  return (
    <ContextMenu
      menuItems={[
        { label: 'Cut', action: handleCut },
        { label: 'Copy', action: handleCopy },
        { label: 'Paste', action: handlePaste },
      ]}
    >
      {children}
    </ContextMenu>
  );
};
