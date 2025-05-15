import React from 'react';
import { act, render } from '@testing-library/react';
import { ChangeSpec, EditorView } from '@uiw/react-codemirror';

import { CodeEditor, CodeEditorProps } from '.';

global.MutationObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn().mockReturnValue([]),
}));

let editorView: EditorView;

const EditorSelectors = {
  FoldGutter: '.cm-foldGutter',
  GutterElement: '.cm-gutterElement',
} as const;
type EditorSelectors = (typeof EditorSelectors)[keyof typeof EditorSelectors];

const editor = {
  getBySelector: (selector: EditorSelectors, options?: { text?: string }) => {
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
  },

  queryBySelector: (selector: EditorSelectors, options?: { text?: string }) => {
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
  },

  insertText: (text: string, options?: { from?: number; to?: number }) => {
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
  },
};

function renderEditor(props: Partial<CodeEditorProps> = {}) {
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

  return { container };
}

describe('packages/code-editor', () => {
  test('Renders value in editor', () => {
    const { container } = renderEditor({ value: 'content' });
    expect(container).toHaveTextContent('content');
  });

  test('Updates value on text insertion', async () => {
    const onChange = jest.fn();
    const { container } = renderEditor({
      onChange,
    });
    expect(container).not.toHaveTextContent('new content');
    act(() => {
      editor.insertText('new content');
    });
    expect(container).toHaveTextContent('new content');
  });

  test('Fold gutter renders when enabled', () => {
    renderEditor({ enableCodeFolding: true });
    expect(
      editor.getBySelector(EditorSelectors.FoldGutter),
    ).toBeInTheDocument();
  });

  test('Fold gutter does not renders when disabled', () => {
    renderEditor({ enableCodeFolding: false });
    expect(
      editor.queryBySelector(EditorSelectors.FoldGutter),
    ).not.toBeInTheDocument();
  });

  test('Line numbers render when enabled', () => {
    renderEditor({ value: 'content', enableLineNumbers: true });
    expect(
      editor.getBySelector(EditorSelectors.GutterElement, {
        text: '1',
      }),
    ).toBeInTheDocument();
  });

  test('Line numbers does not renders when disabled', () => {
    renderEditor({ enableLineNumbers: false });
    expect(
      editor.queryBySelector(EditorSelectors.GutterElement, { text: '1' }),
    ).not.toBeInTheDocument();
  });
});
