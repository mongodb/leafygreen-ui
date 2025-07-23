import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { GetTestUtilsReturnType } from './getTestUtils.types';
import { DEFAULT_LGID_ROOT, getLgIds } from './utils';

/**
 * Returns test utilities for querying and interacting with a PreviewCard component
 */
export const getTestUtils = <T extends HTMLDivElement = HTMLDivElement>(
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): GetTestUtilsReturnType<T> => {
  const lgIds = getLgIds(lgId);

  const findPreviewCard = () => findByLgId!<T>(lgIds.root);
  const getPreviewCard = () => getByLgId!<T>(lgIds.root);
  const queryPreviewCard = () => queryByLgId!<T>(lgIds.root);

  const getContent = () => getByLgId!<HTMLDivElement>(lgIds.content);

  const getToggle = () => getByLgId!<HTMLButtonElement>(lgIds.toggle);

  const isExpanded = () => {
    const toggle = getToggle();
    return toggle.getAttribute('aria-expanded') === 'true';
  };

  return {
    findPreviewCard,
    getContent,
    getPreviewCard,
    getToggle,
    isExpanded,
    queryPreviewCard,
  };
};
