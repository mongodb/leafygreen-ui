import { forceParsing } from '@codemirror/language';
import { act } from '@testing-library/react';

import { renderCodeEditor } from './utils/testUtils';
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
      editor.userEvent.type('new content');
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

  test('Fold gutter does not renders when disabled', () => {
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

  test('Active line highlighting renders when enabled', () => {
    const { editor } = renderCodeEditor({ enableActiveLineHighlighting: true });
    expect(
      editor.getBySelector(CodeEditorSelectors.ActiveLine),
    ).toBeInTheDocument();
    expect(
      editor.getBySelector(CodeEditorSelectors.ActiveLineGutter, { text: '1' }),
    ).toBeInTheDocument();
  });

  test('Active line highlighting does not render when disabled', () => {
    const { editor } = renderCodeEditor({
      enableActiveLineHighlighting: false,
    });
    expect(
      editor.queryBySelector(CodeEditorSelectors.ActiveLine),
    ).not.toBeInTheDocument();
    expect(
      editor.queryBySelector(CodeEditorSelectors.ActiveLineGutter, {
        text: '1',
      }),
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

  test('the forceParsing() method is called when enabled', async () => {
    renderCodeEditor({ forceParsing: true, defaultValue: 'content' });
    expect(forceParsing as jest.Mock).toHaveBeenCalledTimes(1);
  });
});
