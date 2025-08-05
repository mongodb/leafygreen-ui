import React from 'react';
import { indentUnit } from '@codemirror/language';
import { render } from '@testing-library/react';
import { ChangeSpec } from '@uiw/react-codemirror';

import {
  CodeEditor,
  CodeEditorProps,
  CodeEditorSelectors,
  CodeMirrorView,
} from '..';

let editorViewInstance: CodeMirrorView | null = null;
let getEditorViewFn: (() => CodeMirrorView | null) | null = null;

/**
 * Waits for the editor view to be available
 * @param timeout - Maximum time to wait in milliseconds (default: 5000)
 * @returns Promise that resolves when the editor view is available
 * @throws Error if timeout is reached
 */
async function waitForEditorView(timeout = 5000): Promise<CodeMirrorView> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (getEditorViewFn) {
      const view = getEditorViewFn();

      if (view) {
        editorViewInstance = view;
        return view;
      }
    }
    // Wait a bit before checking again
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  throw new Error(`Editor view not available after ${timeout}ms timeout`);
}

/**
 * Ensures the editor view is available, throwing an error if not
 * @throws Error if editor view is not available
 */
function ensureEditorView(): CodeMirrorView {
  if (!editorViewInstance) {
    throw new Error(
      'Editor view is not available. Make sure to call renderCodeEditor first and wait for the editor to initialize.',
    );
  }

  return editorViewInstance;
}

/**
 * Returns the first element matching a specific CodeEditor selector
 * @param selector - The CSS selector to look for in the editor
 * @param options - Optional filtering options
 * @param options.text - Optional text content filter
 * @returns The first DOM element matching the selector and optional text filter
 * @throws Error if no elements or multiple elements are found
 */
function getBySelector(
  selector: CodeEditorSelectors,
  options?: { text?: string },
) {
  const view = ensureEditorView();
  const elements = view.dom.querySelectorAll(selector);

  if (!elements || elements.length === 0) {
    throw new Error(`Element with selector "${selector}" not found`);
  }

  if (elements.length > 1) {
    if (!options?.text) {
      throw new Error(`Multiple elements with selector "${selector}" found`);
    }

    const matchingElements = Array.from(elements).filter(element => {
      return options.text && element.textContent?.includes(options.text);
    });

    if (!matchingElements || matchingElements.length === 0) {
      throw new Error(
        `Element with selector "${selector}" and text "${options.text}" not found`,
      );
    }

    if (matchingElements.length > 1) {
      throw new Error(
        `Multiple elements with selector "${selector}" and text "${options.text}" found`,
      );
    }

    return matchingElements[0];
  }

  return elements[0];
}

/**
 * Returns all elements matching a specific CodeEditor selector
 * @param selector - The CSS selector to look for in the editor
 * @param options - Optional filtering options
 * @param options.text - Optional text content filter
 * @returns All DOM elements matching the selector and optional text filter
 * @throws Error if no elements are found
 */
function getAllBySelector(
  selector: CodeEditorSelectors,
  options?: { text?: string },
): Array<Element> {
  const view = ensureEditorView();
  const elements = view.dom.querySelectorAll(selector);

  if (!elements || elements.length === 0) {
    throw new Error(`No elements with selector "${selector}" found`);
  }

  // If text filter is provided, return only elements containing the text
  if (options?.text) {
    const matchingElements = Array.from(elements).filter(element =>
      element.textContent?.includes(options.text as string),
    );

    if (!matchingElements || matchingElements.length === 0) {
      throw new Error(
        `No elements with selector "${selector}" and text "${options.text}" found`,
      );
    }

    return matchingElements;
  }

  return Array.from(elements);
}

/**
 * Returns the first element matching a specific CodeEditor selector or null if not found
 * @param selector - The CSS selector to look for in the editor
 * @param options - Optional filtering options
 * @param options.text - Optional text content filter
 * @returns The first DOM element matching the selector and optional text filter, or null if not found
 */
function queryBySelector(
  selector: CodeEditorSelectors,
  options?: { text?: string },
) {
  const view = ensureEditorView();
  const elements = view.dom.querySelectorAll(selector);

  if (!elements || elements.length === 0) {
    return null;
  }

  if (elements.length > 1) {
    if (!options?.text) {
      return null;
    }

    const matchingElements = Array.from(elements).filter(element => {
      return options.text && element.textContent?.includes(options.text);
    });

    if (
      !matchingElements ||
      matchingElements.length === 0 ||
      matchingElements.length > 1
    ) {
      return null;
    }

    return matchingElements[0];
  }

  return elements[0];
}

/**
 * Returns all elements matching a specific CodeEditor selector or null if none are found
 * @param selector - The CSS selector to look for in the editor
 * @param options - Optional filtering options
 * @param options.text - Optional text content filter
 * @returns All DOM elements matching the selector and optional text filter, or null if none found
 */
function queryAllBySelector(
  selector: CodeEditorSelectors,
  options?: { text?: string },
): Array<Element> | null {
  const view = ensureEditorView();
  const elements = view.dom.querySelectorAll(selector);

  if (!elements || elements.length === 0) {
    return null;
  }

  // If text filter is provided, return only elements containing the text
  if (options?.text) {
    const matchingElements = Array.from(elements).filter(element =>
      element.textContent?.includes(options.text as string),
    );

    if (!matchingElements || matchingElements.length === 0) {
      return null;
    }

    return matchingElements;
  }

  return Array.from(elements);
}

/**
 * Checks if the editor is in read-only mode
 * @returns Boolean indicating whether the editor is in read-only mode
 */
function isReadOnly() {
  const view = ensureEditorView();
  return view.state.readOnly;
}

/**
 * Retrieves the current indentation unit configuration from the editor
 * @returns The string used for indentation (spaces or tab)
 */
function getIndentUnit() {
  const view = ensureEditorView();
  return view.state.facet(indentUnit);
}

/**
 * Checks if line wrapping is enabled in the editor
 * @returns Boolean indicating whether line wrapping is enabled
 */
function isLineWrappingEnabled() {
  return !!queryBySelector(CodeEditorSelectors.LineWrapping);
}

/**
 * Inserts text into the editor at the specified position
 * @param text - The text to insert
 * @param options - Optional position options
 * @param options.from - Starting position for insertion (defaults to 0)
 * @param options.to - End position for replacement (optional)
 * @throws Error if editor view is not initialized
 */
function insertText(text: string, options?: { from?: number; to?: number }) {
  const view = ensureEditorView();

  const changes: ChangeSpec = { insert: text, from: options?.from || 0 };

  if (options?.to) {
    changes.to = options.to;
  }

  const transaction = view.state.update({
    changes,
  });

  view.dispatch(transaction);
}

export const editor = {
  getBySelector,
  getAllBySelector,
  queryBySelector,
  queryAllBySelector,
  isLineWrappingEnabled,
  isReadOnly,
  getIndentUnit,
  interactions: {
    insertText,
  },
  waitForEditorView,
};

/**
 * Renders a CodeEditor component with the specified props for testing
 * @param props - Props to pass to the CodeEditor component
 * @returns Object containing the rendered container and editor test utilities
 */
export function renderCodeEditor(props: Partial<CodeEditorProps> = {}) {
  const { container } = render(
    <CodeEditor
      {...props}
      ref={ref => {
        getEditorViewFn = ref?.getEditorViewInstance ?? null;
        editorViewInstance = ref?.getEditorViewInstance() ?? null;
      }}
    />,
  );

  return { container, editor };
}
