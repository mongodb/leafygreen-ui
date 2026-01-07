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
  const findToggle = () => findByLgId!<HTMLDivElement>(lgIds.toggle);
  const queryToggle = () => queryByLgId!<HTMLDivElement>(lgIds.toggle);

  const isExpanded = () => {
    const toggle = getToggle();
    return toggle.getAttribute('aria-expanded') === 'true';
  };

  const getTitle = () => getByLgId!<HTMLHeadingElement>(lgIds.title);
  const queryTitle = () => queryByLgId!<HTMLHeadingElement>(lgIds.title);
  const findTitle = () => findByLgId!<HTMLHeadingElement>(lgIds.title);

  const getDescription = () => getByLgId!<HTMLDivElement>(lgIds.description);
  const queryDescription = () =>
    queryByLgId!<HTMLDivElement>(lgIds.description);
  const findDescription = () => findByLgId!<HTMLDivElement>(lgIds.description);

  const getFlagText = () => getByLgId!<HTMLSpanElement>(lgIds.flagText);
  const queryFlagText = () => queryByLgId!<HTMLSpanElement>(lgIds.flagText);
  const findFlagText = () => findByLgId!<HTMLSpanElement>(lgIds.flagText);

  return {
    findExpandableCard,
    getExpandableCard,
    getToggle,
    findToggle,
    queryToggle,
    isExpanded,
    queryExpandableCard,
    getTitle,
    findTitle,
    queryTitle,
    getDescription,
    findDescription,
    queryDescription,
    getFlagText,
    findFlagText,
    queryFlagText,
  };
};
