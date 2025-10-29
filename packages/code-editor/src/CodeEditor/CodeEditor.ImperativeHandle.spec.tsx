import { renderCodeEditor } from './CodeEditor.testUtils';
import { LanguageName } from './hooks';

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

describe('packages/code-editor/CodeEditor imperative handle', () => {
  test('getContents works', () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'test',
    });
    expect(editor.getHandle().getContents()).toBe('test');
  });

  test('getEditorViewInstance works', () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'console.log("hello")',
    });
    expect(editor.getHandle().getEditorViewInstance()).toBeDefined();
  });

  test('undo and redo works', async () => {
    const initialContent = 'console.log("hello");';
    const { editor } = renderCodeEditor({
      defaultValue: initialContent,
    });
    const handle = editor.getHandle();
    expect(handle.getContents()).toBe(initialContent);

    // Make a change
    editor.interactions.insertText('\nconsole.log("world");');
    const content = handle.getContents();
    expect(handle.getContents()).toBe(
      'console.log("hello");\nconsole.log("world");',
    );

    // Undo the change
    const undoResult = handle.undo();
    expect(undoResult).toBe(true);
    expect(handle.getContents()).toBe(initialContent);

    // Redo the change
    const redoResult = editor.interactions.redo();
    expect(redoResult).toBe(true);
    expect(handle.getContents()).toBe(content);
  });

  test('undo returns false when there is nothing to undo', async () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'test',
    });
    const undoResult = editor.getHandle().undo();
    expect(undoResult).toBe(false);
  });

  test('redo returns false when there is nothing to redo', async () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'test',
    });
    const redoResult = editor.getHandle().redo();
    expect(redoResult).toBe(false);
  });

  test('formatCode works', async () => {
    const { editor } = renderCodeEditor({
      language: LanguageName.javascript,
      defaultValue: "console.log('hello')",
    });
    const handle = editor.getHandle();
    await handle.formatCode();
    expect(handle.getContents()).toBe("console.log('hello');\n");
  });

  test('isFormattingAvailable returns true when formatting is available', () => {
    const { editor } = renderCodeEditor({
      language: LanguageName.javascript,
      defaultValue: "console.log('hello')",
    });
    const handle = editor.getHandle();
    expect(handle.isFormattingAvailable).toBe(true);
  });

  test('isFormattingAvailable returns false when formatting is not available', () => {
    const { editor } = renderCodeEditor({
      defaultValue: 'plain text',
    });
    const handle = editor.getHandle();
    expect(handle.isFormattingAvailable).toBe(false);
  });
});
