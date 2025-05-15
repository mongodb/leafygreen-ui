import React from 'react';
// import { forceParsing } from '@codemirror/language';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditorView } from '@uiw/react-codemirror';

import { CodeEditor, CodeEditorProps } from '.';

global.MutationObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn().mockReturnValue([]),
}));

let editorView: EditorView;

const EditorSelectors = {
  ActiveLine: '.cm-activeLine',
  ActiveLineGutter: '.cm-activeLineGutter',
  Content: '.cm-content',
  FoldGutter: '.cm-foldGutter',
  GutterElement: '.cm-gutterElement',
  HyperLink: '.cm-hyper-link-icon',
  LineWrapping: '.cm-lineWrapping',
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

  isLineWrappingEnabled: () => {
    return !!editor.queryBySelector(EditorSelectors.LineWrapping);
  },

  isReadOnly: () => {
    return editorView.state.readOnly;
  },

  type: (text: string) => {
    const content = editor.getBySelector(EditorSelectors.Content);
    userEvent.click(content);
    userEvent.type(content, text);
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

// jest.mock('@codemirror/language', () => {
//   const actualModule = jest.requireActual('@codemirror/language');
//   return {
//     ...actualModule,
//     forceParsing: jest.fn(),
//   };
// });

describe('packages/code-editor', () => {
  test('Renders default value in editor', () => {
    const { container } = renderEditor({ defaultValue: 'content' });
    expect(container).toHaveTextContent('content');
  });

  test('Updates value on when user types', async () => {
    renderEditor();
    expect(editor.getBySelector(EditorSelectors.Content)).not.toHaveTextContent(
      'new content',
    );
    act(() => {
      editor.type('new content');
    });
    expect(editor.getBySelector(EditorSelectors.Content)).toHaveTextContent(
      'new content',
    );
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
    renderEditor({ defaultValue: 'content', enableLineNumbers: true });
    expect(
      editor.getBySelector(EditorSelectors.GutterElement, {
        text: '1',
      }),
    ).toBeInTheDocument();
  });

  test('Line numbers do not renders when disabled', () => {
    renderEditor({ enableLineNumbers: false });
    expect(
      editor.queryBySelector(EditorSelectors.GutterElement, { text: '1' }),
    ).not.toBeInTheDocument();
  });

  test('Active line highlighting renders when enabled', () => {
    renderEditor({ enableActiveLineHighlighting: true });
    expect(
      editor.getBySelector(EditorSelectors.ActiveLine),
    ).toBeInTheDocument();
    expect(
      editor.getBySelector(EditorSelectors.ActiveLineGutter, { text: '1' }),
    ).toBeInTheDocument();
  });

  test('Active line highlighting does not render when disabled', () => {
    renderEditor({ enableActiveLineHighlighting: false });
    expect(
      editor.queryBySelector(EditorSelectors.ActiveLine),
    ).not.toBeInTheDocument();
    expect(
      editor.queryBySelector(EditorSelectors.ActiveLineGutter, { text: '1' }),
    ).not.toBeInTheDocument();
  });

  test('Clickable URLs render when enabled', () => {
    renderEditor({
      defaultValue: 'https://mongodb.design',
      enableClickableUrls: true,
    });
    expect(editor.getBySelector(EditorSelectors.HyperLink)).toBeInTheDocument();
  });

  test('Clickable URLs do not render when disable', () => {
    renderEditor({
      defaultValue: 'https://mongodb.design',
      enableClickableUrls: false,
    });
    expect(
      editor.queryBySelector(EditorSelectors.HyperLink),
    ).not.toBeInTheDocument();
  });

  test('Read-only set on editor state when enabled', () => {
    renderEditor({ readOnly: true });
    expect(editor.isReadOnly()).toBe(true);
  });

  test('Read-only not set on editor state when disabled', () => {
    renderEditor({ readOnly: false });
    expect(editor.isReadOnly()).toBe(false);
  });

  test('Line wrapping enabled when enabled', () => {
    renderEditor({ enableLineWrapping: true });
    expect(editor.isLineWrappingEnabled()).toBe(true);
  });

  test('Line wrapping not enabled when disabled', () => {
    renderEditor({ enableLineWrapping: false });
    expect(editor.isLineWrappingEnabled()).toBe(false);
  });

  test('Editor displays placeholder when empty', () => {
    renderEditor({ placeholder: 'Type your code here...' });
    expect(editor.getBySelector(EditorSelectors.Content)).toHaveTextContent(
      'Type your code here...',
    );
  });

  test('Editor displays HTMLElement placeholder when empty', () => {
    const placeholderElement = document.createElement('div');
    placeholderElement.textContent = 'Type your code here...';
    renderEditor({ placeholder: placeholderElement });
    expect(editor.getBySelector(EditorSelectors.Content)).toHaveTextContent(
      'Type your code here...',
    );
  });

  // test('the forceParsing() method is called when enabled', async () => {
  //   renderEditor({ forceParsing: true });
  //   await waitFor(() => {
  //     expect(forceParsing as jest.Mock).toHaveBeenCalledTimes(1);
  //   });
  // });
});
