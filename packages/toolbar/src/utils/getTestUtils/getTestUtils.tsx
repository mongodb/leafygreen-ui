import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';
import { DEFAULT_LGID_ROOT, getLgIds } from '../getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  /**
   * Returns a promise that resolves to the element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findToolbar = () => findByLgId!<HTMLButtonElement>(lgIds.root);

  /**
   * Returns the element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getToolbar = () => getByLgId!<HTMLButtonElement>(lgIds.root);

  /**
   * Returns the element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryToolbar = () => queryByLgId!<HTMLButtonElement>(lgIds.root);

  /**
   * Returns an array of all ToolbarIconButtons
   */
  const getAllToolbarIconButtons = () => {
    const element = getToolbar();

    return Array.from(
      element.querySelectorAll<HTMLButtonElement>(
        `[data-lgid=${lgIds.iconButton}]`,
      ),
    );
  };

  /**
   * Returns the ToolbarIconButton based on the label
   */
  const getToolbarIconButtonByLabel = (label: string) => {
    if (!label) throw new Error('label cannot be empty');

    const iconButton = getAllToolbarIconButtons().find(
      iconButton => iconButton.getAttribute('aria-label') === label,
    );

    if (!iconButton) return null;

    return {
      getElement: () => iconButton,
      isActive: () => iconButton?.getAttribute('data-active') === 'true',
      isDisabled: () => iconButton?.getAttribute('aria-disabled') === 'true',
    };
  };

  /**
   * Returns the first active ToolbarIconButton
   */
  const getActiveToolbarIconButton = () => {
    const iconButton = getAllToolbarIconButtons().find(
      iconButton => iconButton.getAttribute('data-active') === 'true',
    );
    return iconButton;
  };

  return {
    findToolbar,
    getToolbar,
    queryToolbar,
    getAllToolbarIconButtons: () => getAllToolbarIconButtons(),
    getToolbarIconButtonByLabel: (id: string) =>
      getToolbarIconButtonByLabel(id),
    getActiveToolbarIconButton: () => getActiveToolbarIconButton(),
  };
};
