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

  const queryLoader = () =>
    within(getContainer()).queryByRole('progressbar') as T | null;
  const queryMeter = () =>
    within(getContainer()).queryByRole('meter') as T | null;

  const getBarFill = () => getByLgId!<T>(lgIds.fill) as T | null;
  const getBarTrack = () => getByLgId!<T>(lgIds.track) as T | null;

  const queryIcon = () => queryByLgId!<T>(lgIds.icon) as T | null;
  const queryLabel = () => queryByLgId!<T>(lgIds.label) as T | null;
  const queryDescription = () => queryByLgId!<T>(lgIds.description) as T | null;
  const queryValueText = () => queryByLgId!<T>(lgIds.valueText) as T | null;

  return {
    getContainer,

    queryLoader,
    queryMeter,

    getBarFill,
    getBarTrack,

    queryIcon,
    queryLabel,
    queryDescription,
    queryValueText,
  };
};
