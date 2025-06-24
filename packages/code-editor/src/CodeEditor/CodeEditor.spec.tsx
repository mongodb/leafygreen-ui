import { forceParsing } from '@codemirror/language';
import { act, waitFor } from '@testing-library/react';
import { EditorState } from '@uiw/react-codemirror';

import { renderCodeEditor } from './CodeEditor.testUtils';
import { CodeEditorSelectors, LanguageName } from '.';

global.MutationObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn().mockReturnValue([]),
}));

jest.mock('@codemirror/language', () => {
  const actualModule = jest.requireActual('@codemirror/language');
  return {
    ...actualModule,
    forceParsing: jest.fn(),
  };
});

describe('packages/code-editor', () => {
  test('Renders default value in editor', () => {
    const { container } = renderCodeEditor({ defaultValue: 'content' });
    expect(container).toHaveTextContent('content');
  });

  test('Updates value on when user types', () => {
    const { editor } = renderCodeEditor();
    expect(
      editor.getBySelector(CodeEditorSelectors.Content),
    ).not.toHaveTextContent('new content');
    act(() => {
      editor.interactions.insertText('new content');
    });
    expect(editor.getBySelector(CodeEditorSelectors.Content)).toHaveTextContent(
      'new content',
    );
  });

  test('Fold gutter renders when enabled', () => {
    const { editor } = renderCodeEditor({ enableCodeFolding: true });
    expect(
      editor.getBySelector(CodeEditorSelectors.FoldGutter),
    ).toBeInTheDocument();
  });

  test('Fold gutter does not render when disabled', () => {
    const { editor } = renderCodeEditor({ enableCodeFolding: false });
    expect(
      editor.queryBySelector(CodeEditorSelectors.FoldGutter),
    ).not.toBeInTheDocument();
  });

  test('Line numbers render when enabled', () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'content',
      enableLineNumbers: true,
    });
    expect(
      editor.getBySelector(CodeEditorSelectors.GutterElement, {
        text: '1',
      }),
    ).toBeInTheDocument();
  });

  test('Line numbers do not renders when disabled', () => {
    const { editor } = renderCodeEditor({ enableLineNumbers: false });
    expect(
      editor.queryBySelector(CodeEditorSelectors.GutterElement, { text: '1' }),
    ).not.toBeInTheDocument();
  });

  test('Clickable URLs render when enabled', () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'https://mongodb.design',
      enableClickableUrls: true,
    });
    expect(
      editor.getBySelector(CodeEditorSelectors.HyperLink),
    ).toBeInTheDocument();
  });

  test('Clickable URLs do not render when disable', () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'https://mongodb.design',
      enableClickableUrls: false,
    });
    expect(
      editor.queryBySelector(CodeEditorSelectors.HyperLink),
    ).not.toBeInTheDocument();
  });

  test('Read-only set on editor state when enabled', () => {
    const { editor } = renderCodeEditor({ readOnly: true });
    expect(editor.isReadOnly()).toBe(true);
  });

  test('Read-only not set on editor state when disabled', () => {
    const { editor } = renderCodeEditor({ readOnly: false });
    expect(editor.isReadOnly()).toBe(false);
  });

  test('Line wrapping enabled when enabled', () => {
    const { editor } = renderCodeEditor({ enableLineWrapping: true });
    expect(editor.isLineWrappingEnabled()).toBe(true);
  });

  test('Line wrapping not enabled when disabled', () => {
    const { editor } = renderCodeEditor({ enableLineWrapping: false });
    expect(editor.isLineWrappingEnabled()).toBe(false);
  });

  test('Editor displays placeholder when empty', () => {
    const { editor } = renderCodeEditor({
      placeholder: 'Type your code here...',
    });
    expect(editor.getBySelector(CodeEditorSelectors.Content)).toHaveTextContent(
      'Type your code here...',
    );
  });

  test('Editor displays HTMLElement placeholder when empty', () => {
    const placeholderElement = document.createElement('div');
    placeholderElement.textContent = 'Type your code here...';
    const { editor } = renderCodeEditor({ placeholder: placeholderElement });
    expect(editor.getBySelector(CodeEditorSelectors.Content)).toHaveTextContent(
      'Type your code here...',
    );
  });

  test('the forceParsing() method is called when enabled', () => {
    renderCodeEditor({ forceParsing: true, defaultValue: 'content' });
    expect(forceParsing as jest.Mock).toHaveBeenCalledTimes(1);
  });

  test('correct indentUnit is set on the editor when indentUnit is "space" and indentSize is 2', () => {
    const { editor } = renderCodeEditor({
      indentUnit: 'space',
      indentSize: 2,
    });

    expect(editor.getIndentUnit()).toBe('  ');
  });

  test('correct indentUnit is set on the editor when indentUnit is "space" and indentSize is 4', () => {
    const { editor } = renderCodeEditor({
      indentUnit: 'space',
      indentSize: 4,
    });

    expect(editor.getIndentUnit()).toBe('    ');
  });

  test('correct indentUnit is set on the editor when indentUnit is "tab"', () => {
    const { editor } = renderCodeEditor({
      indentUnit: 'tab',
    });

    expect(editor.getIndentUnit()).toBe('\t');
  });

  test('applies custom extensions to the editor', () => {
    const { editor } = renderCodeEditor({
      extensions: [EditorState.readOnly.of(true)],
    });
    expect(editor.isReadOnly()).toBe(true);
  });

  test('custom extensions have precendence over built-in functionality', () => {
    const { editor } = renderCodeEditor({
      readOnly: false,
      extensions: [EditorState.readOnly.of(true)],
    });
    expect(editor.isReadOnly()).toBe(true);
  });

  test.each(
    /**
     * Excluding C# because it's 3rd party and doesn't add a testable attribute.
     * Will test tsx and jsx separately.
     */
    Object.values(LanguageName).filter(
      lang =>
        lang !== LanguageName.csharp &&
        lang !== LanguageName.tsx &&
        lang !== LanguageName.jsx,
    ),
  )('adds language support for %p', async language => {
    const { container } = renderCodeEditor({ language });
    await waitFor(() => {
      expect(
        container.querySelector(`[data-language="${language}"]`),
      ).toBeInTheDocument();
    });
  });

  test('adds language support for tsx', async () => {
    const { container } = renderCodeEditor({ language: LanguageName.tsx });
    await waitFor(() => {
      expect(
        container.querySelector(`[data-language="typescript"]`),
      ).toBeInTheDocument();
    });
  });

  test('adds language support for jsx', async () => {
    const { container } = renderCodeEditor({ language: LanguageName.jsx });
    await waitFor(() => {
      expect(
        container.querySelector(`[data-language="javascript"]`),
      ).toBeInTheDocument();
    });
  });
});
