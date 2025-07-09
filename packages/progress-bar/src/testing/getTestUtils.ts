import { getByLgId, queryByLgId } from '@lg-tools/test-harnesses';
import { within } from '@testing-library/react';

import { type GetTestUtilsReturnType } from './getTestUtils.types';

export const DEFAULT_LGID_ROOT = 'lg-progress_bar';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  return {
    root,
    track: `${root}-track`,
    fill: `${root}-fill`,
    icon: `${root}-icon`,
    label: `${root}-label`,
    description: `${root}-description`,
    valueText: `${root}-value_text`,
  } as const;
};

export const getTestUtils = <T extends HTMLDivElement = HTMLDivElement>(
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): GetTestUtilsReturnType<T> => {
  const lgIds = getLgIds(lgId);

  const getContainer = () => getByLgId!<T>(lgIds.root);

  const getBar = () => {
    const container = getContainer();
    return (within(container).queryByRole('progressbar') ??
      within(container).queryByRole('meter')) as T;
  };

  const getBarFill = () => getByLgId!<T>(lgIds.fill);
  const getBarTrack = () => getByLgId!<T>(lgIds.track);

  const queryIcon = () => queryByLgId!<T>(lgIds.icon);
  const queryLabel = () => queryByLgId!<T>(lgIds.label);
  const queryDescription = () => queryByLgId!<T>(lgIds.description);
  const queryValueText = () => queryByLgId!<T>(lgIds.valueText);

  return {
    getContainer,

    getBar,
    getBarFill,
    getBarTrack,

    queryIcon,
    queryLabel,
    queryDescription,
    queryValueText,
  };
};
