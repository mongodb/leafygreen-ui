import React from 'react';
import { render } from '@testing-library/react';
import { EditorView } from '@uiw/react-codemirror';

import { CodeEditor, CodeEditorProps } from '.';

global.MutationObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn().mockReturnValue([]),
}));

let editorView: EditorView;

const selectorMap = {
  foldGutter: '.cm-foldGutter',
};

function expectSelectorInDocument(selector: string, inDocument = true) {
  const element = editorView.view.dom.querySelector(selector);

  if (inDocument) {
    expect(element).toBeInTheDocument();
  } else {
    expect(element).not.toBeInTheDocument();
  }
}

function renderCodeEditor(props: Partial<CodeEditorProps> = {}) {
  const { container } = render(
    <CodeEditor
      {...props}
      ref={ref => {
        editorView = ref as EditorView;
      }}
    />,
  );

  return { container };
}

describe('packages/code-editor', () => {
  test('Fold gutter renders when enabled', () => {
    renderCodeEditor({ enableCodeFolding: true });
    expectSelectorInDocument(selectorMap.foldGutter);
  });

  test('Fold gutter does not renders when disabled', () => {
    renderCodeEditor({ enableCodeFolding: false });
    expectSelectorInDocument(selectorMap.foldGutter, false);
  });
});
