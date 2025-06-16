import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { GetTestUtilsReturnType } from './getTestUtils.types';
import { DEFAULT_LGID_ROOT, getLgIds } from './utils';

/**
 * Returns test utilities for querying and interacting with an ExpandableCard component
 */
export const getTestUtils = <T extends HTMLDivElement = HTMLDivElement>(
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): GetTestUtilsReturnType<T> => {
  const lgIds = getLgIds(lgId);

  const findExpandableCard = () => findByLgId!<T>(lgIds.root);
  const getExpandableCard = () => getByLgId!<T>(lgIds.root);
  const queryExpandableCard = () => queryByLgId!<T>(lgIds.root);

  const getToggle = () => getByLgId!<HTMLDivElement>(lgIds.toggle);

  const isExpanded = () => {
    const toggle = getToggle();
    return toggle.getAttribute('aria-expanded') === 'true';
  };

  return {
    findExpandableCard,
    getExpandableCard,
    getToggle,
    isExpanded,
    queryExpandableCard,
  };
};
