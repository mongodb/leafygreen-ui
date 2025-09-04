import { LgIdString } from '@leafygreen-ui/lib';

import { CodeEditorSelectors } from '../CodeEditor/CodeEditor.types';
import { DEFAULT_LGID_ROOT, getLgIds } from '../utils';

import { TestUtilsReturnType } from './getTestUtils.types';

/**
 * CodeEditor Test Utilities
 *
 * These utilities help test CodeEditor and Panel components. They work by finding
 * elements using data-lgid attributes and provide methods to interact with the
 * editor's DOM structure.
 *
 * USAGE:
 *
 * Basic usage for testing CodeEditor:
 * ```typescript
 * const utils = getTestUtils('your-editor-lgid');
 *
 * // Wait for the editor to be fully initialized
 * await utils.waitForInitialization();
 *
 * // Get the actual content from CodeMirror
 * const content = await utils.getContent();
 *
 * // Check loading state
 * expect(utils.getIsLoading()).toBe(false);
 * ```
 */

// Helper functions for DOM queries
const getByLgId = (lgId: string): HTMLElement => {
  const element = document.querySelector(
    `[data-lgid="${lgId}"]`,
  ) as HTMLElement;

  if (!element) {
    throw new Error(`Element with data-lgid="${lgId}" not found`);
  }

  return element;
};

const queryByLgId = <T extends HTMLElement = HTMLElement>(
  lgId: string,
): T | null => {
  return document.querySelector(`[data-lgid="${lgId}"]`) as T | null;
};

