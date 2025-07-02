import { getByLgId } from '@lg-tools/test-harnesses';
import { within } from '@testing-library/react';

export const DEFAULT_LGID_ROOT = 'lg-progress-bar';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  return {
    root,
    track: `${root}-track`,
    fill: `${root}-fill`,
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

  const getIconElement = () => within(parent).queryByRole('img') as T | null;

  return {
    queryLoaderElement,
    queryMeterElement,
    getBarFillElement,
    getBarTrackElement,
    getIconElement,
  };
};

interface GetTestUtilsReturnType<T extends HTMLDivElement = HTMLDivElement> {
  queryLoaderElement: () => T | null;
  queryMeterElement: () => T | null;
  getBarFillElement: () => T | null;
  getBarTrackElement: () => T | null;
  getIconElement: () => T | null;
}
