import userEvent from '@testing-library/user-event';

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
 * await utils.waitForLoadingToComplete();
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
   * Gets the content element from the editor
   */
  const getContentElement = (): HTMLElement | null => {
    return element.querySelector(CodeEditorSelectors.Content) || null;
  };

  /**
   * Gets the content that is rendered in the editor
   */
  const getContent = async (): Promise<string | null> => {
    await waitForLoadingToComplete();
    const contentElement = getContentElement();
    return contentElement?.textContent || null;
  };

  /**
   * Types the text into the editor
   */
  const typeContent = async (text: string): Promise<void> => {
    const contentElement = getContentElement();

    if (!contentElement) {
      throw new Error('Editor element not found');
    }

    await userEvent.click(contentElement);
    await userEvent.type(contentElement, text);
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
    const contentElement = getContentElement();
    return contentElement?.hasAttribute('aria-readonly') || false;
  };

  /**
   * Gets the copy button element (when not using panel)
   */
  const getCopyButton = (): HTMLElement | null => {
    return queryByLgId(lgIds.copyButton);
  };

  /**
   * Gets panel-specific test utilities if panel is present
   */
  const getPanelUtils = () => {
    const getPanelElement = (): HTMLElement | null => {
      return queryByLgId<HTMLElement>(lgIds.panel) || null;
    };

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

    const getSecondaryMenu = (): HTMLElement | null => {
      return queryByLgId<HTMLElement>(lgIds.panelSecondaryMenu);
    };

    return {
      getPanelElement,
      getPanelTitle,
      getFormatButton,
      getPanelCopyButton,
      getSecondaryMenuButton,
      getSecondaryMenu,
    };
  };

  return {
    getEditor: () => element,
    waitForLoadingToComplete,
    getContent,
    getContentElement,
    typeContent,
    getIsLoading,
    getIsReadOnly,
    getCopyButton,
    getPanelUtils,
  };
};
