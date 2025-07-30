import { forceParsing } from '@codemirror/language';
import { act, waitFor } from '@testing-library/react';
import { EditorState } from '@uiw/react-codemirror';

import { LanguageName } from './hooks/extensions/useLanguageExtension';
import { renderCodeEditor } from './testing/testUtils';
import { CodeEditorSelectors } from '.';

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
  test('Renders default value in editor', async () => {
    const { editor, container } = renderCodeEditor({ defaultValue: 'content' });
    await editor.waitForEditorView();

    expect(container).toHaveTextContent('content');
  });

  test('Updates value on when user types', async () => {
    const { editor } = renderCodeEditor();
    await editor.waitForEditorView();

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

  test('Fold gutter renders when enabled', async () => {
    const { editor } = renderCodeEditor({ enableCodeFolding: true });
    await editor.waitForEditorView();

    expect(
      editor.getBySelector(CodeEditorSelectors.FoldGutter),
    ).toBeInTheDocument();
  });

  test('Fold gutter does not render when disabled', async () => {
    const { editor } = renderCodeEditor({ enableCodeFolding: false });
    await editor.waitForEditorView();

    expect(
      editor.queryBySelector(CodeEditorSelectors.FoldGutter),
    ).not.toBeInTheDocument();
  });

  test('Line numbers render when enabled', async () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'content',
      enableLineNumbers: true,
    });
    await editor.waitForEditorView();

    expect(
      editor.getBySelector(CodeEditorSelectors.GutterElement, {
        text: '1',
      }),
    ).toBeInTheDocument();
  });

  test('Line numbers do not render when disabled', async () => {
    const { editor } = renderCodeEditor({ enableLineNumbers: false });
    await editor.waitForEditorView();

    /**
     * When the custom caret was used it appears the line number still gets
     * rendered but is done so with visibility: hidden
     */
    expect(
      editor.queryBySelector(CodeEditorSelectors.LineNumbers),
    ).not.toBeInTheDocument();
  });

  test('Clickable URLs render when enabled', async () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'https://mongodb.design',
      enableClickableUrls: true,
    });
    await editor.waitForEditorView();

    expect(
      editor.getBySelector(CodeEditorSelectors.HyperLink),
    ).toBeInTheDocument();
  });

  test('Clickable URLs do not render when disable', async () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'https://mongodb.design',
      enableClickableUrls: false,
    });
    await editor.waitForEditorView();

    expect(
      editor.queryBySelector(CodeEditorSelectors.HyperLink),
    ).not.toBeInTheDocument();
  });

  test('Read-only set on editor state when enabled', async () => {
    const { editor } = renderCodeEditor({ readOnly: true });
    await editor.waitForEditorView();

    expect(editor.isReadOnly()).toBe(true);
  });

  test('Read-only not set on editor state when disabled', async () => {
    const { editor } = renderCodeEditor({ readOnly: false });
    await editor.waitForEditorView();

    expect(editor.isReadOnly()).toBe(false);
  });

  test('Line wrapping enabled when enabled', async () => {
    const { editor } = renderCodeEditor({ enableLineWrapping: true });
    await editor.waitForEditorView();

    expect(editor.isLineWrappingEnabled()).toBe(true);
  });

  test('Line wrapping not enabled when disabled', async () => {
    const { editor } = renderCodeEditor({ enableLineWrapping: false });
    await editor.waitForEditorView();

    expect(editor.isLineWrappingEnabled()).toBe(false);
  });

  test('Editor displays placeholder when empty', async () => {
    const { editor } = renderCodeEditor({
      placeholder: 'Type your code here...',
    });
    await editor.waitForEditorView();

    expect(editor.getBySelector(CodeEditorSelectors.Content)).toHaveTextContent(
      'Type your code here...',
    );
  });

  test('Editor displays HTMLElement placeholder when empty', async () => {
    const placeholderElement = document.createElement('div');
    placeholderElement.textContent = 'Type your code here...';
    const { editor } = renderCodeEditor({ placeholder: placeholderElement });
    await editor.waitForEditorView();

    expect(editor.getBySelector(CodeEditorSelectors.Content)).toHaveTextContent(
      'Type your code here...',
    );
  });

  test('the forceParsing() method is called when enabled', async () => {
    const { editor } = renderCodeEditor({
      forceParsing: true,
      defaultValue: 'content',
    });
    await editor.waitForEditorView();

    expect(forceParsing as jest.Mock).toHaveBeenCalled();
  });

  test('correct indentUnit is set on the editor when indentUnit is "space" and indentSize is 2', async () => {
    const { editor } = renderCodeEditor({
      indentUnit: 'space',
      indentSize: 2,
    });
    await editor.waitForEditorView();

    expect(editor.getIndentUnit()).toBe('  ');
  });

  test('correct indentUnit is set on the editor when indentUnit is "space" and indentSize is 4', async () => {
    const { editor } = renderCodeEditor({
      indentUnit: 'space',
      indentSize: 4,
    });
    await editor.waitForEditorView();

    expect(editor.getIndentUnit()).toBe('    ');
  });

  test('correct indentUnit is set on the editor when indentUnit is "tab"', async () => {
    const { editor } = renderCodeEditor({
      indentUnit: 'tab',
    });
    await editor.waitForEditorView();

    expect(editor.getIndentUnit()).toBe('\t');
  });

  test('applies custom extensions to the editor', async () => {
    const { editor } = renderCodeEditor({
      extensions: [EditorState.readOnly.of(true)],
    });
    await editor.waitForEditorView();

    expect(editor.isReadOnly()).toBe(true);
  });

  test('custom extensions have precendence over built-in functionality', async () => {
    const { editor } = renderCodeEditor({
      readOnly: false,
      extensions: [EditorState.readOnly.of(true)],
    });
    await editor.waitForEditorView();

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
