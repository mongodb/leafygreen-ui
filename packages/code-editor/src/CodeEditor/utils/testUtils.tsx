import React from 'react';
import { render } from '@testing-library/react';
import { ChangeSpec } from '@uiw/react-codemirror';

import {
  CodeEditor,
  CodeEditorProps,
  CodeEditorSelectors,
  CodeMirrorView,
} from '..';

let editorView: CodeMirrorView;

function getBySelector(
  selector: CodeEditorSelectors,
  options?: { text?: string },
) {
  const elements = editorView.dom.querySelectorAll(selector);

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

function queryBySelector(
  selector: CodeEditorSelectors,
  options?: { text?: string },
) {
  const elements = editorView.dom.querySelectorAll(selector);

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

function isReadOnly() {
  return editorView.state.readOnly;
}

function isLineWrappingEnabled() {
  return !!queryBySelector(CodeEditorSelectors.LineWrapping);
}

function insertText(text: string, options?: { from?: number; to?: number }) {
  if (!editorView) {
    throw new Error('Editor view is not initialized');
  }

  const changes: ChangeSpec = { insert: text, from: options?.from || 0 };

  if (options?.to) {
    changes.to = options.to;
  }

  const transaction = editorView.state.update({
    changes,
  });

  editorView.dispatch(transaction);
}

export const editor = {
  getBySelector,
  queryBySelector,
  isLineWrappingEnabled,
  isReadOnly,
  interactions: {
    insertText,
  },
};

export function renderCodeEditor(props: Partial<CodeEditorProps> = {}) {
  const { container } = render(
    <CodeEditor
      {...props}
      ref={ref => {
        if (ref && ref.view) {
          editorView = ref.view;
        }
      }}
    />,
  );

  return { container, editor };
}
