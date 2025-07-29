// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { LgIdString } from '@leafygreen-ui/lib';

import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lgIds = getLgIds(lgId);

  return {};
};
