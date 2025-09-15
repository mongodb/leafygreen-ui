import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { DEFAULT_LGID_ROOT, getLgIds } from '../utils';

import { GetTestUtilsReturnType } from './getTestUtils.types';

/**
 * Returns a set of utility functions to query and get parts of a code editor component for testing.
 * @param lgId - The base LeafyGreen ID prefix for the code editor. Defaults to `DEFAULT_LGID_ROOT`.
 */
export const getTestUtils = <T extends HTMLElement = HTMLElement>(
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): GetTestUtilsReturnType<T> => {
  const lgIds = getLgIds(lgId);

  /** Editor element utils */
  const getEditor = () => getByLgId!<T>(lgIds.root);
  const findEditor = () => findByLgId!<T>(lgIds.root);
  const queryEditor = () => queryByLgId!<T>(lgIds.root);

  /** Content element utils */
  const getContentContainer = () => getByLgId!<T>(lgIds.content);
  const findContentContainer = () => findByLgId!<T>(lgIds.content);
  const queryContentContainer = () => queryByLgId!<T>(lgIds.content);

  /** Copy button utils */
  const getCopyButton = () => getByLgId!<T>(lgIds.copyButton);
  const findCopyButton = () => findByLgId!<T>(lgIds.copyButton);
  const queryCopyButton = () => queryByLgId!<T>(lgIds.copyButton);

  /**
   * Gets panel-specific test utilities if panel is present
   */
  const getPanelUtils = () => {
    /** Copy button utils */
    const getPanelElement = () => getByLgId!<T>(lgIds.panel);
    const findPanelElement = () => findByLgId!<T>(lgIds.panel);
    const queryPanelElement = () => queryByLgId!<T>(lgIds.panel);

    /** Format button utils */
    const getFormatButton = () => getByLgId!<T>(lgIds.panelFormatButton);
    const findFormatButton = () => findByLgId!<T>(lgIds.panelFormatButton);
    const queryFormatButton = () => queryByLgId!<T>(lgIds.panelFormatButton);

    /** Panel copy button utils */
    const getPanelCopyButton = () => getByLgId!<T>(lgIds.panelCopyButton);
    const findPanelCopyButton = () => findByLgId!<T>(lgIds.panelCopyButton);
    const queryPanelCopyButton = () => queryByLgId!<T>(lgIds.panelCopyButton);

    /** Secondary menu button utils */
    const getSecondaryMenuButton = () =>
      getByLgId!<T>(lgIds.panelSecondaryMenuButton);
    const findSecondaryMenuButton = () =>
      findByLgId!<T>(lgIds.panelSecondaryMenuButton);
    const querySecondaryMenuButton = () =>
      queryByLgId!<T>(lgIds.panelSecondaryMenuButton);

    /** Secondary menu utils */
    const getSecondaryMenu = () => getByLgId!<T>(lgIds.panelSecondaryMenu);
    const findSecondaryMenu = () => findByLgId!<T>(lgIds.panelSecondaryMenu);
    const querySecondaryMenu = () => queryByLgId!<T>(lgIds.panelSecondaryMenu);

    return {
      getPanelElement,
      findPanelElement,
      queryPanelElement,
      getFormatButton,
      findFormatButton,
      queryFormatButton,
      getPanelCopyButton,
      findPanelCopyButton,
      queryPanelCopyButton,
      getSecondaryMenuButton,
      findSecondaryMenuButton,
      querySecondaryMenuButton,
      getSecondaryMenu,
      findSecondaryMenu,
      querySecondaryMenu,
    };
  };

  /**
   * Waits for any loading states to complete (both user and internal loading)
   */
  const waitForLoadingToComplete = async (timeout = 5000): Promise<void> => {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (!isLoading()) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    throw new Error(`Loading did not complete within ${timeout}ms`);
  };

  /**
   * Checks if the editor is in a loading state
   */
  const isLoading = (): boolean => !!queryByLgId!<T>(lgIds.loader);

  return {
    getEditor,
    findEditor,
    queryEditor,
    getContentContainer,
    findContentContainer,
    queryContentContainer,
    getCopyButton,
    findCopyButton,
    queryCopyButton,
    getPanelUtils,
    waitForLoadingToComplete,
    isLoading,
  };
};
