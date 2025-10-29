import React from 'react';
import { act, waitFor } from '@testing-library/react';

import { renderCodeEditor } from './CodeEditor.testUtils';
import { CodeEditorSelectors } from './CodeEditor.types';

const mockForceParsing = jest.fn();

jest.mock('@codemirror/language', () => ({
  ...jest.requireActual('@codemirror/language'),
  forceParsing: (...args: Array<any>) => mockForceParsing(...args),
}));

// Enhanced MutationObserver mock for CodeMirror compatibility
global.MutationObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn().mockReturnValue([]),
}));

// Mock ResizeObserver which is used by CodeMirror
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver which may be used by CodeMirror
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

describe('packages/code-editor/CodeEditor', () => {
  beforeEach(() => {
    mockForceParsing.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders', () => {
    const { container } = renderCodeEditor({
      defaultValue: 'content',
    });
    expect(container).toHaveTextContent('content');
  });

  test('Updates value on when user types', async () => {
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

  test('Fold gutter renders when enabled', async () => {
    const { editor } = renderCodeEditor({ enableCodeFolding: true });
    expect(
      editor.getBySelector(CodeEditorSelectors.FoldGutter),
    ).toBeInTheDocument();
  });

  test('Fold gutter does not render when disabled', async () => {
    const { editor } = renderCodeEditor({ enableCodeFolding: false });

    expect(
      editor.queryBySelector(CodeEditorSelectors.FoldGutter),
    ).not.toBeInTheDocument();
  });

  test('Line numbers render when enabled', async () => {
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

  test('Line numbers do not render when disabled', async () => {
    const { editor } = renderCodeEditor({ enableLineNumbers: false });

    expect(
      editor.queryBySelector(CodeEditorSelectors.LineNumbers),
    ).not.toBeInTheDocument();
  });

  test('Clickable URLs render when enabled', async () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'https://mongodb.design',
      enableClickableUrls: true,
    });

    expect(
      editor.getBySelector(CodeEditorSelectors.HyperLink),
    ).toBeInTheDocument();
  });

  test('Clickable URLs do not render when disable', async () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'https://mongodb.design',
      enableClickableUrls: false,
    });

    expect(
      editor.queryBySelector(CodeEditorSelectors.HyperLink),
    ).not.toBeInTheDocument();
  });

  test('Read-only set on editor state when enabled', async () => {
    const { editor } = renderCodeEditor({ readOnly: true });
    expect(editor.isReadOnly()).toBe(true);
  });

  test('Read-only not set on editor state when disabled', async () => {
    const { editor } = renderCodeEditor({ readOnly: false });
    expect(editor.isReadOnly()).toBe(false);
  });

  test('Line wrapping enabled when enabled', async () => {
    const { editor } = renderCodeEditor({ enableLineWrapping: true });
    expect(editor.isLineWrappingEnabled()).toBe(true);
  });

  test('Line wrapping not enabled when disabled', async () => {
    const { editor } = renderCodeEditor({ enableLineWrapping: false });
    expect(editor.isLineWrappingEnabled()).toBe(false);
  });

  test('Editor displays placeholder when empty', async () => {
    const { editor } = renderCodeEditor({
      placeholder: 'Type your code here...',
    });
    expect(editor.getBySelector(CodeEditorSelectors.Content)).toHaveTextContent(
      'Type your code here...',
    );
  });

  test('Editor displays HTMLElement placeholder when empty', async () => {
    const placeholderElement = document.createElement('div');
    placeholderElement.textContent = 'Type your code here...';
    const { editor } = renderCodeEditor({ placeholder: placeholderElement });
    expect(editor.getBySelector(CodeEditorSelectors.Content)).toHaveTextContent(
      'Type your code here...',
    );
  });

  test('the forceParsing() method is called when enabled', async () => {
    renderCodeEditor({
      forceParsing: true,
      defaultValue: 'content',
    });
    await waitFor(() => {
      expect(mockForceParsing).toHaveBeenCalled();
    });
  });

  test('the forceParsing() method is not called when disabled', async () => {
    const { container } = renderCodeEditor({
      defaultValue: 'content',
    });
    // Wait for the editor to be fully rendered
    await waitFor(() => {
      expect(container).toHaveTextContent('content');
    });
    expect(mockForceParsing).not.toHaveBeenCalled();
  });

  test('correct indentUnit is set on the editor when indentUnit is "tab"', async () => {
    const { editor } = renderCodeEditor({
      indentUnit: 'tab',
    });
    expect(editor.getIndentUnit()).toBe('\t');
  });

  test('correct indentUnit is set on the editor when indentUnit is "space"', async () => {
    const { editor } = renderCodeEditor({
      indentUnit: 'space',
    });
    expect(editor.getIndentUnit()).toBe('  ');
  });
});
