import React from 'react';
import { indentUnit } from '@codemirror/language';
import { type ChangeSpec } from '@codemirror/state';
import { render } from '@testing-library/react';

import { preLoadedModules } from '../testing/preLoadedModules';

import { type CodeEditorModules } from './hooks';
import {
  CodeEditor,
  CodeEditorProps,
  CodeEditorSelectors,
  CodeMirrorView,
} from '.';

let editorViewInstance: CodeMirrorView | null = null;
let editorHandleInstance: any = null;

/**
 * Ensures the editor view is available, throwing an error if not
 * @throws Error if editor view is not available
 */
function getEditorView(): CodeMirrorView {
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
  const view = getEditorView();
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
  const view = getEditorView();
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
 * Checks if the editor is in read-only mode
 * @returns Boolean indicating whether the editor is in read-only mode
 */
function isReadOnly() {
  const view = getEditorView();
  return view.state.readOnly;
}

/**
 * Retrieves the current indentation unit configuration from the editor
 * @returns The string used for indentation (spaces or tab)
 */
function getIndentUnit() {
  const view = getEditorView();
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
 * Gets the current content of the editor
 * @returns The current text content of the editor
 * @throws Error if editor view is not initialized
 */
function getContent(): string {
  const view = getEditorView();
  return view.state.doc.toString();
}

/**
 * Gets the editor handle instance for testing imperative methods
 * @returns The editor handle instance
 * @throws Error if editor handle is not available
 */
function getHandle(): any {
  if (!editorHandleInstance) {
    throw new Error(
      'Editor handle not available. Make sure to call renderCodeEditor first.',
    );
  }

  return editorHandleInstance;
}

/**
 * Inserts text into the editor at the specified position
 * @param text - The text to insert
 * @param options - Optional position options
 * @param options.from - Starting position for insertion (defaults to end of document)
 * @param options.to - End position for replacement (optional)
 * @throws Error if editor view is not initialized
 */
function insertText(text: string, options?: { from?: number; to?: number }) {
  const view = getEditorView();

  // Default to inserting at the end of the document
  const defaultFrom = options?.from ?? view.state.doc.length;
  const changes: ChangeSpec = { insert: text, from: defaultFrom };

  if (options?.to) {
    changes.to = options.to;
  }

  const transaction = view.state.update({
    changes,
  });

  view.dispatch(transaction);
}

/**
 * Performs an undo operation on the editor using the imperative handle
 * @returns Boolean indicating if undo was successful
 * @throws Error if editor handle is not available
 */
function undo(): boolean {
  if (!editorHandleInstance) {
    throw new Error(
      'Editor handle not available. Make sure to call renderCodeEditor first.',
    );
  }

  return editorHandleInstance.undo();
}

/**
 * Performs a redo operation on the editor using the imperative handle
 * @returns Boolean indicating if redo was successful
 * @throws Error if editor handle is not available
 */
function redo(): boolean {
  if (!editorHandleInstance) {
    throw new Error(
      'Editor handle not available. Make sure to call renderCodeEditor first.',
    );
  }

  return editorHandleInstance.redo();
}

export const editor = {
  getBySelector,
  queryBySelector,
  isLineWrappingEnabled,
  isReadOnly,
  getIndentUnit,
  getContent,
  getHandle,
  interactions: {
    insertText,
    undo,
    redo,
  },
};

/**
 * Renders a CodeEditor component with the specified props for testing.
 * Automatically provides preloaded modules for synchronous rendering.
 * @param props - Props to pass to the CodeEditor component
 * @param options - Optional rendering options
 * @param options.children - Children to render inside the CodeEditor (e.g., Panel components)
 * @returns Object containing the rendered container and editor test utilities
 */
export function renderCodeEditor(
  props: Partial<CodeEditorProps> = {},
  moduleOverrides?: Partial<CodeEditorModules>,
) {
  const { container } = render(
    <CodeEditor
      {...props}
      preLoadedModules={{ ...preLoadedModules, ...moduleOverrides }}
      ref={ref => {
        editorViewInstance = ref?.getEditorViewInstance() ?? null;
        editorHandleInstance = ref;
      }}
    />,
  );

  return { container, editor };
}