export const getTestUtils = (
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element = getByLgId!(lgIds.root);

  /**
   * Waits for the CodeEditor to be fully initialized with CodeMirror instance
   */
  const waitForInitialization = async (timeout = 5000): Promise<void> => {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const containerElement = element as any;

      if (containerElement._cm) {
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 50));
    }

    throw new Error(`CodeEditor not initialized within ${timeout}ms`);
  };

  /**
   * Waits for any loading states to complete (both user and internal loading)
   */
  const waitForLoadingToComplete = async (timeout = 5000): Promise<void> => {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (!getIsLoading()) {
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 50));
    }

    throw new Error(`Loading did not complete within ${timeout}ms`);
  };

  /**
   * Gets the content that was passed to the CodeEditor component.
   * This reads the actual content from CodeMirror when available, falling back to props.
   */
  const getContent = async (): Promise<string | null> => {
    // First try to get content from actual CodeMirror instance if available
    const containerElement = element as any;

    if (containerElement._cm?.state?.sliceDoc) {
      return containerElement._cm.state.sliceDoc();
    }

    // If CodeMirror isn't ready yet, wait for it and try again
    try {
      await waitForInitialization();

      if (containerElement._cm?.state?.sliceDoc) {
        return containerElement._cm.state.sliceDoc();
      }
    } catch {
      // If initialization fails, fall back to other methods
    }

    // Try to get content from rendered CodeMirror content element
    const contentElement = element.querySelector(CodeEditorSelectors.Content);

    if (contentElement?.textContent) {
      return contentElement.textContent;
    }

    // In test environments or when CodeMirror isn't available,
    // read the content from component props/attributes
    const value = element.getAttribute('data-value');

    if (value) {
      return value;
    }

    const defaultValue = element.getAttribute('data-default-value');

    if (defaultValue) {
      return defaultValue;
    }

    return null;
  };

  /**
   * Gets the language that was passed to the CodeEditor component.
   * This reads the actual language prop passed to the component, making it useful
   * for testing what language was configured.
   */
  const getLanguage = (): string | null => {
    // First try to get language from CodeMirror classes (real browser environments)
    const editorElement = element.querySelector(CodeEditorSelectors.Editor);

    if (editorElement) {
      const classes = Array.from(editorElement.classList);
      const langClass = classes.find((cls: string) =>
        cls.startsWith('cm-lang-'),
      );

      if (langClass) {
        return langClass.replace('cm-lang-', '');
      }
    }

    // In test environments, read the language from component props/attributes
    const language = element.getAttribute('data-language');

    if (language) {
      return language;
    }

    return null;
  };

  /**
   * Checks if the editor is in a loading state
   */
  const getIsLoading = (): boolean => {
    return !!queryByLgId(lgIds.loader);
  };

  /**
   * Checks if the editor is in read-only mode
   */
  const getIsReadOnly = (): boolean => {
    const editorElement = element.querySelector(CodeEditorSelectors.Editor);
    return editorElement?.classList.contains('cm-readonly') || false;
  };

  /**
   * Checks if line numbers are enabled
   */
  const getHasLineNumbers = (): boolean => {
    return !!element.querySelector(CodeEditorSelectors.LineNumbers);
  };

  /**
   * Checks if line wrapping is enabled
   */
  const getHasLineWrapping = (): boolean => {
    return !!element.querySelector(CodeEditorSelectors.LineWrapping);
  };

  /**
   * Checks if code folding is enabled
   */
  const getHasCodeFolding = (): boolean => {
    return !!element.querySelector(CodeEditorSelectors.FoldGutter);
  };

  /**
   * Gets all visible line numbers
   */
  const getAllLineNumbers = (): Array<HTMLElement> => {
    const lineNumberElements = element.querySelectorAll<HTMLElement>(
      CodeEditorSelectors.GutterElement,
    );
    return Array.from(lineNumberElements);
  };

  /**
   * Gets a specific line number element by its number
   */
  const getLineNumberByIndex = (lineNumber: number): HTMLElement | null => {
    const lineNumbers = getAllLineNumbers();
    // Line numbers are 1-based, but array is 0-based
    return lineNumbers[lineNumber - 1] || null;
  };

  /**
   * Gets the copy button element (when not using panel)
   */
  const getCopyButton = (): HTMLElement | null => {
    return queryByLgId(lgIds.copyButton);
  };

  /**
   * Checks if a panel is present
   */
  const queryPanel = () => {
    return queryByLgId<HTMLElement>(lgIds.panel);
  };

  /**
   * Gets panel-specific test utilities if panel is present
   */
  const getPanelUtils = () => {
    const panel = queryPanel();
    if (!panel) return null;

    const getPanelTitle = (): string | null => {
      const titleElement = queryByLgId<HTMLElement>(lgIds.panelTitle);
      return titleElement?.textContent || null;
    };

    const getFormatButton = (): HTMLElement | null => {
      return queryByLgId(lgIds.panelFormatButton);
    };

    const getPanelCopyButton = (): HTMLElement | null => {
      return queryByLgId(lgIds.panelCopyButton);
    };

    const getSecondaryMenuButton = (): HTMLElement | null => {
      return queryByLgId(lgIds.panelSecondaryMenuButton);
    };

    const getSecondaryMenu = () => {
      return queryByLgId<HTMLElement>(lgIds.panelSecondaryMenu);
    };

    const isSecondaryMenuOpen = (): boolean => {
      const menu = getSecondaryMenu();
      if (!menu) return false;

      // Check if menu is visible (not hidden)
      const style = window.getComputedStyle(menu);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0'
      );
    };

    return {
      getPanel: () => panel,
      getPanelTitle,
      getFormatButton,
      getPanelCopyButton,
      getSecondaryMenuButton,
      getSecondaryMenu,
      isSecondaryMenuOpen,
    };
  };

  /**
   * Gets all tooltip elements currently visible in the editor
   */
  const getTooltips = (): Array<HTMLElement> => {
    const tooltips = element.querySelectorAll<HTMLElement>(
      CodeEditorSelectors.Tooltip,
    );
    return Array.from(tooltips);
  };

  /**
   * Checks if any tooltips are currently visible
   */
  const getHasTooltips = (): boolean => {
    return getTooltips().length > 0;
  };

  /**
   * Gets all hyperlink elements if clickable URLs are enabled
   */
  const getHyperlinks = (): Array<HTMLElement> => {
    const hyperlinks = element.querySelectorAll<HTMLElement>(
      CodeEditorSelectors.HyperLink,
    );
    return Array.from(hyperlinks);
  };

  /**
   * Checks if hyperlinks/clickable URLs are enabled
   */
  const getHasHyperlinks = (): boolean => {
    return getHyperlinks().length > 0;
  };

  return {
    getEditor: () => element,
    waitForInitialization,
    waitForLoadingToComplete,
    getContent,
    getLanguage,
    getIsLoading,
    getIsReadOnly,
    getHasLineNumbers,
    getHasLineWrapping,
    getHasCodeFolding,
    getAllLineNumbers,
    getLineNumberByIndex,
    getCopyButton,
    queryPanel,
    getPanelUtils,
    getTooltips,
    getHasTooltips,
    getHyperlinks,
    getHasHyperlinks,
  };
};
