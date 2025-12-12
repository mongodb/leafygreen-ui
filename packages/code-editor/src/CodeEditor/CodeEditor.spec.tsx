import React from 'react';
import { EditorState } from '@codemirror/state';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getTestUtils } from '../testing';

import { CodeEditor } from './CodeEditor';
import { renderCodeEditor } from './CodeEditor.testUtils';
import { CodeEditorSelectors, CopyButtonAppearance } from './CodeEditor.types';
import { LanguageName } from './hooks';

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

// Mock getClientRects on Range prototype for CodeMirror search
if (typeof Range !== 'undefined' && !Range.prototype.getClientRects) {
  Range.prototype.getClientRects = jest.fn().mockReturnValue([]);
  Range.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });
}

// Mock elementFromPoint which is used by CodeMirror for mouse position handling
if (!document.elementFromPoint) {
  document.elementFromPoint = jest.fn(() => {
    return document.body;
  });
}

describe('packages/code-editor/CodeEditor', () => {
  beforeAll(() => {
    // Mock HTMLDialogElement.show and HTMLDialogElement.close since they're not implemented in JSDOM
    HTMLDialogElement.prototype.show = jest.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = jest.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = false;
    });
  });

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

  test('Line numbers do not render when disabled', () => {
    const { editor } = renderCodeEditor({ enableLineNumbers: false });
    expect(
      editor.queryBySelector(CodeEditorSelectors.LineNumbers),
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
      forceParsing: false,
      defaultValue: 'content',
    });
    // Wait for the editor to be fully rendered
    await waitFor(() => {
      expect(container).toHaveTextContent('content');
    });
    expect(mockForceParsing).not.toHaveBeenCalled();
  });

  test('correct indentUnit is set on the editor when indentUnit is "tab"', () => {
    const { editor } = renderCodeEditor({
      indentUnit: 'tab',
    });
    expect(editor.getIndentUnit()).toBe('\t');
  });

  test('correct indentUnit is set on the editor when indentUnit is "space"', () => {
    const { editor } = renderCodeEditor({
      indentUnit: 'space',
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

  test('applies custom extensions to the editor', () => {
    const { editor } = renderCodeEditor({
      extensions: [EditorState.readOnly.of(true)],
    });
    expect(editor.isReadOnly()).toBe(true);
  });

  test('custom extensions have precedence over built-in functionality', () => {
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
  )('adds language support for %p', language => {
    const { container } = renderCodeEditor({ language });
    expect(
      container.querySelector(`[data-language="${language}"]`),
    ).toBeInTheDocument();
  });

  test('adds language support for tsx', () => {
    const { container } = renderCodeEditor({ language: LanguageName.tsx });
    expect(
      container.querySelector(`[data-language="typescript"]`),
    ).toBeInTheDocument();
  });

  test('adds language support for jsx', () => {
    const { container } = renderCodeEditor({ language: LanguageName.jsx });
    expect(
      container.querySelector(`[data-language="javascript"]`),
    ).toBeInTheDocument();
  });

  test('renders copy button when copyButtonAppearance is "hover"', () => {
    const lgId = 'lg-test-copy-hover';
    renderCodeEditor({
      copyButtonAppearance: CopyButtonAppearance.Hover,
      'data-lgid': lgId,
    });
    const utils = getTestUtils(lgId);
    expect(utils.getCopyButton()).toBeInTheDocument();
  });

  test('renders copy button when copyButtonAppearance is "persist"', () => {
    const lgId = 'lg-test-copy-persist';
    renderCodeEditor({
      copyButtonAppearance: CopyButtonAppearance.Persist,
      'data-lgid': lgId,
    });
    const utils = getTestUtils(lgId);
    expect(utils.getCopyButton()).toBeInTheDocument();
  });

  test('does not render copy button when copyButtonAppearance is "none"', () => {
    const { container } = renderCodeEditor({
      copyButtonAppearance: CopyButtonAppearance.None,
    });
    expect(
      container.querySelector(CodeEditorSelectors.CopyButton),
    ).not.toBeInTheDocument();
  });

  test('renders panel when panel is passed as a child', () => {
    const lgId = 'lg-test-editor';
    renderCodeEditor({
      'data-lgid': lgId,
      children: <CodeEditor.Panel title="Test Panel" />,
    });
    const utils = getTestUtils(lgId).getPanelUtils();
    const panelElement = utils.getPanelElement();
    expect(panelElement).toBeInTheDocument();
  });

  test('does not render context menu when right-clicking on panel', () => {
    const lgId = 'lg-test-editor';
    renderCodeEditor({
      'data-lgid': lgId,
      children: <CodeEditor.Panel title="Test Panel" />,
    });
    const utils = getTestUtils(lgId).getPanelUtils();
    const panelElement = utils.getPanelElement();
    expect(panelElement).toBeInTheDocument();
    userEvent.click(panelElement!, { button: 2 });
    expect(utils.querySecondaryMenu()).not.toBeInTheDocument();
  });

  test('Pressing ESC key unfocuses the editor', async () => {
    const { editor, container } = renderCodeEditor({
      defaultValue: 'console.log("test");',
    });

    // Focus the editor
    const view = editor.getHandle()?.getEditorViewInstance();
    view?.focus();

    // Verify the editor is focused
    await waitFor(() => {
      expect(
        container.querySelector(CodeEditorSelectors.Focused),
      ).toBeInTheDocument();
    });

    // Press the ESC key
    userEvent.keyboard('{Escape}');

    // Verify the editor is no longer focused
    await waitFor(() => {
      expect(
        container.querySelector(CodeEditorSelectors.Focused),
      ).not.toBeInTheDocument();
    });
  });

  test('Pressing TAB enters correct tab', async () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'console.log("test");',
      indentUnit: 'tab',
    });

    // Focus the editor
    const view = editor.getHandle()?.getEditorViewInstance();
    view?.focus();

    // Position cursor at the beginning of the line
    userEvent.keyboard('{Home}');

    // Get initial content
    const initialContent = editor.getContent();

    // Press TAB
    userEvent.keyboard('{Tab}');

    // Verify that indentation was inserted
    await waitFor(() => {
      const newContent = editor.getContent();
      // Should insert a tab character at the beginning
      expect(newContent).toBe('\tconsole.log("test");');
      expect(newContent).not.toBe(initialContent);
      expect(newContent.length).toBeGreaterThan(initialContent.length);
    });
  });

  test('Pressing SHIFT+TAB lessens line indentation', async () => {
    const { editor } = renderCodeEditor({
      defaultValue: '\tconsole.log("test");', // Start with indented content
      indentUnit: 'tab',
    });

    // Focus the editor
    const view = editor.getHandle()?.getEditorViewInstance();
    view?.focus();

    // Position cursor at the beginning of the line
    userEvent.keyboard('{Home}');

    // Get initial content (should have tab indentation)
    const initialContent = editor.getContent();
    expect(initialContent).toBe('\tconsole.log("test");');

    // Press SHIFT+TAB to reduce indentation
    userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    // Verify that indentation was reduced
    await waitFor(() => {
      const newContent = editor.getContent();
      // Should remove the tab indentation
      expect(newContent).toBe('console.log("test");');
      expect(newContent).not.toBe(initialContent);
      expect(newContent.length).toBeLessThan(initialContent.length);
    });
  });
});
