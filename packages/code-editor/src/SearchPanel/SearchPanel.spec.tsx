import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderCodeEditor } from '../CodeEditor/CodeEditor.testUtils';
import { CodeEditorSelectors } from '../CodeEditor/CodeEditor.types';

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

// Mock elementFromPoint which is used by CodeMirror for mouse position handling
if (!document.elementFromPoint) {
  document.elementFromPoint = jest.fn((x: number, y: number) => {
    return document.body;
  });
}

// Mock createRange for CodeMirror
if (!global.document.createRange) {
  global.document.createRange = jest.fn().mockReturnValue({
    setStart: jest.fn(),
    setEnd: jest.fn(),
    collapse: jest.fn(),
    selectNodeContents: jest.fn(),
    insertNode: jest.fn(),
    surroundContents: jest.fn(),
    cloneRange: jest.fn(),
    detach: jest.fn(),
    getClientRects: jest.fn().mockReturnValue([]),
    getBoundingClientRect: jest.fn().mockReturnValue({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
    }),
  });
}

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

async function renderEditorAndOpenSearchPanel(defaultValue: string) {
  const { editor, container } = renderCodeEditor({
    defaultValue,
  });

  // Focus the editor
  const contentElement = editor.getBySelector(CodeEditorSelectors.Content);
  await userEvent.click(contentElement);

  // Wait for editor to be focused
  await waitFor(() => {
    expect(container.querySelector('.cm-focused')).toBeInTheDocument();
  });

  // Press Ctrl+F to open search
  await userEvent.keyboard('{Control>}f{/Control}');

  // Wait for search panel to appear
  await waitFor(() => {
    expect(
      container.querySelector('input[placeholder="Find"]'),
    ).toBeInTheDocument();
  });

  return { editor, container };
}

