import { getByLgId, queryByLgId } from '@lg-tools/test-harnesses';
import { within } from '@testing-library/react';

import { type GetTestUtilsReturnType } from './getTestUtils.types';

export const DEFAULT_LGID_ROOT = 'lg-progress-bar';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  return {
    root,
    track: `${root}-track`,
    fill: `${root}-fill`,
    icon: `${root}-icon`,
    label: `${root}-label`,
    description: `${root}-description`,
  } as const;
};

export const getTestUtils = <T extends HTMLDivElement = HTMLDivElement>(
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): GetTestUtilsReturnType<T> => {
  const lgIds = getLgIds(lgId);
  const parent = getByLgId!<T>(lgIds.root);

  const queryLoaderElement = () =>
    within(parent).queryByRole('progressbar') as T | null;
  const queryMeterElement = () =>
    within(parent).queryByRole('meter') as T | null;

  const getBarFillElement = () => getByLgId!<T>(lgIds.fill) as T | null;
  const getBarTrackElement = () => getByLgId!<T>(lgIds.track) as T | null;

  const getIconElement = () => queryByLgId!<T>(lgIds.icon) as T | null;
  const getLabelElement = () => queryByLgId!<T>(lgIds.label) as T | null;
  const getDescriptionElement = () =>
    queryByLgId!<T>(lgIds.description) as T | null;

  return {
    queryLoaderElement,
    queryMeterElement,
    getBarFillElement,
    getBarTrackElement,
    getIconElement,
    getLabelElement,
    getDescriptionElement,
  };
};