describe('packages/code-editor/SearchPanel', () => {
  test('Pressing CMD+F pulls up the search panel', async () => {
    await renderEditorAndOpenSearchPanel('console.log("hello");');
  });

  test('Pressing ESC closes the search panel', async () => {
    const { container } = await renderEditorAndOpenSearchPanel(
      'console.log("hello");',
    );

    // Get the search input and focus it
    const searchInput = container.querySelector(
      'input[placeholder="Find"]',
    ) as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();

    // Press ESC to close
    await userEvent.click(searchInput);
    await userEvent.keyboard('{Escape}');

    // Verify search panel is closed
    await waitFor(() => {
      expect(
        container.querySelector(CodeEditorSelectors.SearchPanel),
      ).not.toBeInTheDocument();
    });
  });

  test('Clicking the close button closes the search panel', async () => {
    const { container } = await renderEditorAndOpenSearchPanel(
      'console.log("hello");',
    );

    // Find and click the close button (X icon button)
    const closeButton = container.querySelector(
      'button[aria-label="close find menu button"]',
    ) as HTMLButtonElement;
    expect(closeButton).toBeInTheDocument();

    await userEvent.click(closeButton);

    // Verify search panel is closed
    await waitFor(() => {
      expect(
        container.querySelector(CodeEditorSelectors.SearchPanel),
      ).not.toBeInTheDocument();
    });
  });

  test('Clicking The ChevronDown expands the panel to show the replace panel', async () => {
    const { container } = await renderEditorAndOpenSearchPanel(
      'console.log("hello");',
    );

    // Initially, replace section should be hidden (aria-hidden)
    const replaceSection = container.querySelector('[aria-hidden="true"]');
    expect(replaceSection).toBeInTheDocument();

    // Click the toggle button (ChevronDown)
    const toggleButton = container.querySelector(
      'button[aria-label="Toggle button"]',
    ) as HTMLButtonElement;
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');

    await userEvent.click(toggleButton);

    // Verify the toggle button is expanded
    await waitFor(() => {
      expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
    });

    // Verify replace input is now accessible
    const replaceInput = container.querySelector(
      'input[placeholder="Replace"]',
    ) as HTMLInputElement;
    expect(replaceInput).toBeInTheDocument();
  });

  test('Pressing Enter after typing in the search input focuses the next match', async () => {
    const { container } = await renderEditorAndOpenSearchPanel(
      'hello\nhello\nhello',
    );

    // Type in the search input
    const searchInput = container.querySelector(
      'input[placeholder="Find"]',
    ) as HTMLInputElement;
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'hello');

    // Wait for matches to be found
    await waitFor(() => {
      expect(searchInput.value).toBe('hello');
      expect(container.textContent).toContain('/3');
    });

    // Press Enter to go to next match
    await userEvent.keyboard('{Enter}');

    // Verify that the selection moved (check for match count update and selected text)
    await waitFor(() => {
      // After pressing Enter, should move to first match
      expect(container.textContent).toContain('1/3');

      const selectedMatch = container.querySelector('.cm-searchMatch-selected');
      expect(selectedMatch).toBeInTheDocument();
      expect(selectedMatch?.innerHTML).toBe('hello');
    });
  });

  test('Clicking the arrow down button focuses the next match', async () => {
    const { container } = await renderEditorAndOpenSearchPanel(
      'test\ntest\ntest',
    );

    // Type in the search input
    const searchInput = container.querySelector(
      'input[placeholder="Find"]',
    ) as HTMLInputElement;
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'test');

    // Wait for matches to be found
    await waitFor(() => {
      expect(searchInput.value).toBe('test');
      expect(container.textContent).toContain('/3');
    });

    // Click the arrow down button
    const arrowDownButton = container.querySelector(
      'button[aria-label="next item button"]',
    ) as HTMLButtonElement;
    expect(arrowDownButton).toBeInTheDocument();

    await userEvent.click(arrowDownButton);

    // Verify that the selection moved to the first match
    await waitFor(() => {
      expect(container.textContent).toContain('1/3');
      const selectedMatch = container.querySelector('.cm-searchMatch-selected');
      expect(selectedMatch).toBeInTheDocument();
      expect(selectedMatch?.innerHTML).toBe('test');
    });
  });

  test('Pressing Shift+Enter after typing in the search input focuses the previous match', async () => {
    const { container } = await renderEditorAndOpenSearchPanel(
      'hello\nhello\nhello',
    );

    // Type in the search input
    const searchInput = container.querySelector(
      'input[placeholder="Find"]',
    ) as HTMLInputElement;
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'hello');

    // Wait for matches to be found
    await waitFor(() => {
      expect(searchInput.value).toBe('hello');
      expect(container.textContent).toContain('/3');
    });

    // Press Enter to go to first match
    await userEvent.keyboard('{Enter}');

    await waitFor(() => {
      expect(container.textContent).toContain('1/3');
    });

    // Press Shift+Enter to go to previous match (should wrap to last)
    await userEvent.keyboard('{Shift>}{Enter}{/Shift}');

    // Verify that the selection moved backwards
    await waitFor(() => {
      // Should wrap to last match (3)
      expect(container.textContent).toContain('3/3');
    });
  });

  test('Clicking the arrow up button focuses the previous match', async () => {
    const { container } = await renderEditorAndOpenSearchPanel(
      'test\ntest\ntest',
    );

    // Type in the search input
    const searchInput = container.querySelector(
      'input[placeholder="Find"]',
    ) as HTMLInputElement;
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'test');

    // Wait for matches
    await waitFor(() => {
      expect(searchInput.value).toBe('test');
      expect(container.textContent).toContain('/3');
    });

    // Click the arrow up button (should wrap to last match)
    const arrowUpButton = container.querySelector(
      'button[aria-label="previous item button"]',
    ) as HTMLButtonElement;
    expect(arrowUpButton).toBeInTheDocument();

    await userEvent.click(arrowUpButton);

    // Verify that the selection moved (should wrap to last match)
    await waitFor(() => {
      expect(container.textContent).toContain('3/3');
    });
  });

  test('Clicking the replace button replaces the next match', async () => {
    const { editor, container } = await renderEditorAndOpenSearchPanel(
      'hello world\nhello again',
    );

    // Expand to show replace panel
    const toggleButton = container.querySelector(
      'button[aria-label="Toggle button"]',
    ) as HTMLButtonElement;
    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
    });

    // Type search term
    const searchInput = container.querySelector(
      'input[placeholder="Find"]',
    ) as HTMLInputElement;
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'hello');

    // Wait for matches
    await waitFor(() => {
      expect(container.textContent).toContain('/2');
    });

    // Type replace term
    const replaceInput = container.querySelector(
      'input[placeholder="Replace"]',
    ) as HTMLInputElement;
    await userEvent.click(replaceInput);
    await userEvent.type(replaceInput, 'goodbye');

    // Find first match
    const arrowDownButton = container.querySelector(
      'button[aria-label="next item button"]',
    ) as HTMLButtonElement;
    await userEvent.click(arrowDownButton);

    await waitFor(() => {
      expect(container.textContent).toContain('1/2');
    });

    // Click replace button
    const replaceButton = container.querySelector(
      'button[aria-label="replace button"]',
    ) as HTMLButtonElement;
    expect(replaceButton).toBeInTheDocument();

    await userEvent.click(replaceButton);

    // Verify that one match was replaced
    await waitFor(() => {
      const content = editor.getContent();
      expect(content).toContain('goodbye world');
      expect(content).toContain('hello again');
      // Should now only have 1 match left
      expect(container.textContent).toContain('/1');
    });
  });

  test('Clicking the replace all button replaces all matches', async () => {
    const { editor, container } = await renderEditorAndOpenSearchPanel(
      'hello world\nhello again\nhello there',
    );

    // Expand to show replace panel
    const toggleButton = container.querySelector(
      'button[aria-label="Toggle button"]',
    ) as HTMLButtonElement;
    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
    });

    // Type search term
    const searchInput = container.querySelector(
      'input[placeholder="Find"]',
    ) as HTMLInputElement;
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'hello');

    // Wait for matches
    await waitFor(() => {
      expect(container.textContent).toContain('/3');
    });

    // Type replace term
    const replaceInput = container.querySelector(
      'input[placeholder="Replace"]',
    ) as HTMLInputElement;
    await userEvent.click(replaceInput);
    await userEvent.type(replaceInput, 'goodbye');

    // Click replace all button
    const replaceAllButton = container.querySelector(
      'button[aria-label="replace all button"]',
    ) as HTMLButtonElement;
    expect(replaceAllButton).toBeInTheDocument();

    await userEvent.click(replaceAllButton);

    // Verify that all matches were replaced
    await waitFor(() => {
      const content = editor.getContent();
      expect(content).toBe('goodbye world\ngoodbye again\ngoodbye there');
      expect(content).not.toContain('hello');
      // Should now have 0 matches
      expect(container.textContent).toContain('/0');
    });
  });

  test('Clicking the filter button opens the filter menu', async () => {
    const { container } = await renderEditorAndOpenSearchPanel('test content');

    // Find and click the filter button
    const filterButton = container.querySelector(
      'button[aria-label="filter button"]',
    ) as HTMLButtonElement;
    expect(filterButton).toBeInTheDocument();

    await userEvent.click(filterButton);

    // Verify that the filter menu appears
    await waitFor(() => {
      // Check for menu items (Match case, Regexp, By word)
      expect(container.textContent).toContain('Match case');
      expect(container.textContent).toContain('Regexp');
      expect(container.textContent).toContain('By word');
    });
  });
});
